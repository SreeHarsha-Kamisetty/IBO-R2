const { QuestionModel } = require("../models/questions.model");
const { SurveyModel } = require("../models/survey.models");


const createSurveyRepostory = async(data)=>{
    try {
        const  {surveyName,questions} = data
    const new_survey = await SurveyModel.create({survey_name:surveyName})
    
    const survey_id = new_survey.survey_id
    
    const all_questions = questions.map((item,index)=>{
    
        return {question_id:index+1,survey_id:survey_id,question_description:item.description};
    })
    console.log(all_questions)
    const Question_for_survey = await QuestionModel.bulkCreate(all_questions);
    const result ={
        surveryName:surveyName,
        questions:questions
    }
    
    return result;
    } catch (error) {
        console.log(error)
    }
    
}

module.exports={
    createSurveyRepostory
}