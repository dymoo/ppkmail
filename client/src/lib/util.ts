export function bufferbase64Encode(buffer: Uint8Array) {
  return btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )
}

export function bufferbase64Decode(str: string) {
  var binary_string = atob(str)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

export function convertStringToArrayBuffer(str: string) {
  const encoder = new TextEncoder()
  return encoder.encode(str)
}

export function convertArrayBuffertoString(buffer: Uint8Array) {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(buffer)
}
