const request=require('supertest')
const app=require('../../app')

jest.mock('../../helpers/tokenHelper')

describe('authentication controller for changing the password', () => {

    const token='thisis the token'
    createToken.mockReturnValue(token)
    createToken.mockImplementation()
    

    
})
