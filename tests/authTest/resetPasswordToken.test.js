const mongoose=require("mongoose")
const app=require("../../app")
const request=require("supertest")

describe('auth controller for reseting the password and generating a token', () => {

    test('should throw an error when the email is not found', async () => { 
        const response=await request(app).post("/auth/reset-password-token").send()
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Email is required')

    })

    test('should throw an error when the user is not found', async () => { 
        const response=await request(app).post("/auth/reset-password-token").send({
            email:"umeshkumawat2809@gmail.com"
        })
        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('User not found')

    })


    test('should work when the email is verified and user is found', async () => { 
        const response=await request(app).post("/auth/reset-password-token").send({
            email:"umeshkumawat280@gmail.com"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Password reset link is successfully sent to your email. Please check your email')

    })    
})
