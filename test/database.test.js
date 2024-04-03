import { verifyUser } from "../database/database";


 describe( 'verify token' , ()=>{

   const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZTEwIiwiaWF0IjoxNzExNDU0Mzc2fQ.Zi51TQmI5lPP7ldb4CJ8peQ1uhbE8Ra2buo92XR_eZc'
    
    test( 'success: return object' , async()=>{ 
        expect(verifyUser(testToken)).resolves.toHaveProperty('username', 'joe10' )
    })

    
    test( 'fail: return false' , async()=>{
        expect(verifyUser('testToken')).resolves.toBeFalsy();
    } )
} )

