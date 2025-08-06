//

const homePage = (req, res) => {
    res.render('index', {
        title: 'Home Page'
    });
}

const aboutUsPage = (req, res) => {
    res.render('aboutUs', {
        title: 'About Us'
    });
}

module.exports = {
    homePage,
    aboutUsPage
}