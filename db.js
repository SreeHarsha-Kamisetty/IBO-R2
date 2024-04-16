require("dotenv").config()
const {Sequelize} = require("sequelize")
const connection = new Sequelize({
    username:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    host:process.env.MYSQL_HOST,
    dialect:"mysql",
    dialectOptions: {
        connectTimeout: 86400
    }
})

module.exports={

    connection,
}
