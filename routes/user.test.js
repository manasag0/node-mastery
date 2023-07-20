const request = require('supertest');
const app = require('../express-server');
const User = require('../model/user');
const bcrypt = require('bcrypt');

describe('test /user and its APIs', () => {

    beforeEach(async() => {
        // await User.deleteMany({});
    });

    describe('/POST register', () => {
        // Our agenda is to test the /register API under different scenarios
    //We will mock/fake the actual save to DB.
    // We will use supertest for testing our APIs
    it('should register a new user', async () => {

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
    it('should give approporiate response if it fails to register a new user', async () => {

        jest.spyOn(User.prototype, 'save'). mockRejectedValueOnce(new Error('Failed to create user'));

        const userData = {
            email: "test@example.com",
            name: "test user",
            password: "1234"
        }

        const response = await request(app).post('/user/register').send(userData).expect(500);
        expect(response._body.errorDesc).toBe('Something went wrong!');
    });


    it('should give approporiate response if it fails to encrypt password', async () => {

        jest.spyOn(bcrypt, 'hash'). mockRejectedValueOnce(new Error('Encryption failed'));

        const userData = {
            email: "test@example.com",
            name: "test user",
            password: "1234"
        }

        const response = await request(app).post('/user/register').send(userData).expect(500);
        expect(response._body.errorDesc).toBe('Internal server error');
    });
    });

    describe('POST /login', () => {

        it('should show error if mongoDB call fails', async () => {

            const userData = {
                email: 'test@example.com',
                password: '1234'
            }
            // Intentionally making user.findOne call fail. So, it will go to catch block of this.
            jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('failed'));

            const response  = await request(app).post('/user/login').send(userData).expect(500);
            console.log(response._body);
            expect(response._body.errorDesc).toBe('Something went wrong!');
        }); 

        it('should fail if mongoDb returned null object', async () => {

            const userData = {
                email: 'test@example.com',
                password: '1234'
            }

            jest.spyOn(User, 'findOne').mockResolvedValue(null);

            const response  = await request(app).post('/user/login').send(userData).expect(404);
            // console.log(response._body);
            expect(response._body.errorDesc).toBe('Email id not registered with us!');
        }); 

        it('should fail if mongoDb returned empty object', async () => {

            const userData = {
                email: 'test@example.com',
                password: '1234'
            }

            jest.spyOn(User, 'findOne').mockResolvedValue({});

            const response  = await request(app).post('/user/login').send(userData).expect(500);
            // console.log(response._body);
            expect(response._body.errorDesc).toBe('Internal server error');
        }); 

        it('should fail if passowrds mismatch', async () => {

            const userData = {
                email: 'test@example.com',
                password: '1234'
            }

            jest.spyOn(User, 'findOne').mockResolvedValue({});
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

            const response  = await request(app).post('/user/login').send(userData).expect(403);
            // console.log(response._body);
            expect(response._body.errorDesc).toBe('Email or password does not match');
        }); 

        it('should authenticate a user and return a token', async () => {

            const userData = {
                email: 'test@example.com',
                password: '1234'
            }

            jest.spyOn(User, 'findOne').mockResolvedValueOnce({});
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

            const response  = await request(app).post('/user/login').send(userData).expect(200);
            // console.log(response._body);
            expect(User.findOne).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalled();
            expect(response._body.message).toBe('Authentication successful!');
            expect(response._body.data).toBeDefined();
        });
    });

    


});