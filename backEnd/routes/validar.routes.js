require("dotenv").config()
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/", (req, res) => {
    const { token } = req.body
    // console.log(token)
    if (!token) {
        return res.status(422).send({ mensagem: "O token não é valido!" })
    }

  jwt.verify(token, process.env.SECRET, (error, decode) => {
    if(error){
        return res.status(500).send({ mensagem: "O token não é valido!", error: error })
    }
    // console.log(decode)
    return res.status(200).send({result: decode})
  });
   
})

module.exports = router