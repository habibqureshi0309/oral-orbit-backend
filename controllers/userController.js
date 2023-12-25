const db = require('../models')
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize')

const User = db.user


//Registering a user
const registerUser = async (req, res) => {
    const finduser = await User.findOne({
        where: {
            [Sequelize.Op.or]: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        }
    })
    if (finduser?.username) {
        throw new Error(`User already exists with ${req.body.email}`);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let info = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(info)
    res.status(200).send(user)
}

const updateUser = async (req, res) => {
    const finduser = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!finduser?.username) {
        throw new Error(`User does not exists`);
    }
    const userData = {
        username: req.body.title,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        designation: req.body.designation,
        working_since: req.body.working_since,
    }
    const user = await User.update(userData, {
        where: {
            email: req.body.email
        }
    })
    res.status(200).send(user)
}

const loginUser = async (req, res) => {
    passport.authenticate('local'), (req, res) => {
        const token = jwt.sign({ user: req.user.id }, process.env.JWT_TOKEN);
        res.json({ token });
    }
}

//Get all users
const getAllUsers = async (req, res) => {
    let user = await User.findAll({
        attributes: [
            username,
            email,
            password
        ]
    })
    res.status(200).send(user)
}

//Get single user
const getSingleUsers = async (req, res) => {
    let id = req.params.id
    let user = await User.findOne({
        where: {
            id
        },
        attributes: [
            username,
            email,
            password
        ]
    })
    res.status(200).send(user)
}

//Update user
const udpateUsers = async (req, res) => {
    let id = req.params.id
    let user = await User.update(req.body, {
        where: {
            id
        }
    })
    res.status(200).send(user)
}

//Delete user
const deleteUsers = async (req, res) => {
    let id = req.params.id
    await User.destroy({
        where: {
            id
        }
    })
    res.status(200).send('User is deleted')
}

module.exports = {
    registerUser,
    updateUser,
    loginUser,
    getAllUsers,
    getSingleUsers,
    udpateUsers,
    deleteUsers
}