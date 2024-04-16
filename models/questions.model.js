// question
// ---------
// * question_id -- int
// * survey_id -- uuid
// * question_description - string
// (survey_id + question_id) primary key

const { DataTypes } = require("sequelize")
const { connection } = require("../db")
const questionSchema = {
    question_id:{
        type: DataTypes.INTEGER
    },
    survey_id:{
        type:DataTypes.UUID
    },
    question_description:{
        type:DataTypes.STRING
    }
}
const QuestionModel = connection.define("questions",questionSchema,{timestamps:false})
QuestionModel.removeAttribute('id')


module.exports = {
    QuestionModel,
}