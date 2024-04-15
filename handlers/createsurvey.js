const {createSurveyRepostory} = require("../repository/createsurvey")

const createSurvey = async(req,res)=>{
    try {
      
    let result = await createSurveyRepostory(req.body);
    console.log(result);    
    res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({"Error":"Interval server error"})
    }
    

}

module.exports={
    createSurvey
}