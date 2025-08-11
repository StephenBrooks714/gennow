const nodemailer = require('nodemailer');
require("dotenv").config()
const ContactFormDB = require("../models/ContactForm");

const newContactPage = (req, res) => {
    res.render('newContact', {
        title: 'New Form Contact'
    });
}

const storeContact = async (req, res) => {
    await ContactFormDB.create({
        ...req.body,
        userid: req.session.userId
    })
    res.redirect('/dashboard')
}

const sendForm = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        host: "smtp.gmail.com",
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        tls : { rejectUnauthorized: false },
        secure: true,
    });

    const contact = await ContactFormDB.find({}).limit(1).sort({ _id: -1 });

    const {from} = req.body
    const path = require("path");
    const mailDetails = {
        to: `${contact[0].email}`,
        from: from,
        envelope: {
            from: 'from', // used as MAIL FROM: address for SMTP
            to: `${contact[0].email}, Mailer <${contact[0].email}>`
        },
        dsn: {
            id: '8327847732870375',
            return: 'headers',
            notify: 'success',
            recipient: `${contact[0].email}`
        },
        replyTo: from,
        subject: "You got mail",
        headers: {
            'Web Express': 'high'
        },
        date: new Date('2000-01-01 00:00:00'),
        html: `<p>${req.body.message}</p> <h5>Sent From: ${req.body.name}, ${from}</h5>`,
    };
    await transporter.sendMail(mailDetails, function(err, info) {
        if(err) {
            console.log(err);
        } else {
            // send alert saying message sent in #response
            console.log(info);
            res.redirect("/thankYou");
        }
    });
}

const deleteContact = async (req, res) => {
    await ContactFormDB.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
}

const thankYouPage = (req, res) => {
    res.render('thankYou', {
        title: 'Thank You'
    });
}

module.exports = {
    newContactPage,
    storeContact,
    sendForm,
    deleteContact,
    thankYouPage
}