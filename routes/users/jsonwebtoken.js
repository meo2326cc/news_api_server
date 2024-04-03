import jwt from "jsonwebtoken";
import 'dotenv/config'



export function jwtSign ( payload ) {
    return jwt.sign( payload , process.env.JWT_KEY );
}   


export function jwtVerify( token ){
    return jwt.verify( token , process.env.JWT_KEY ,  function( err , decord ){
        return decord
    } )
}



