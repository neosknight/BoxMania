const express = require("express")
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.get('/', (req, res) => {
	res.sendfile("public/index.html")
})

app.listen(port)