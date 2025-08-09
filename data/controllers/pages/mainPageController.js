// data base
const TeamInfoData = require('../../controllers/models/Team');
const VolunteerInfoData = require('../../controllers/models/Volunteers');

const homePage = (req, res) => {
    res.render('index', {
        title: 'Empower GENNOW - Home Page'
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

const ourBoardPage = (req, res) => {
    res.render('ourBoard', {
        title: 'Our Board'
    });
}

module.exports = {
    homePage,
    aboutUsPage,
    ourImpactPage,
    ourBoardPage,
    ourTeamPage
}