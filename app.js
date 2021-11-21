const WebSocketServer = new require('ws')

const wss = new WebSocketServer.Server({ port: 8080 })

const clients = []

wss.on('connection', (newClient) => {
    console.log(`Hoвoe соединение`)
    clients.push(newClient)
    
  //  newClient.send("Привет добро пожаловать в чат")
  //   clients.forEach(client => {
  //       if (client !== newClient) {
  //       client.send(`К нам подключился ${clients.length} пользователь`)
  //   }
  //   })
    
    newClient.on("close", () => {
      const idx = clients.findIndex(client => client === newClient)
      clients.splice(idx, 1)
    })
    
    newClient.on("message", (data) => {
      const buf = Buffer.from(data)
      const message = buf.toString()

      clients.forEach(user => {
        if (user !== newClient) {
          user.send(message)
        }
      })
    })
})

