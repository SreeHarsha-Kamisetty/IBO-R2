// survey
// --------
// * survey_id -- primary key - uuid
// * survey_name-- string (should be unique)
// * total_survey_taken -- int
// * created_at - date time

const { DataTypes } = require("sequelize")
const { connection } = require("../db")


const surveySchema = {
   survey_id:{
    type:DataTypes.UUID,
    primaryKey:true,
   },
   survey_name:{
    type:DataTypes.STRING,
    unique:true,
   },
   total_survey_taken:{
    type:DataTypes.INTEGER,
   },
   created_at:{
    type:DataTypes.DATE,
    defaultValue: DataTypes.NOW,
   }
}

const SurveyModel = connection.define("survey", surveySchema,{timestamps:false})

module.exports = {
    SurveyModel
}