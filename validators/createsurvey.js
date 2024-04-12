const createSurvey = (req,res,next)=>{
    try {
        const  {surveyName,questions} = req.body
        if(!surveyName) return res.status(400).json({Error:"Survey name and question cannot be empty"})
        if(!questions?.length) return res.status(400).json({Error:"Questions cannot be empty"});
        next();
    } catch (error) {
        
    }
}
module.exports = {
    createSurvey
}