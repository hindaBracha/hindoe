const Category = require('../models/category')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Advertiser = require('../models/advertiser')
const category = require('../models/category')

dotenv.config()

const addCtegory = (req, res) => {
    Advertiser.findOne({ _id: { $eq: req.query.id } })
    .then((Advertiser) => {
        if (!Advertiser)
            res.status(404).send({ mass: `Advertiser has been exist` })
    })
    const {name} = req.body
    Category.findOne({ name: { $eq: name } })
        .then((ctegory) => {
            if (!ctegory)
                res.status(404).send({ mass: `ctegory has been exist` })
        })
    const newctegory = new Category(req.body)
    newctegory.save()
        .then((ctegory) => { 
            res.status(200).send({ message: `create article ${ctegory.name} succeed!` })
        })
        .catch((err) => {
            res.status(404).send({ error: err.message })
        })
    }
const getAllCategory = (req, res) => {
    Category.find()
        .then((Category) => {
            if (!Category)
                res.send("Categorys not found:(")
            res.send({Category})
        })
        .catch((error) => {
            res.status(400).send(error.message)
        })
}

module.exports = { addCtegory, getAllCategory}