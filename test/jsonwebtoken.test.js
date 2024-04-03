import { jwtSign , jwtVerify  } from "../routes/users/jsonwebtoken.js";



describe( 'verify token' , ()=>{

    const payload = { username: 'joe10' } 
    const encript = jwtSign( payload )

    //加密jwt
    test( 'generate token' , ()=>{ 
        expect(typeof encript).toBe('string')
    })

    //還原jwt 
    test( 'verify result' , ()=>{
        expect(jwtVerify(encript)).toHaveProperty( 'username' , 'joe10' )
    } )
} )