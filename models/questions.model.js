// question
// ---------
// * question_id -- int
// * survey_id -- uuid
// * question_description - string
// (survey_id + question_id) primary key

const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    question_id:{
        type:Number,
    },
    survey_id:{
        type:mongoose.ObjectId,
        ref:'survey'
    },
    description:{
        type:String,

    }
})

const QuestionModel = mongoose.model("question", questionSchema)

module.exports = {
    QuestionModel,
}