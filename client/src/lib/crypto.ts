import * as libUtil from './util'

const RSA_SIZE = 2048
const AES_SIZE = 256

export async function ppkGen() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: RSA_SIZE,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['encrypt', 'decrypt']
  )

  const publicKey = JSON.stringify(
    await crypto.subtle.exportKey('jwk', keyPair.publicKey)
  )

  const privateKey = JSON.stringify(
    await crypto.subtle.exportKey('jwk', keyPair.privateKey)
  )

  return { publicKey, privateKey }
}

export async function aesEncrypt(msg: string, key: string) {
  const userKey = await crypto.subtle.importKey(
    'raw',
    libUtil.convertStringToArrayBuffer(key),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  const cryptoKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array([1, 0, 1]),
      iterations: 250000,
      hash: 'SHA-256'
    },
    userKey,
    {
      name: 'AES-GCM',
      length: AES_SIZE
    },
    false,
    ['encrypt', 'decrypt']
  )

  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  const cipherText = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    cryptoKey,
    libUtil.convertStringToArrayBuffer(msg)
  )

  const b64cipherText = libUtil.bufferbase64Encode(<Uint8Array>cipherText)
  const b64iv = libUtil.bufferbase64Encode(iv)

  return { cipherText: b64cipherText, iv: b64iv }
}

export async function aesDecrypt(msg: string, key: string, iv: string) {
  const userKey = await crypto.subtle.importKey(
    'raw',
    libUtil.convertStringToArrayBuffer(key),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  const cryptoKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array([1, 0, 1]),
      iterations: 250000,
      hash: 'SHA-256'
    },
    userKey,
    { name: 'AES-GCM', length: AES_SIZE },
    false,
    ['encrypt', 'decrypt']
  )

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: libUtil.bufferbase64Decode(iv)
    },
    cryptoKey,
    libUtil.bufferbase64Decode(msg)
  )

  return libUtil.convertArrayBuffertoString(<Uint8Array>decrypted)
}
