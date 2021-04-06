import 'reflect-metadata'
import { createConnection } from 'typeorm'

import './servers/pop3'
import './servers/api'

createConnection().then(() => console.log('db connected'))
