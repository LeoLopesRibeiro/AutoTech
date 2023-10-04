const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

module.exports.login = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, JWT_KEY)
        req.cpf = decode
        next()
    } catch (error) {
        res.status(401).send({ message: "Você não tem permissão para execultar essa ação!" })
    }
   
}