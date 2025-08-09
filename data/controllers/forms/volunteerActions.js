const VolunteerData = require('../models/Volunteers');
const path = require('path');
const fs = require('fs');

const newVolunteerPage = (req, res) => {
    res.render('newVolunteer')
}

const storeVolunteer = async (req, res) => {
    let image = req.files.image;
    await image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await VolunteerData.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/ourTeam#volunteers')
    })
}

const deleteVolunteer = async (req, res) => {
    const volunteer = await VolunteerData.findByIdAndDelete(req.params.id)
    res.redirect('/');
}

const updateVolunteerPage = async (req, res) => {
    const volunteer = await VolunteerData.findById(req.params.id)
    res.render('updateVolunteer', {
        title: 'Update Volunteer',
        volunteer
    })
}

const updateVolunteer = async (req, res) => {
    const volunteer = await VolunteerData.findById(req.params.id)
    volunteer.name = req.body.name
    volunteer.role = req.body.role
    volunteer.description = req.body.description
    await volunteer.save()
    res.redirect('/')
}

module.exports = {
    newVolunteerPage,
    storeVolunteer,
    deleteVolunteer,
    updateVolunteerPage,
    updateVolunteer
}