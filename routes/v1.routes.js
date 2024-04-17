const express = require("express");
const {SurveyModel} = require("../models/survey.models");
const { QuestionModel } = require("../models/questions.model");
const { ResponseModel } = require("../models/response.model");
const { createSurvey } = require("../handlers/createsurvey");
const Router = express.Router();
const {createSurveyValidator} = require("../validators/createsurvey")
Router.post("/survey",createSurveyValidator,createSurvey);
const { Sequelize, DataTypes } = require('sequelize');

Router.post("/survey/:survey_name",async(req,res)=>{
    try {
        const {survey_name} = req.params
        
        const questions_array = req.body
        console.log(survey_name)
        const survey_details = await SurveyModel.findOne(
            {
                where:
                {
                    survey_name
                    : survey_name
                }
            }
        );
        console.log(survey_details)
        if(!survey_details) return res.status(404).json({Error:"Error survey not found"})
        const questions = await QuestionModel.findAll({where:{survey_id:survey_details.survey_id}})
        
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
            obj.survey_id = survey_details.survey_id
            obj.question_id = item.questionId
            obj.response_value = item.answer
            return obj;
        })
        console.log(responses)
        let new_response = await ResponseModel.bulkCreate(responses)
        const increment = 1;
        await SurveyModel.increment({total_survey_taken:increment},{where:{survey_id:survey_details.survey_id}})

        res.status(200).json({"status":"success"})




    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":"Interval server error"})
    }
})

Router.get("/survey/:survey_name/results",async(req,res)=>{
    try {
        const {survey_name} = req.params
        const survey = await SurveyModel.findOne({where:{survey_name:survey_name}})
        const totalSurvey = survey.total_survey_taken
   
        SurveyModel.hasMany(ResponseModel, { foreignKey: 'survey_id' });
        ResponseModel.belongsTo(SurveyModel, { foreignKey: 'survey_id' });

        const trueFalseCounts = await ResponseModel.findAll({
            attributes: [
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN response_value = true THEN 1 ELSE 0 END')), 'positiveResponses'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN response_value = false THEN 1 ELSE 0 END')), 'negativeResponses'],
            ],
            where: { survey_id: survey.survey_id },
            raw: true,
        });
        const question_breakup = await ResponseModel.findAll({
                    attributes: [
                    'question_id',
                    [
                        Sequelize.literal('SUM(CASE WHEN response_value = true THEN 1 ELSE 0 END)'),
                        'positiveResponses',
                    ],
                    [
                        Sequelize.literal('SUM(CASE WHEN response_value = false THEN 1 ELSE 0 END)'),
                        'negativeResponses',
                    ],
                    ],
                    where:{survey_id:survey.survey_id},
                    group: ['question_id'],
                    raw: true, // Get raw data instead of Sequelize instances
        });
        
        
        let overAll={
            numberOfSurveysTaken:totalSurvey,
            positiveResponses: trueFalseCounts[0].positiveResponses,
            negativeResponses: trueFalseCounts[0].negativeResponses,
            breakUp:question_breakup
    }
        res.status(200).json(overAll)
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error"});
    }

})

module.exports = Router;