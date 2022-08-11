const User = require('../models/user')

module.exports = async (req, res, next)=> {
    if(req.session.user){
        await User.findOneAndUpdate({user: req.session.user}, {meta: {isOnline: true}}, {returnDocument: 'after'} )
        next()
    }
 else {
    await req.sessionStore.all((err, sess)=>{
        if(err){
            console.log(err)
        } else {
            // await User.findOneAndUpdate({user: req.session.user}, {meta: {isOnline: false}}, {returnDocument: 'after'} )
            sess.forEach(session => {
                console.log(`=====`)
                console.log(session._id)
            });
            console.log(`-new line-`)
            
        }
    })
 next() }
}