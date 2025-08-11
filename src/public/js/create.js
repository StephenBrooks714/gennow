// onc click function newPage creates a new html page and get values from
// the form and sends them to the database
const path = require('path');
const fs = require('fs');

$(document).ready(function () {
    $('#newPage').click(function () {
        let title = $('#title').val();
        let pageName = $('#pageName').val();
        let description = $('#description').val();
        let image = $('#image').val();
        let link = $('#link').val();
        let category = $('#category').val();
        let content = $('#content').val();

        if (title === '' || pageName === '' || description === '' || image === '' || link === '' || category === '' || content === '') {
            alert('All fields are required');
            return;
        } else {
            const filePath = path.join(__dirname, '..', '..', '..', 'src', 'views', `${pageName}.ejs`);
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        $.ajax({
            url: '/create/page',
            method: 'POST',
            data: {
                title: title,
                pageName: pageName,
                description: description,
                image: image,
                link: link,
                category: category,
                content: content
            },
            success: function (response) {
                console.log(response);
                window.location.href = `/${pageName}`;
                },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });
});