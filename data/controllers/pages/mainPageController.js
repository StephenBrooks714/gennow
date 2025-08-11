// data base
const TeamInfoData = require('../../controllers/models/Team');
const VolunteerInfoData = require('../../controllers/models/Volunteers');
const BoardMemberInfo = require('../../controllers/models/OurBoard');
const ContactMethod = require("../models/ContactForm");

const homePage = async (req, res) => {
    const contactData = await ContactMethod.find({});
    res.render('index', {
        title: 'Empower GENNOW - Home Page',
        contactData
    });
}

const aboutUsPage = (req, res) => {
    res.render('aboutUs', {
        title: 'About Us'
    });
}

const ourImpactPage = (req, res) => {
    res.render('ourImpact', {
        title: 'Our Impact'
    });
}

const ourTeamPage = async (req, res) => {
    const volunteers = await VolunteerInfoData.find({});
    const team = await TeamInfoData.find({});
    res.render('ourTeam', {
        title: 'Our Team',
        team, volunteers
    });
}

const ourBoardPage = async (req, res) => {
    const boardMember = await BoardMemberInfo.find({});
    res.render('ourBoard', {
        title: 'Our Board Members',
        boardMember
    });
}

const programsPage = (req, res) => {
    res.render('programs', {
        title: 'Programs'
    });
}

const leadershipPage = (req, res) => {
    res.render('leadership', {
        title: 'Leadership'
    });
}

module.exports = {
    homePage,
    aboutUsPage,
    ourImpactPage,
    ourBoardPage,
    ourTeamPage,
    programsPage,
    leadershipPage
}