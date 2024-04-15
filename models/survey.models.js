// survey
// --------
// * survey_id -- primary key - uuid
// * survey_name-- string (should be unique)
// * total_survey_taken -- int
// * created_at - date time

const mongoose = require("mongoose")

const surveySchema = mongoose.Schema({
    survey_name:{
        type:String,
        unique:true,
    },
    total_survey_taken:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
})

const SurveyModel = mongoose.model("survey", surveySchema)

module.exports = {
    SurveyModel
}