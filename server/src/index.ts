import * as smtpServer from 'smtp-server'

const server = new smtpServer.SMTPServer({
  onAuth: (auth, session, callback) => {
    console.log('auth?', auth, session)
    callback(null, { user: 123 })
  }
})

server.listen(465, '0.0.0.0', 400, () => console.log('listening!'))
