const express = require('express')
const router = express.Router()
const db = require("../conexao")
const multipleImages = require('../middlewares/uploadImage')
const fs = require('fs')

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

        const query = `SELECT * FROM produtos AS p INNER JOIN vendedores AS v ON p.id_vendedor=v.idVendedor WHERE idProduto=${id_produto}`

        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }

            res.status(200).send({
                result: {
                    idProduto: result[0].idProduto,
                    nome: result[0].nome,
                    imagem: result[0].imagem,
                    categoria: result[0].categoria,
                    cepEstoque: result[0].cepEstoque,
                    avaliacaoProduto: result[0].avaliacaoProduto,
                    estoque: result[0].estoque,
                    vendedor: {
                        idVendedor: result[0].idVendedor,
                        cpfVendedor: result[0].cpfVendedor,
                        cnpjVendedor: result[0].cnpjVendedor,
                        emailVendedor: result[0].emailVendedor,
                        avaliacaoVendedor: result[0].avaliacaoVendedor,
                    }
                }
            })
        })
    })
})


//buscar produtos pelo id do vendedor
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

router.post("/cadastro/:id_vendedor", multipleImages, (req, res) => {
    const id_vendedor = req.params.id_vendedor
    const imagem = req.files
    const { nome, estoque, preco, categoria, descricao, cepEstoque } = req.body
    // console.log(imagem.imagem[1].path)

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
    let caminhos = ""
    req.files.imagem.forEach(imagem => {
        if (caminhos.length === 0) {
            caminhos = imagem.path
            // console.log(caminhos)
        } else {
            caminhos = `${caminhos},${imagem.path}`
            // console.log(caminhos)
        }
    });
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

router.put("/editar-produto/:id_produto", multipleImages, (req, res) => {
    const id_produto = req.params.id_produto
    const imagem = req.files
    const { nome, estoque, preco, id_vendedor, categoria, descricao, cepEstoque } = req.body

    if (!nome) {
        return res.status(422).send({ mensagem: "O nome é obrigatório!" })
    }
    if (!estoque) {
        return res.status(422).send({ mensagem: "A quantidade em estoque é obrigatória!" })
    }
    if (!preco) {
        return res.status(422).send({ mensagem: "O preço é obrigatório!" })
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

    let caminhos = ""
    req.files.imagem.forEach(imagem => {
        if (caminhos.length === 0) {
            caminhos = imagem.path
            console.log(caminhos)
        } else {
            caminhos = `${caminhos},${imagem.path}`
            console.log(caminhos)
        }
    });

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query_get = `SELECT * FROM produtos WHERE id_vendedor=${id_vendedor} AND idProduto=${id_produto}`
        conn.query(query_get, (error, result) => {
            if (error) {
                return res.status(500).send({
                    error: error
                })
            }

            if (result.length > 0) {
                const fotosAntigas = result[0].imagem.split(",")

                // console.log(fotosAntigas)
                if (imagem) {
                    const query = `UPDATE produtos SET nome = '${nome}', imagem = ?, estoque = '${estoque}', preco = '${preco}', categoria = '${categoria}', descricao = '${descricao}', cepEstoque = '${cepEstoque}' WHERE idProduto = ${id_produto}`;
                    conn.query(query, [caminhos], (error, result) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error });
                        }

                        fotosAntigas.forEach((imagem) => {
                            fs.unlinkSync(imagem);
                        })
                    })
                } else {
                    const query = `UPDATE produtos SET nome = '${nome}', imagem = ?, estoque = '${estoque}', preco = '${preco}', categoria = '${categoria}', descricao = '${descricao}', cepEstoque = '${cepEstoque}' WHERE idProduto = ${id_produto}`;
                    conn.query(query, [result[0].imagem], (error, result) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error });
                        }
                        fotosAntigas.forEach((imagem) => {
                            fs.unlinkSync(imagem);
                        })
                    })
                }
                return res.status(200).send({ message: "Dados alterados com sucesso." });
            }
            res.status(401).send({ mensagem: "Você não tem permissão para realizar esta ação!" })
        })
    })
})

//****//
router.delete("/apagar-produto/:id_produto", (req, res) => {
    const id_produto = req.params.id_produto
    const { id_vendedor } = req.body

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query_get = `SELECT * FROM produtos WHERE id_vendedor=${id_vendedor} AND idProduto=${id_produto}`
        conn.query(query_get, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error });
            }
            const fotosAntigas = result[0].imagem.split(",")
            if (result.length > 0) {
                const query = `DELETE FROM produtos WHERE id_vendedor=${id_vendedor} AND idProduto=${id_produto}`

                conn.query(query, (error, result) => {
                    conn.release()
                    if (error) {
                        return res.status(500).send({ error: error })
                    }

                    fotosAntigas.forEach((imagem) => {
                        fs.unlinkSync(imagem);
                    })
                    return res.status(200).send({ mensagem: "Produto deletado com sucesso!" })
                })
            } else {
                return res.status(401).send({ mensagem: "Você não tem permissão para realizar esta ação!" })
            }
        })
    })
})


module.exports = router