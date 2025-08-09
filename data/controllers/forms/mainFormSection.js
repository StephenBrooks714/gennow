const path = require("path");
const fs = require("fs");

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

module.exports = {
    newProjectPage,
    storeProject,
    deleteProjectInfo,
    galleryPage
};
