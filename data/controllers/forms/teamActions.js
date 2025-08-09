const TeamData = require("../models/Team");

const newTeamPage = (req, res) => {
    res.render('newTeam', {
        title: 'New Team Member'
    });
}

const storeTeamMember = async (req, res) => {
    await TeamData.create(req.body, (error, team) => {
        if (error) {
            console.log(error);
            res.redirect('/newTeam');
        } else {
            console.log('Team has been saved');
            res.redirect('/ourTeam');
        }
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