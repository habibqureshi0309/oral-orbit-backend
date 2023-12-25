'use strict';
const dbConfig = require('../config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    // logging: console.log,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected...')
    })
    .catch(err => {
        console.log(err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(() => {
    console.log('Yes we sync done....')
})

module.exports = db