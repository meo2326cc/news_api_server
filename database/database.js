import { Schema, createConnection } from 'mongoose';
import { jwtSign , jwtVerify } from '../routes/users/jsonwebtoken.js';
import { compare } from 'bcrypt';
import 'dotenv/config'
import { dbCreateUserData, dbUploadUserData } from './handleUserInfo.js';



export async function register(userInfo , res ){

    try{
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const User = connection.model('users', new Schema( { username:String , password:String } ));        
        if( JSON.stringify(await User.find({"username": userInfo.username }) ) === '[]' ){
            const add =  new User(userInfo)
            await add.save()
            dbCreateUserData( userInfo ) ? res.status(200).send('註冊成功') : res.status(500).send('寫入系統錯誤，請洽管理員')
            
        }else{
            res.status(409).send('該使用者已註冊') 
        }
    }catch(error){
        console.log(error)
        res.status(500).send('連接資料庫發生錯誤')
    }
    
}

export async function login(userInfo , res ){

    try{
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const User = connection.model('users', new Schema( { username:String , password:String}));
        const searchUser = await User.findOne({"username": userInfo.username })
        if( searchUser !== null ){
            // compare( userInfo.password , searchUser?.password , function(err, result) {
            //     result ? res.status(200).send({ success:'已登入' , token: jwtSign( {username:searchUser.username} ) }) : res.status(401).send('密碼錯誤')
            // });
            const compareResult = await compare( userInfo.password , searchUser?.password )
            compareResult ? res.status(200).send({ success:'已登入' , token: jwtSign( {username:searchUser.username} ) }) : res.status(401).send('密碼錯誤')
        }else{
            res.status(401).send('查無使用者')
        }
    }catch(error){
            console.log(error)
            res.status(500).send('無法連接資料庫')
    }

}


export async function verifyUser( token ){
    try{
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const User = connection.model('users', new Schema( { username:String , password:String}));
        const jwtVerifyResult = jwtVerify( token )
        const searchUser = await User.findOne({"username": jwtVerifyResult.username })
        return searchUser
    }catch(error){
        return false
    }
}


