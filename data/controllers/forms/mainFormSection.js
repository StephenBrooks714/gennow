const path = require("path");
const fs = require("fs");
const BlogData = require('../models/ArticlePost');

//////////////////////////////////////////////////////////////////////////////////////
// project section is all about uploading images
const newProjectPage = (req,res) => {
    res.render("newProject", {
        title: "New Project"
    })
}

// store data into mongoose and upload multiple photos
const storeProject = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const imageFiles = req.files.photos;
    // Ensure that imageFiles is always an array
    const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    const uploadPromises = files.map(file => {
        const uploadPath = path.join(__dirname, '..', '..', '..', 'src/public/gallery', file.name);
        return file.mv(uploadPath);
    });

    Promise.all(uploadPromises)
        .then(() => res.redirect('/gallery'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error uploading files');
        });
};

// use shift javascript method to delete the first photo
const deleteProjectInfo = (req, res) => {
    const photos = path.join(__dirname, '..', '..', '..', 'src/public/gallery');
    const photosArray = fs.readdirSync(photos);
    const photoToDelete = photosArray.shift();
    fs.unlinkSync(path.join(__dirname, '..', '..', '..', 'src/public/gallery', photoToDelete));
    res.redirect('/gallery');
}

const galleryPage = async (req, res) => {
    // get images from uploads directory and show them onto page
    const photos = path.join(__dirname, '..', '..', '..', 'src/public/gallery');
    const photosArray = fs.readdirSync(photos);
    const photosList = photosArray.map((photo) => ({
        file: `/gallery/${photo}`
    }));

    res.render('gallery', {
        title: 'Projects',
        photosList
    })
};

//////////////////////////////////////////////////////////////////////
// blogs
const newPostPage = (req, res) => {
    res.render("newPost", {
        title: "Create a new post for the app."
    })
}
const storeBlogPost = (req, res) => {
    let image = req.files.image;
    let image2 = req.files.image2;
    image.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image.name), async (error) => {
        await image2.mv(path.resolve(__dirname, '..', '..', '..', 'src/public/uploads', image2.name), async (error) => {
            await BlogData.create({
                ...req.body,
                image: '/uploads/' + image.name,
                image2: '/uploads/' + image2.name,
                userid: req.session.userId
            })
            res.redirect('/blogs')
        })
    })
}
const blogsPage = async (req, res) => {
    const posts = await BlogData.find({}).sort({_id: -1});
    res.render("blogs", {
        title: "Cosmic Vibes Posts",
        posts
    })
}
const singlePostPage = async (req, res) => {
    const postData = await BlogData.findById(req.params.id);
    res.render("singlePost", {
        title: "A Post about the blog.",
        postData
    })
}
const deleteBlog = async (req, res) => {
    await BlogData.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
}

module.exports = {
    newProjectPage,
    storeProject,
    deleteProjectInfo,
    galleryPage,
    newPostPage,
    storeBlogPost,
    blogsPage,
    singlePostPage,
    deleteBlog
};
