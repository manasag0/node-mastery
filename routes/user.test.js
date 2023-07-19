const request = require('supertest');
const app = require('../express-server');
const User = require('../model/user');
const bcrypt = require('bcrypt');

describe('test /user and its APIs', () => {

    beforeEach(async() => {
        // await User.deleteMany({});
    });
    
    // Our agenda is to test the /register API under different scenarios
    //We will mock/fake the actual save to DB.
    // We will use supertest for testing our APIs
    it('POST /register should register a new user', async () => {

        const userData = {
            email: "test@example.com",
            name: "test user",
            password: "1234"
        }

        // mock DB
        jest.spyOn(User.prototype, 'save').mockResolvedValueOnce(
            {
                _id: "64b7f7b459ce5b5fecad83a7",
                email: 'test@example.com',
                name: 'test user',
                password: '$2b$10$vvx4E1kb5xOVqr4yCUgNfucHAne.O8C7bkwfg0DH2eRXHIC.1OOFK',
                __v: 0
            });

        // jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        //     _id: new ObjectId("64b7f7b459ce5b5fecad83a7"),
        //     email: 'test@example.com',
        //     name: 'test user',
        //     password: '$2b$10$vvx4E1kb5xOVqr4yCUgNfucHAne.O8C7bkwfg0DH2eRXHIC.1OOFK',
        //     __v: 0
        //   });

        //supertest
       const response = await request(app).post('/user/register').send(userData).expect(201);
       const resBody = response._body;
       expect(resBody.message).toBe("User registered successfully!");
       expect(resBody.data.email).toBe(userData.email);
       expect(resBody.data.name).toBe(userData.name);
       expect(resBody.data.password).toBe('$2b$10$vvx4E1kb5xOVqr4yCUgNfucHAne.O8C7bkwfg0DH2eRXHIC.1OOFK');

    //    const savedUser = await User.findOne({email: userData.email});
    //    expect(savedUser).toBeTruthy(); // should exist
    //    console.log(savedUser);
    //    expect(await bcrypt.compare(userData.password, savedUser.password)).toBe(true);
    });

    // fail case
    it('POST /register should give approporiate response if it fails to register a new user', async () => {

        jest.spyOn(User.prototype, 'save'). mockRejectedValueOnce(new Error('Failed to create user'));

        const userData = {
            email: "test@example.com",
            name: "test user",
            password: "1234"
        }

        const response = await request(app).post('/user/register').send(userData).expect(500);
        expect(response._body.errorDesc).toBe('Something went wrong!');
    });

});