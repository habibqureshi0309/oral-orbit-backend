module.exports = {
    organizationExists: async (criteria) => {
        const organization = await Organization.findOne({
            where: { ...criteria },
        });

        return organization;
    },

    findUserRoleByOrganization: async (organizationId, userId, roleType) => {
        const userRole = await UserRole.findOne({
            where: {
                organizationId,
                userId,
            },
        });

        if (!userRole) {
            return null
        }

        if (roleType) {
            const role = await Role.findOne({
                where: {
                    id: userRole.roleId
                },
            });

            if (role.type === roleType) {
                return userRole
            }

            return null;

        }

        return userRole;
    },

    findAllRegionsByOrganization: async (organizationId) => {
        const countryQuery = {
            attributes: [
                'id'
            ],
            where: { organizationId }
        }
        let countryList = await Country.findAndCountAll(countryQuery)
        countryList = countryList.rows.map(country => country.id)

        const regionQuery = {
            attributes: [
                'id'
            ],
            where: { countryId: { [$op.in]: countryList } }
        }
        const regions = await Region.findAndCountAll(regionQuery)
        return regions.rows.map(region => region.id)
    },
    attachPermissionsToSuperAdmin: async (roleId) => {
        let permissions = await Permission.findAndCountAll()
        permissions = permissions.rows.map(p => p.id)
        const permissionAccesses = permissions.map(p => ({ roleId, permissionId: p }))
        await PermissionAccess.bulkCreate(permissionAccesses)
    },
    findOrganizationsByUser: async (userId) => {
        let query = {
            include: [{
                attributes: [
                    'name',
                    'subdomain',
                    'active',
                    'id'
                ],
                model: Organization,
                where: { active: true },
                required: true,
            }],
            where: { userId },
            order: [
                ["updatedAt", "DESC"]
            ],
            subQuery: false,
        };

        return UserRole.findAll(query);
    }
};
