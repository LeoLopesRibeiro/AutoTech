const express = require('express')
const router = express.Router()
const db = require("../conexao")
const multipleImages = require('../middlewares/uploadImage')

//rota de buscar todos os produtos
router.get("/", (req, res) => {
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = "SELECT * FROM produtos"
        conn.query(query, (error, result, fields) => {
            conn.release()
            if (error) {
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

//buscar pelo id do produto
router.get("/:id_produto", (req, res) => {
    const id_produto = req.params.id_produto

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })

        }

        const query = `SELECT * FROM produtos WHERE idProduto=${id_produto}`

        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
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



//buscar um produto pelo id do vendedor
router.get("/produtos-vendedor/:id_vendedor", (req, res) => {
    const id_vendedor = req.params.id_vendedor

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })

        }

        const query = `SELECT * FROM produtos WHERE id_vendedor=${id_vendedor}`

        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
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


//buscar produto pela categoria
router.get("/categorias/:categorias", (req, res) => {
    const categorias = req.params.categorias

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query = `SELECT * FROM produtos WHERE categoria='${categorias}'`
        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
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

router.post("/cadastro/:id", multipleImages, (req, res) => {
    const id_vendedor = req.params.id
    const imagem = req.files
    const { nome, estoque, preco, categoria, descricao, cepEstoque } = req.body

    // console.log(imagem.imagem[1].path)

    var caminhos = ""
    req.files.imagem.forEach(imagem => {
        if (caminhos.length === 0) {
            caminhos = imagem.path
            console.log(caminhos)
        } else {
            caminhos = `${caminhos},${imagem.path}`
            console.log(caminhos)
        }
    });

    if (!nome) {
        return res.status(422).send({ mensagem: "O nome é obrigatório!" })
    }
    if (!estoque) {
        return res.status(422).send({ mensagem: "A quantidade em estoque é obrigatória!" })
    }
    if (!preco) {
        return res.status(422).send({ mensagem: "O preço é obrigatório!" })
    }
    if (!imagem) {
        return res.status(422).send({ mensagem: "A imagem é obrigatória!" })
    }
    if (!categoria) {
        return res.status(422).send({ mensagem: "A categoria é obrigatória!" })
    }
    if (!descricao) {
        return res.status(422).send({ mensagem: "A descrição é obrigatória!" })
    }
    if (!cepEstoque) {
        return res.status(422).send({ mensagem: "O cep do estoque é obrigatório!" })
    }
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })

        }
        const query = `INSERT INTO produtos (nome, estoque, preco, id_vendedor, imagem, categoria, descricao, cepEstoque) VALUES (?,?,?,?,?,?,?,?)`
        conn.query(query, [nome, estoque, preco, id_vendedor, caminhos, categoria, descricao, cepEstoque], (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }
            res.status(201).send({
                message: "Produto cadastrado com sucesso!",
                idProduto: result.insertId,
            });
        })
    })
})

module.exports = router