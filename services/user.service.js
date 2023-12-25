module.exports = {
    createUser: async ({ username, email, payload, activity, organizationId }) => {
        const user = await User.findOne({
            attributes: ['id'],
            where: {
                [$op.or]: [{
                    username,
                }, {
                    email
                }],
            }
        });

        if (user) {
            throw new BadError({ message: 'register_user_exists' });
        }

        const newUser = await User.create(payload);

        payload.password = "XXXXXXXXX";
        const role = await Role.findOne({
            where: {
                id: payload.roleId
            }
        });
        payload.portal = role.allowedApps

        if (organizationId) {
            await UserRole.create({ userId: newUser.id, roleId: role.id, organizationId })
        }

        await helper.logger({
            ...activity,
            currentPayload: payload,
            previousPayload: {},
            organizationId: organizationId || null
        });

        return newUser;
    },

    updateUser: async ({ id, payload, activity, organizationId }) => {
        const user = await service.user.findUserByID(id);

        delete payload.username;
        delete payload.email;

        if (!payload.password || !payload.password.length) {
            delete payload.password;
        }

        await User.update(payload, {
            where: {
                id
            },
            individualHooks: true
        });

        const roles = await Role.findAll({
            where: {
                id: {
                    [$op.or]: [payload.roleId, user._previousDataValues.roleId]
                }
            }
        });

        if (organizationId) {
            await UserRole.update({ roleId: payload.roleId }, { where: { organizationId, userId: id } })
        }
        payload.portal = roles.find(role => role.id == payload.roleId).allowedApps
        user._previousDataValues.portal = roles.find(role => role.id == user._previousDataValues.roleId).allowedApps

        const company = await Company.findOne({
            attributes: ['name'],
            where: {
                id: user._previousDataValues.companyId
            }
        });
        if (company) {
            user._previousDataValues.company = company.name;
        }

        if (payload.password && payload.password.length) {
            user._previousDataValues.password = "XXXXXXXX"
            payload.password = "XXXXXXXXX";
        }


        return helper.logger({
            ...activity,
            currentPayload: payload,
            previousPayload: user._previousDataValues,
            organizationId: organizationId || null
        });
    },

    findUserByID: async (id) => {
        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            throw new BadError({ message: 'user_not_exist' });
        }

        return user;
    },

    findByEmail: async (email) => {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new BadError({ message: 'user_not_exist' });
        }

        return user;
    },

    userExists: async ({user_email}) => {
        try {
            const user = await service.user.findByEmail(user_email);     
            return !!user;
          } catch (error) {
            console.error('Error checking user existence:', error);
            throw new Error('Error checking user existence');
          }
    },

};
