const express = require('express')
const router = express.Router()
const db = require("../conexao")

router.get("/", (req, res) =>{
    db.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = "SELECT * FROM produtos"
        conn.query(query, (error, result, fields) =>{
            conn.release()
            if(error){
                return res.status(500).send({
                    error: error
                })
            }

            res.status(200).send({
                result: result
            })

        })
    })
})

router.post("/cadastro/:id", (req, res) =>{
    const id_vendedor = req.params.id
    const {nome, estoque, preco, imagem, categoria, descricao, cepEstoque} = req.body

    if(!nome){
        return res.status(422).send({mensagem: "O nome é obrigatório!"})
    }
    if(!estoque){
        return res.status(422).send({mensagem: "A quantidade em estoque é obrigatória!"})
    }
    if(!preco){
        return res.status(422).send({mensagem: "O preço é obrigatório!"})
    }
    if(!imagem){
        return res.status(422).send({mensagem: "A imagem é obrigatório!"})
    }
    if(!categoria){
        return res.status(422).send({mensagem: "A categoria é obrigatória!"})
    }
    if(!descricao){
        return res.status(422).send({mensagem: "A descrição é obrigatória!"})
    }
    if(!cepEstoque){
        return res.status(422).send({mensagem: "O cep do estoque é obrigatório!"})
    }
    db.getConnection((error, conn) =>{
        if(error){
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
            const query = `INSERT INTO produtos nome=${nome},  `
            conn.query()
        }
    })
})

module.exports = router