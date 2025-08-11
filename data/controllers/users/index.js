const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const VisitorDB = require("../models/VisitorCounter");
const ContactUser = require("../models/ContactForm");

const deleteUser = async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

const registerUser = async (req,res) =>{
    var username = ""
    var password = ""
    const data = req.flash('data')[0]

    if(typeof data!="undefined"){
        username = data.username
        password = data.password
    }

    res.render('register',{
        title: 'Register',
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}

const storeUser = async (req,res) =>{
    await Users.create(req.body, (error, user) =>{
        if(error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)
            return res.redirect('/register')
        }
        res.redirect('/login')
    })
}

const loginPage = async (req, res) => {
    res.render('login', {
        title: "login page"
    })
}

const loginUserAction = (req,res) =>{
    const { username,password } = req.body

    Users.findOne({username: username},function(error,user){
        if(user){
            bcrypt.compare(password, user.password, (error,same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    res.redirect('/login')
                }
            })
        }
        else{
            console.log("/::",user)
            res.redirect('/login')
        }
    })
}

const logoutUser = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

const updateUser = async (req, res) => {
    const user = await Users.findById(req.params.id)
    res.render('updateUser', {
        title: 'Update User',
        user
    })
}

// provides ability to update user password and profile
const postUpdatedUser = async (req, res) => {
    const { role, fName, lName, email, bio, password, username } = req.body
    const user = await Users.findById(req.params.id)
    user.role = role
    user.fName = fName
    user.lName = lName
    user.email = email
    user.bio = bio
    user.password = await bcrypt.hash(password, 10)
    user.username = username
    await user.save()
    res.redirect('/')
}

const adminPage = async (req, res) => {
    const allUsers = await Users.find({});
    const visitorCount = await VisitorDB.countDocuments();
    const contact = await ContactUser.find({}).sort({ createdAt: -1 }).limit(1);
    res.render('dashboard', {
        title: 'Admin Page',
        allUsers, visitorCount, contact
    })
}

const allUsersPage = async (req, res) => {
    const allUserData = await Users.find({});
    res.render('allUsers', {
        title: 'All Users',
        allUserData
    })
}

module.exports = {
    deleteUser,
    registerUser,
    storeUser,
    loginPage,
    logoutUser,
    loginUserAction,
    updateUser,
    postUpdatedUser,
    adminPage,
    allUsersPage
}