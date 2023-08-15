const express = require('express')
const router = express.Router()
const db = require("../conexao")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
router.get("/", (req, res) => {
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = `SELECT * FROM clientes`
        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({ error: error })
            }
            res.status(200).send({ result: result })
        })
    })
})

router.get("/:id", (req, res) => {
    const id_cliente = req.params.id

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = `SELECT * FROM clientes WHERE idCliente=${id_cliente}`
        conn.query(query, (error, result) => {
            conn.release()
            if(error){
                return res.status(500).send({error: error})
            }
            res.status(200).send({result: result})
        })
    })
})

router.post("/cadastro", (req, res) => {
    const {nome, email, senha, confirmarSenha, cpf} = req.body

    if (!nome) {
        return res.status(422).send({ mensagem: "O nome é obrigatório!" })
    }
    if (!email) {
        return res.status(422).send({ mensagem: "O email é obrigatório!" })
    }
    if (!cpf) {
        return res.status(422).send({ mensagem: "O cpf é obrigatório!" })
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
        const query_get = `SELECT * FROM clientes WHERE cpfCliente=${cpf} OR emailCliente='${email}'`

        conn.query(query_get, (error, result) => {
            if(error){
                return res.status(500).send({error: error})
            }
            if(result.length > 0){
                return res.status(409).send({ message: "Email ou cpf ja cadastrado!" });
            }else{
                bcrypt.genSalt(10, (error, salt) => {
                    if (error) {
                        return next(error)
                    }
                    bcrypt.hash(senha, salt, (errorCrypt, hashSenha) => {
                        if (errorCrypt) {
                            return console.log(errorCrypt);
                        }
                        const query = `INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES(?,?,?,?)`

                        conn.query(query, [nome, cpf, email, hashSenha], (error, result, fields) => {
                            conn.release();
                            if (error) {
                                console.log(error);
                                return res.status(500).send({
                                    message: "Houve um erro, tente novamente mais tarde...",
                                    erro: error,
                                });
                            }
                            res.status(201).send({
                                message: "Cliente cadastrado com sucesso!",
                                idCliente: result.insertId,
                            });
                        })
                    })
                })
            }
        })
    })
})

router.post("/login", (req, res) => {
    const { email, senha, confirmarSenha } = req.body

    if (!email) {
        return res.status(422).send({ mensagem: "O email é obrigatório!" })
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
        const query_get = `SELECT * FROM clientes WHERE emailCliente='${email}'`
        conn.query(query_get, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }
            if (result.length < 1) {
                return res.status(404).send({ mensagem: "Cliente não encontrado!" })
            }

            bcrypt.compare(senha, result[0].senhaCliente, (error, results) => {
                if (error) {
                    return res.status(401).send({ message: "Falha na autenticação!" });
                }

                if (results) {
                    let token = jwt.sign({
                        idCliente: result[0].idCliente,
                        email: result[0].emailCliente,
                    },
                        process.env.SECRET,
                        {
                            expiresIn: "5d",
                        }
                    );
                    return res.status(200).send({
                        mensagem: "Autenticado com sucesso!",
                        token: token,
                        idCliente: result[0].idCliente,
                        tipo: "clientes"
                    })
                }
            })
        })
    })
})

router.put("/editar/:id", (req, res) => {
    const id_cliente = req.params.id
    const {nome, email} = req.body

    if (!nome) {
        return res.status(422).send({ mensagem: "O nome é obrigatório!" })
    }
    if (!email) {
        return res.status(422).send({ mensagem: "O email é obrigatório!" })
    }
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query = `UPDATE clientes SET nome = '${nome}', email = '${email}' WHERE idProduto = ${id_cliente}`
        conn.query(query, (error, result) => {
            conn.release()
            if(error){
                return res.status(500).send({error: error})
            }

            res.status(200).send({mensagem: "Dados alterados com sucesso!"})
        })
        
    })
})

module.exports = router