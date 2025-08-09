const VolunteerData = require('../models/Volunteers');
const path = require('path');
const fs = require('fs');

const newVolunteerPage = (req, res) => {
    res.render('newVolunteer')
}

const storeVolunteer = async (req, res) => {
    await VolunteerData.create(req.body, (error, volunteer) => {
        if (error) {
            console.log(error);
            res.redirect('/newVolunteer');
        } else {
            console.log('Volunteer has been saved');
            res.redirect('/ourTeam');
        }
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