module.exports = (errors,errorType) =>{
    try{
           return errors.mapped()[errorType].msg
        }catch(e){
       return ""
   }
};

