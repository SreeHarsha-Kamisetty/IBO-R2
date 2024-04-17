// survey_response
// ----------------
// * id  -- uuid
// * survey_id -- uuid
// * question_id -- int
// * response_value -- boolean
const { DataTypes } = require("sequelize")
const { connection } = require("../db")


const responseSchema = {
    id:{type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
        },
    survey_id:{
        type:DataTypes.UUID,
    },
    question_id:{
        type:DataTypes.INTEGER
    },
    response_value:{
        type:DataTypes.BOOLEAN
    }
    
}


const ResponseModel = connection.define("response",responseSchema,{timestamps:false})

module.exports={
    ResponseModel,
}