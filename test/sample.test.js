const {add} = require('./sample');

describe('to test add functionality', () => {

    beforeEach(() => {
        console.log("before each test case");
    });

    afterEach(() => {

    });

    beforeAll(() => {

    });

    afterAll(() => {

    });

    it('should add two numbers and give correct output if the inputs are valid numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    it('should work for strings if they can be converted into numbers', () => {
        expect(add('2', '3')).toBe(5);
    });

    it('should fail for strings other than numbers', () => {
        expect(add('10x', 'academy')).toBe('please provide valid numbers');
    });
});

describe('subtract functionality', () => {

});