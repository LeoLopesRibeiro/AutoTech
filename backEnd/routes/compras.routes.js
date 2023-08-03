const express = require("express")
const router = express.Router()
const db = require("../conexao")


//fazer rota para o vendedor mudar o status do produto****
router.get("/", (req, res) => {
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query = `SELECT * FROM compras`
        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({ error: error })
            }

            res.status(500).send({ result: result })
        })
    })
})
router.get("/codigo-compra/:codigo", (req, res) => {
    const codigo = req.params.codigo
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query = `SELECT * FROM compras WHERE codigoCompra=${codigo}`
        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({ error: error })
            }

            res.status(500).send({ result: result })
        })
    })
})

router.get("/:id", (req, res) => {
    const id_compra = req.params.id

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query = `SELECT * FROM compras WHERE id=${id_compra}`
        conn.query(query, (error, result) => {
            conn.release()
            if (error) {
                return res.status(500).send({ error: error })
            }
            res.status(200).send({ result: result })
        })
    })
})

router.post("/comprar", (req, res) => {
    const { id_cliente, id_produto, quantidade, preco } = req.body

    if (!id_cliente) {
        return res.status(422).send({ mensagem: "A identificação do cliente é obrigatória!" })
    }
    if (!id_produto) {
        return res.status(422).send({ mensagem: "A identificação do produto é obrigatória!" })
    }
    if (!quantidade) {
        return res.status(422).send({ mensagem: "A quatidade paga é obrigatória!" })
    }
    if (!preco) {
        return res.status(422).send({ mensagem: "O preço pago é obrigatório!" })
    }
    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }

        const query_get = `SELECT estoque FROM produtos WHERE idProduto=${id_produto}`

        conn.query(query_get, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error })
            }
            if (result.length > 0) {
                if (quantidade > result[0].estoque) {
                    return res.status(409).send({ mensagem: "Não há tantos items no estoque" })
                } else {
                    const novoEstoque = result[0].estoque - quantidade;

                    const query_estoque = `UPDATE produtos SET estoque=${novoEstoque} WHERE idProduto = ${id_produto}`;

                    conn.query(query_estoque, (error, result) => {
                        if (error) {
                            return res.status(500).send({ error: error })
                        }

                        var random = Math.ceil(Math.random() * Math.pow(10, 6)); //Cria um n�mero aleat�rio do tamanho definido em size.
                        var digito = Math.ceil(Math.log(random)); //Cria o d�gito verificador inicial
                        while (digito > 10) {
                            //Pega o digito inicial e vai refinando at� ele ficar menor que dez
                            digito = Math.ceil(Math.log(digito));
                        }

                        var codigoCompra = random + digito;
                        const query = `INSERT INTO compras (id_cliente, id_produto, preco, quantidade, codigoCompra) VALUES (?,?,?,?,?)`;

                        conn.query(query, [id_cliente, id_produto, preco, quantidade, codigoCompra], (error, result) => {
                            if (error) {
                                return res.status(500).send({ error: error })
                            }
                            res.status(200).send({
                                mensagem: "Produto comprado com sucesso!",
                            })
                        })
                    })
                }
            }else{
               return res.status(404).send({ mensagem: "Produto não encontrado!" })
            }
        })
    })
})

router.put("/mudar-status/:id_compra", (req, res) => {
    const id_compra = req.params.id_compra;
    const {id_vendedor, novoStatus} = req.body

    console.log(novoStatus)
    if(novoStatus != "Saiu para entrega" && novoStatus != "Pedido entregue"){
        return res.status(422).send({mensagem: "O novo status do produto não foi reconhecido"})
    }

    db.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                mensagem: "Não foi possível realizar a conexão",
                error: error
            })
        }
        const query_get = `SELECT * FROM compras AS c INNER JOIN produtos AS p INNER JOIN vendedores AS v WHERE p.idProduto=c.id_produto AND p.id_vendedor=${id_vendedor} AND v.idVendedor=${id_vendedor}`
        conn.query(query_get, (error, result) => {
            if (error) {
                return res.status(500).send({ error: error })
            }
            if(result.length > 0){
                const query = `UPDATE compras SET status='${novoStatus}'`

                conn.query(query, (error, result) => {
                    if (error) {
                        return res.status(500).send({ error: error })
                    }
                    res.status(200).send({
                        mensagem: "Status alterado com sucesso!",
                    })

                })
            }else{
                return res.status(404).send({ mensagem: "Pedido não encontrado!" })
            }
        })
    })
})

module.exports = router