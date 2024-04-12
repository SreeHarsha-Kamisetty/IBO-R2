// survey_response
// ----------------
// * id  -- uuid
// * survey_id -- uuid
// * question_id -- int
// * response_value -- boolean

const mongoose = require("mongoose")

const responseSchema = mongoose.Schema({
    survey_id: mongoose.Schema.Types.ObjectId,
    question_id:Number,
    response_value:Boolean
})

const ResponseModel = mongoose.model("response",responseSchema)

module.exports={
    ResponseModel,
}