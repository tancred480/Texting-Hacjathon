function errorHandler(err,req,res,next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error:err,message:`The user is not authorized`});
    }
    if(err.name === 'ValidationError'){
        res.status(401).json({error:err,message:`The user is not validated`});
    }
    if(err){
        res.status(500).json({error:err,message:`Its a server error`})
    }
}

module.exports = errorHandler;