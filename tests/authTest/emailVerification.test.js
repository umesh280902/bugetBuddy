const mongoose=require('mongoose')
const generateOTP=require('../../helpers/otpGenerator')
const tempUsersRepository=require('../../repositories/tempUsersRepository')
const sendMail=require('../../helpers/sendMail')
const request=require('supertest')
const app=require('../../app')

jest.mock('../../helpers/otpGenerator')
jest.mock('../../helpers/sendMail')
describe('auth controller for email verification',() => {
    
    test('should signup and email verify with OTP',async () => {
      const mockedOTP='123456'
        generateOTP.mockReturnValue(mockedOTP)
        sendMail.mockImplementation(()=>Promise.resolve())

        const signupResponse=await request(app).post('/auth/signup').send({
            firstName:'umesh',
            lastName:'kumawat',
            email:'umiakumawat@gmail.com',
            password:'12345678',
            phoneNumber:'8591939619'
        })
        expect(signupResponse.statusCode).toBe(200)
        expect(signupResponse.body.message).toMatch('OTP has been sent to your email. Please check your email.')

        const tempUsers=await tempUsersRepository.getTempUserByEmail('umiakumawat@gmail.com')
        expect(tempUsers).not.toBeNull()

        const verificationResponse=await request(app).post('/auth/email-verification').send({
            email:"umiakumawat@gmail.com",
            otp:mockedOTP
        })

        expect(verificationResponse.statusCode).toBe(201)
        expect(verificationResponse.body).toHaveProperty('token')
        expect(verificationResponse.body.message).toMatch('User successfully created')

    })
    

    test('should show failed signup and email verification with incorrect OTP', async () => {
        const mockedOTP='123456'
        generateOTP.mockReturnValue(mockedOTP)
        sendMail.mockImplementation(()=>Promise.resolve())

        const signupResponse=await request(app).post('/auth/signup').send({
            firstName:'umesh',
            lastName:'kumawat',
            email:'umeshkumawat2809@gmail.com',
            password:'12345678',
            phoneNumber:'8591939619'
        })
        expect(signupResponse.statusCode).toBe(200)
        expect(signupResponse.body.message).toMatch('OTP has been sent to your email. Please check your email.')

        const tempUsers=await tempUsersRepository.getTempUserByEmail('umeshkumawat2809@gmail.com')
        expect(tempUsers).not.toBeNull()

        const incorrectOTP='654321'
        const verificationResponse=await request(app).post('/auth/email-verification').send({
            email:"umeshkumawat2809@gmail.com",
            otp:incorrectOTP
        })

        expect(verificationResponse.statusCode).toBe(400)
        expect(verificationResponse.body.message).toMatch('Invalid OTP')
    })
    




    test('should return error when one of the data is missing email or otp',async  () => {
    const data=[
        {
        email:"umiakumawat@gmail.com"
        },{
            otp:"123456"
        }
    ]  
    for( const d of data){
        const response=await request(app).post('/auth/email-verification').send(d)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Please provide email and OTP')
    }
    })
    
})
