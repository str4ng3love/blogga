

module.exports = (err, req, res, next) => {

        if(err.code === 11000 && err.name === `MongoServerError`){
            
            return res.status(409).json({messages:`User name taken`, fields: [`user`]})
         }   else if(err.name === `ValidationError`){
            
            let errors = Object.values(err.errors).map(el =>el.message)
            let fields = Object.values(err.errors).map(el=>el.path)
            let code = 400
            
            if(errors.length > 1){
                const formattedErrors = errors.join(' ')
                res.status(code).send({messages: formattedErrors, fields: fields})
            } else {
                res.status(code).json({messages: errors, fields: fields})
            }   
         }
    }
