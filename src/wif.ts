import base58check from '@vandeurenglenn/base58check'

type decodeWif = {
  version: number,
  privateKey: Uint8Array,
  compressed: boolean
}

export const encode = (version: number, privateKey: Uint8Array | ArrayLike<number>, compressed: boolean): Promise<string> => {
  if (privateKey.length !== 32) throw new TypeError(`Invalid privateKey length: expected 32 got ${privateKey.length}`)
  const uint8Array = new Uint8Array(compressed ? 34 : 33)
  uint8Array.set([Number(version)])
  uint8Array.set(privateKey, 1)
  if (compressed) {    
    uint8Array.set([Number(version)], 33)
  }
  return base58check.encode(uint8Array)
}

export const decode = async (wif: Uint8Array, version: number): Promise<decodeWif> => {
  wif = (await base58check.decode(wif)).data

  if (version && wif[0] !== version) throw new Error('Invalid network version')
  if (wif.length < 33 || wif.length > 34) throw new Error('Invalid WIF length')

  const comp = new TextEncoder().encode('1')  
  if (wif.length === 34 && wif[33] !== comp[0]) throw new Error('Invalid compression flag')

  return {
    version: wif[0],
    privateKey: wif.subarray(1, 33),
    compressed: wif.length === 33 ? false : true
  }
}

export default { encode, decode }