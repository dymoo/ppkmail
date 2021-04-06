import net from 'net'

const server = new net.Server()

server.listen(110, '0.0.0.0', () => console.log('POP3 server listening! (110)'))

const messagebuffer = Buffer.from(
  'George Jones asks his secretary  (Secy@Host)  to  send  a message for him in his capacity as Group.  He wants his secre-tary to handle all replies.\r\nFrom:     George Jones <Group@Host>\r\nSender:   Secy@Host\r\nReply-To: Secy@Host\r\nContent-Type: text/plain\r\nSubject: Your IG Statement - 05 Apr 2021\r\n',
  'utf-8'
)

server.on('connection', (socket) => {
  console.log('A new connection has been established.')

  socket.write('+OK POP3 server ready <dylan@imdylan.me>\r\n')

  socket.on('data', (chunk) => {
    const [i0, i1, i2] = chunk.toString().replace('\r\n', '').split(' ')

    switch (i0) {
      case 'USER': {
        console.log('auth', i1)
        socket.write('+OK mrose is a real hoopy frood\r\n')
        break
      }
      case 'PASS': {
        console.log('pass', i1)
        socket.write("+OK mrose's maildrop has 2 messages (320 octets)\r\n")
        break
      }
      case 'APOP': {
        const username = i1
        const password = i2
        console.log('apop', username, password)
        socket.write('+OK\r\n')
        break
      }
      case 'STAT': {
        console.log('stat')
        socket.write('+OK 2 320\r\n')
        break
      }
      case 'UIDL': {
        console.log('uidl')

        if (i1) {
          console.log('second contition')
          console.log(i2)
        } else {
          socket.write('+OK\r\n')
          socket.write('1 whqtswO00WBw418f9t5JxYwZ\r\n')
          socket.write('2 QhdPYR:00WBw1Ph7x7\r\n')
          socket.write('.\r\n')
        }

        // socket.write('+OK\r\n')

        break
      }
      case 'LIST': {
        console.log('list')
        socket.write('+OK Mailbox scan listing follows\r\n')
        socket.write('1 120\r\n')
        socket.write('2 200\r\n')
        socket.write('.\r\n')
        break
      }
      case 'RETR': {
        socket.write(`+OK ${messagebuffer.length} octets\r\n`)
        socket.write(messagebuffer)
        socket.write('.\r\n')
        break
      }
      case 'QUIT': {
        console.log('quit')
        break
      }
      default: {
        console.log('unknown case', i0, i1, i2)
        break
      }
    }
  })

  socket.on('end', () => console.log('Connection ended'))
  socket.on('error', (err) => console.log(`Error: ${err}`))
})
