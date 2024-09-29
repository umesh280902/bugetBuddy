const request=require('supertest')
const app=require('../../app')
describe("auth controller for login testing",()=>{
    //should throw error when there email is missing
    test('should throw error when email is missing',async () => { 
        const response=await request(app).post('/auth/login').send({
            email:'umeshkumawat280@gmail.com'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch("Please provide email and password")

    })

    //should throw error when there password is missing
    test('should throw error when email is missing',async () => { 
        const response=await request(app).post('/auth/login').send({
            password:'12345678'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch("Please provide email and password")

    })

    //should throw error when user is not found
    test('should throw error when use is not found',async ()=>{
        const response=await request(app).post('/auth/login').send({
            email:'umeshkumawat@gmail.com',
            password:'12345678'
        })
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Invalid email or password')
    })
    
    //should throw error when password is not matching 
    test('should throw error when use is not found',async ()=>{
        const response=await request(app).post('/auth/login').send({
            email:'umeshkumawat280@gmail.com',
            password:'1234567a'
        })
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Invalid email or password')
    })

    //should work when there both credentials are correct
    test('should throw error when use is not found',async ()=>{
        const response=await request(app).post('/auth/login').send({
            email:'umeshkumawat280@gmail.com',
            password:'12345678'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Login successful')
    })
})




