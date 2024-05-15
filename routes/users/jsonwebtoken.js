import jwt from "jsonwebtoken";
import 'dotenv/config'



export function jwtSign ( payload ) {
    return jwt.sign( payload , process.env.JWT_KEY ,  { expiresIn: '7d' } );
}


export function jwtVerify( token ){
    try{
        return  jwt.verify( token , process.env.JWT_KEY )
    }catch(err){
        return { username:undefined , error:err.message }
    }
}



