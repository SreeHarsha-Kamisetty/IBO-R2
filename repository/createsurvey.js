const { QuestionModel } = require("../models/questions.model");
const { SurveyModel } = require("../models/survey.models");


const createSurveyRepostory = async(data)=>{
    try {
        const  {surveyName,questions} = data
        
    const new_survey = new SurveyModel({survey_name:surveyName})
     await new_survey.save();
    
    const survey_id = new_survey._id
    
    const all_questions = questions.map((item,index)=>{
    
        return {question_id:index+1,survey_id:survey_id};
    })
    
    const Question_for_survey = await QuestionModel.insertMany(all_questions);
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