const db = require("../conexao")
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


router.get("/", (req, res) =>{
    db.getConnection((error, conn) =>{
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = "SELECT * FROM vendedores"

        db.query(query, (error, result) =>{
            conn.release()
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }
            res.status(200).send({result: result})
        })
    })
})
router.post("/cadastro", (req, res) => {
    const { nome, email, cpnj, senha, confirmarSenha } = req.body
    console.log(cpnj.length)
    if (!nome) {
        return res.status(422).send({ mensagem: "O nome é obrigatório!" })
    }
    if (!email) {
        return res.status(422).send({ mensagem: "O email é obrigatório!" })
    }
    if (!cpnj) {
        return res.status(422).send({ mensagem: "cnpj ou cpf é obrigatório!" })

    } else {
        if (cpnj.length < 13) {
            var tipo = "cpfVendedor"
        } else {
            var tipo = "cnpjVendedor"
        }
    }
    if (!senha) {
        return res.status(422).send({ mensagem: "A senha é obrigatória!" })
    }
    if (senha != confirmarSenha) {
        return res.status(422).send({ mensagem: "As senhas são diferentes!" })
    }


    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query = `SELECT * FROM vendedores WHERE ${tipo}=${cpnj}`

        conn.query(query, (error, result) => {
            // conn.release()
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }
            console.log(result)
            if (result.length > 0) {
                return res.status(409).send({ message: "Vendedor já cadastado!" });
            } else {
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) {
                        return next(error)
                    }
                    bcrypt.hash(senha, salt, (errorCrypt, hashSenha) => {
                        if (errorCrypt) {
                            return console.log(errorCrypt);
                        }
                        const query = `INSERT INTO vendedores (nomeVendedor, ${tipo}, emailVendedor, senhaVendedor) VALUES(?,?,?,?)`

                        conn.query(query, [nome, cpnj, email, hashSenha], (error, result, fields) => {
                            conn.release();
                            if (error) {
                                console.log(error);
                                return res.status(500).send({
                                    message: "Houve um erro, tente novamente mais tarde...",
                                    erro: error,
                                });
                            }
                            res.status(201).send({
                                message: "Vendedor cadastrado com sucesso!",
                                tipoCadastro: tipo,
                                idVendedor: result.insertId,
                            });
                        })
                    })
                })
            }
        })
    })
})


module.exports = router