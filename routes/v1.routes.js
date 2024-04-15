const express = require("express");
const {SurveyModel} = require("../models/survey.models");
const { QuestionModel } = require("../models/questions.model");
const { ResponseModel } = require("../models/response.model");
const { createSurvey } = require("../handlers/createsurvey");
const Router = express.Router();
const {createSurveyValidator} = require("../validators/createsurvey")
Router.post("/survey",createSurveyValidator,createSurvey);


Router.post("/survey/:survey_name",async(req,res)=>{
    try {
        const {survey_name} = req.params
        
        const questions_array = req.body
        const survey_details = await SurveyModel.findOne({survey_name:survey_name})
        if(!survey_details) return res.status(404).json({Error:"Error survey not found"})
        const questions = await QuestionModel.find({survey_id:survey_details._id})
        
        if(questions_array.length != questions.length) return res.status(400).json({Error:"Error some questions are missing"})

        const questions_ids = questions_array.map(item =>item.questionId);
        const question_validation = questions.filter(item=>{
            return questions_ids.includes(item.question_id);
        })
        if(question_validation.length != questions.length) return res.status(400).json({Error:"Error some questions are missing or invalid"})

        const answer_validation = questions_array.filter(item => {
            return (typeof item.answer === "boolean")
        })
        console.log(answer_validation)
        console.log(questions_array)
        if(answer_validation.length != questions_array.length) return res.status(400).json({Error:"Answers can either be true or false"})

        let responses = questions_array.map((item)=>{
            let obj = {};
            obj.survey_id = survey_details._id
            obj.question_id = item.questionId
            obj.response_value = item.answer
            return obj;
        })
        console.log(responses)
        let new_response = await ResponseModel.insertMany(responses)
        await SurveyModel.findByIdAndUpdate({_id:survey_details._id}, {$inc:{"total_survey_taken":1}})

        res.status(200).json({"status":"success"})




    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":"Interval server error"})
    }
})

Router.get("/:survey_name/results",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }

})

module.exports = Router;