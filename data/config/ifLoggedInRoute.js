const UserData = require('../controllers/models/Users');

const loggedIn = async (req, res, next) => {
    // Check if user is logged in
    if (req.session.user) {
        // Check if user exists in database
        const user = await UserData.findOne({username: req.session.user.username});
        if (user) {
            // User is logged in and exists in database
            next();
        } else {
            // User is logged in but does not exist in database
            req.session.destroy();
            res.redirect('/login');
        }
    } else {
        // User is not logged in
        res.redirect('/');
    }
};

module.exports = loggedIn;