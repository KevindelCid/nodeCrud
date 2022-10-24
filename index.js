const http = require('http')
const fs = require('fs/promises')
const path = require('path')

const PORT = 8000

const app = http.createServer(async (req, res) => {
    const method = req.method
    const url = req.url

    if (url === '/apiv1/tasks') {
        const pathJson = path.resolve('./data.json')
        const jsonFile = await fs.readFile(pathJson, 'utf8')

        if (method === 'GET') {
            console.log('hola estas haciendo una peticion GET en la ruta /')
            res.setHeader('Content-Type', 'application/json')
            res.writeHead("200")
            res.write(jsonFile)
            res.end()
        }
        if (method === 'POST') {
            req.on("data", (data) => {
                const parsedData = JSON.parse(data)
                const parsedFile = JSON.parse(jsonFile)
                parsedFile.push(parsedData)
                fs.writeFile(pathJson, JSON.stringify(parsedFile), (err) => {
                    if (err) console.log(err)
                    else res.writeHead("201")
                })
            })
            res.end()


        }
        if (method === 'PUT') {
            console.log('hola estas haciendo una peticion PUT en la ruta /')

            res.end()
        }
        if (method === 'PATCH') {
            console.log('hola estas haciendo una peticion PATCH en la ruta /')

            res.end()
        }
        if (method === 'DELETE') {
            console.log('hola estas haciendo una peticion DELETE en la ruta /')


            res.end()
        }
    }





})

app.listen(PORT)