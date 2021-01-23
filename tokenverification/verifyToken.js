const jwt=require("jsonwebtoken");

var checkToken=(req,res,next)=>{
    //token verification logic

    //get token from header of req object
    let bearerToken=req.headers["authorization"];
    
    //if token is not existed
    if(bearerToken==undefined){
      return  res.send({message:"Unauthorized access"})
    }
    //if token is existed, get token
    let token=bearerToken.slice(7,bearerToken.length);
    //check validity of token
    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            return res.send({message:"Session expired"})
        }
        else{
            next()
        }
    })


}

//export function
module.exports=checkToken;