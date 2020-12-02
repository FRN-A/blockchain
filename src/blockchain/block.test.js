import Block from './block';

describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;

    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        previousBlock = Block.genesis;
        data = 'transcaccion0';
        hash = 'hash0';
    });

    it('crear instancia con parametros', () => {
        const block = new Block(timestamp, previousBlock.hash, hash, data);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
    });

    it('usando static mine', () => {
        const block = Block.mine(previousBlock, data);

        expect(block.hash.length).toEqual(64);
        expect(block.previousHash).toEqual(previousBlock.hash);
        expect(block.data).toEqual(data);
    });

    it('usando static hash', () => {
        hash = Block.hash(timestamp, previousBlock.hash, data);
        const hashOutput = "3017dca3586ac97c63a827adc77f75858760c71fe576514abad5620cd81f2340";
        
        expect(hash).toEqual(hashOutput);
    });

    it('usando toString', () => {
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual("string");
    });
});