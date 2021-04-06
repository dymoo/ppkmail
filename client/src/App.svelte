<script lang="ts">
  import * as libCrypto from '$lib/crypto'

  let password: string = ''
  let publicKey: string = ''
  let privateKey: string = ''

  let encryptedprivateKey: string = ''
  let decryptedprivateKey: string = ''

  const generatekeyPair = async () => {
    const keyPair = await libCrypto.ppkGen()

    publicKey = keyPair.publicKey
    privateKey = keyPair.privateKey
  }

  const encryptprivateKey = async () => {
    if (!privateKey) {
      alert('private key must be generated first!')
      return
    }

    if (!password) {
      alert('password not set!')
      return
    }

    encryptedprivateKey = JSON.stringify(
      await libCrypto.aesEncrypt(privateKey, password)
    )
  }

  const decryptprivateKey = async () => {
    if (!encryptedprivateKey) {
      alert('private key not encrypred')
      return
    }

    if (!password) {
      alert('password not set!')
      return
    }

    const { cipherText, iv } = JSON.parse(encryptedprivateKey)

    decryptedprivateKey = await libCrypto.aesDecrypt(cipherText, password, iv)
  }
</script>

<textarea bind:value={publicKey} placeholder="publicKey" />
<br />
<textarea bind:value={privateKey} placeholder="privateKey" />
<br />
<input type="text" bind:value={password} placeholder="password" />
<br />
<button on:click={generatekeyPair}>Generate keypair</button>
<br />
<button on:click={encryptprivateKey}>encrypt priv key</button>
<br /><br />
<textarea bind:value={encryptedprivateKey} />
<br /><br />
<button on:click={decryptprivateKey}>Decrypt</button>
<br />
<textarea bind:value={decryptedprivateKey} />
