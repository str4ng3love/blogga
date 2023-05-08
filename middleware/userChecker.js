
module.exports = (req, res, next) => {
    try {
        if(req.session.user){
            next()
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }

}