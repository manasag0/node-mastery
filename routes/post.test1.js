const request = require('supertest');
const app = require('../express-server');
const User = require('../model/user');
const Post = require('../model/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


describe('test /post APIs', () => {
    it('should successfully create a post', async  () => {
        const token = 'fnmshfksjfhs';
        const post = {
            title: 'Test post',
            content: 'This is a test post'
        }

        jest.spyOn(jwt, 'verify').mockResolvedValueOnce({
            id: 'dummyId',
            title: 'Test post',
            content: 'This is a test post'
        });

        jest.spyOn(Post.prototype, 'save').mockResolvedValueOnce({});
        const response = await request(app)
        .post('/post/createPost')
        .set('Authorization', `Bearer ${token}`)
        .send(post)
        .expect(201);
    })
})