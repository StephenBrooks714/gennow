const TeamData = require("../models/Team");
const path = require("path");

const newTeamPage = (req, res) => {
    res.render('newTeam', {
        title: 'New Team Member'
    });
}

const storeTeamMember = async (req, res) => {
    let image = req.files.image;
    await image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await TeamData.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/ourTeam#team')
    })
}

const deleteTeamMember = async (req, res) => {
    const team = await TeamData.findByIdAndDelete(req.params.id)
    res.redirect('/');
}

const updateTeamMember = async (req, res) => {
    const team = await TeamData.findById(req.params.id)
    team.name = req.body.name
    team.role = req.body.role
    team.description = req.body.description
    await team.save()
    res.redirect('/')
}

const updateTeamMemberPage = async (req, res) => {
    const team = await TeamData.findById(req.params.id)
    res.render('updateTeam', {
        title: 'Update Team Member',
        team: team
    })
}

module.exports = {
    newTeamPage,
    storeTeamMember,
    deleteTeamMember,
    updateTeamMember,
    updateTeamMemberPage
}