import wif from './wif.js'
const privateKey = new Uint8Array([
  222,  82,  79, 154, 176, 203,  56, 216,
  254, 100,  98,  23, 214,  80, 182, 232,
    0,  85, 240, 138, 203, 202,  31, 210,
   75,  13,  23,  72, 186,  93, 241,  78
])

const encoded = await wif.encode(1, privateKey, false)

const decoded = await wif.decode(encoded, 1)

console.log('# can encode/decode');
console.log(new TextDecoder().decode(decoded.privateKey) === new TextDecoder().decode(privateKey));