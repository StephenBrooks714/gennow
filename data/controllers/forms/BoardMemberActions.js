const BoardData = require("../models/OurBoard");
const path = require("path");

const newBoardMemberPage = (req, res) => {
    res.render('newBoardMember', {
        title: 'New Team Member'
    });
}

const storeBoardMember = async (req, res) => {
    let image = req.files.image;
    await image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await BoardData.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/ourBoard')
    })
}

const deleteBoardMember = async (req, res) => {
    const team = await BoardData.findByIdAndDelete(req.params.id)
    res.redirect('/');
}

const updateBoardMember = async (req, res) => {
    const team = await BoardData.findById(req.params.id)
    team.name = req.body.name
    team.role = req.body.role
    team.description = req.body.description
    await team.save()
    res.redirect('/')
}

const updateBoardMemberPage = async (req, res) => {
    const team = await BoardData.findById(req.params.id)
    res.render('updateBoardMember', {
        title: `Update To ${board.name}`,
        team: board
    })
}

module.exports = {
    newBoardMemberPage,
    storeBoardMember,
    deleteBoardMember,
    updateBoardMember,
    updateBoardMemberPage
}