const request=require('supertest')
const mongoose=require('mongoose')
const app=require('../../app')

beforeAll(async () => {
  const mongoDbUrl = process.env.MONGODB_URL;
  const connection = await mongoose.connect(mongoDbUrl);
  console.log(`${connection} established`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication controller for signup only', () => {
  test('should signup a new user',async () => {
    const response=await request(app)
    .post('/auth/signup')
    .send({
        firstName:'ajay',
        lastName:'kumawat',
        email:'umiakumawat@gmail.com',
        password:'12345678',
        phoneNumber:'8591939619'
    })   
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toMatch('OTP has been sent to your email. Please check your email.')
  })


  const requiredFields=['firstName','lastName','email','password','phoneNumber']

  function generateTestCases(userData){
    const testCases=[]
    for(  let i=0;i<requiredFields.length;i++){
      const newData={...userData}
      delete newData[requiredFields[i]]
      testCases.push(newData)
    }
    return testCases
  }
  const userData={
    firstName:"umesh",
    lastName:"kumawat",
    email:"umiakumawat@gmail.com",
    password:"12345678",
    phoneNumber:"8591939619"
  }

  const testCases=generateTestCases(userData)
  console.log(testCases)

  testCases.forEach((testCase,index)=>{
    test(`should return error when the ${requiredFields[index]} is missing`, async () => {
        const response=await request(app).post('/auth/signup').send(testCase)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toMatch('Please fill all the details')
    })
    
  })

  test('should return user already exists unique email not provided', async () => {
    const response=await request(app).post('/auth/signup').send({
      firstName:"umesh",
      lastName:"kumawat",
    email:"umeshkumawat280@gmail.com",
    password:"12345678",
      phoneNumber:"8591939619"
  })  
  expect(response.statusCode).toBe(409)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toMatch('User already exists')
  })
  


})
