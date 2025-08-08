//

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

const ourTeamPage = (req, res) => {
    res.render('ourTeam', {
        title: 'Our Team'
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