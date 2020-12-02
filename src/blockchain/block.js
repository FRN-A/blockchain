import { SHA256 } from 'crypto-js';

const DIFICULTAD = 3;

class Block {
    constructor(timestamp, previousHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    static get genesis(){
        const timestamp = (new Date(200, 0, 1)).getTime();     
        return new this(timestamp, undefined, 'g3n3s1s-h4sh', "transaccion0");   
    } 

    static mine(previousBlock, data){
        const { hash: previousHash } = previousBlock;
        let timestamp;
        let hash;
        let nonce = 0;

        do {
            timestamp = Date.now();
            hash = Block.hash(timestamp, previousHash, data);
        } while (hash.substring(0, DIFICULTAD) !== '0'.repeat(DIFICULTAD));

        return new this(timestamp, previousHash, hash, data, nonce);
    }

    static hash(timestamp, previousHash, data){
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
    }

    toString(){
        const{
            timestamp, previousHash, hash, data, nonce
        } = this;

        return `Block -
            timeStamp : ${timestamp}
            previousHash : ${previousHash}
            hash : ${hash} 
            data : ${data} 
            nonce : ${nonce}
        `;
    }
}

export default Block;