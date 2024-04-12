const c_surve_repo = require("../repository")

const createSurvey = async(req,res)=>{
    try {
      
    let result = c_surve_repo(req.body);
    res.status(200).json(result);
    } catch (error) {
        res.status(500).json({"Error":"Interval server error"})
    }
    

}

module.exports={
    createSurvey
}