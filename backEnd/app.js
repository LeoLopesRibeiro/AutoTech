const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use("/uploads", express.static("uploads"))

const rotaProdutos = require("./routes/produtos.routes")
const rotaVendedores = require("./routes/vendedores.routes")
const rotaClientes = require("./routes/clientes.routes")

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )

    if(req.method === "OPTIONS"){
        res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH")
        return res.status(200).send({})
    }

    next()
})

app.use("/produtos", rotaProdutos)
app.use("/vendedores", rotaVendedores)
app.use("/clientes", rotaClientes)

// app.use((req, res) => {
//     res.status(200).send({
//         message: "rodando"
//     })
// })


//quando não encontrar uma rota
app.use((req, res, next) => {
    const erro = new Error("Não foi possível encontrar uma rota")
    erro.status(404)
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error || 500)

    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})
module.exports = app