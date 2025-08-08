const User = require('../../controllers/models/Users');

module.exports = (req,res,next) =>{
    User.findById(req.session.userId, (error, user)=>{
        if(error || !user)
            return res.redirect('/login')
        next()
    })
}