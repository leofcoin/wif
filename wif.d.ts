export declare const encode: (version: number, privateKey: Uint8Array | ArrayLike<number>, compressed: boolean) => Promise<string>;
export declare const decode: (wif: Uint8Array, version: number) => Promise<object>;
declare const _default: {
    encode: (version: number, privateKey: Uint8Array | ArrayLike<number>, compressed: boolean) => Promise<string>;
    decode: (wif: Uint8Array, version: number) => Promise<object>;
};
export default _default;
