import { Schema, createConnection } from 'mongoose';
import { jwtSign , jwtVerify } from '../routes/users/jsonwebtoken.js';
import { compare } from 'bcrypt';
import { uid } from 'uid';
import 'dotenv/config'

 export async function dbGetUserData( jwtVerifyUser ){
    try{
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const Userdata = connection.model('userdata', new Schema( { 
            username: String , 
            editList : [ {
                title : String ,
                url : String ,
                note : String ,
                id:String
            } ],
            favList:[{
                title : String ,
                url : String ,
                note : String ,
                id:String
            }]
         }));

        const getUser = await Userdata.findOne( { username:jwtVerifyUser.username } )

        return getUser ? getUser : '還沒有資訊'

    }catch(error){
        console.log(error)
        return false
    }
}

export async function dbCreateUserData( userInfo ){
    try{
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const Userdata = connection.model('userdata', new Schema( { 
            username: String , 
            editList : [ {
                title : String ,
                url : String ,
                note : String ,
                id:String
            } ],
            favList:[{
                title : String ,
                url : String ,
                note : String ,
                id:String
            }]
         }));

        const getUser = await Userdata.create(
            { 
                username: userInfo.username , 
                editList : [],
                favList:[]
             }
        )
        return getUser

    }catch(error){
        console.log(error)
        return false
    }
}

export async function dbUploadUserData( userData , urlParams ,  jwtVerifyUser ){

    try{
        const findUser = await dbGetUserData(jwtVerifyUser)
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const Userdata = connection.model('userdata', new Schema( { 
            username: String , 
            editList : [ {
                title : String ,
                url : String ,
                note : String ,
                id:String
            } ],
            favList:[{
                title : String ,
                url : String ,
                note : String  ,
                id:String
            }]
        }));
        const compareData = await Userdata.findOne({username:findUser.username})
        compareData[urlParams].push({...userData,id:uid()})
        const updateData = compareData[urlParams]
        await Userdata.updateOne( {username:findUser.username} , {$set:{[urlParams]:updateData}} )
        return '已上傳'

    }catch(error){
        console.log(error)
        return false
    }
}

export async function dbPutUserData( userData , urlParams , jwtVerifyUser ){
    try{
        const findUser = await dbGetUserData(jwtVerifyUser)
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const Userdata = connection.model('userdata', new Schema( { 
            username: String , 
            editList : [ {
                title : String ,
                url : String ,
                note : String ,
                id:String
            } ],
            favList:[{
                title : String ,
                url : String ,
                note : String  ,
                id:String
            }]
        }));
        const compareData = await Userdata.findOne({username:findUser.username})
        const newArray = compareData[urlParams].map( ( item ) => userData.id === item.id ? userData : item )
        await Userdata.updateOne( {username:findUser.username} , {$set:{ [urlParams] : newArray}} )
        return '已上傳'

    }catch(error){
        console.log(error)
        return false
    }
}

export async function dbDelUserData( userData , urlParams , jwtVerifyUser ){
    try{
        const findUser = await dbGetUserData(jwtVerifyUser)
        const connection =  createConnection(process.env.MONGO_CONNECTION_STRING);
        const Userdata = connection.model('userdata', new Schema( { 
            username: String , 
            editList : [ {
                title : String ,
                url : String ,
                note : String ,
                id:String
            } ],
            favList:[{
                title : String ,
                url : String ,
                note : String  ,
                id:String
            }]
        }));
        const compareData = await Userdata.findOne({username:findUser.username})
        const newArray = compareData[urlParams].filter( ( item ) => userData.id !== item.id )
        await Userdata.updateOne( {username:findUser.username} , {$set:{ [urlParams] : newArray}} )
        return '已上傳'

    }catch(error){
        console.log(error)
        return false
    }
}


export function validateInput(data) {
    if (!data.hasOwnProperty('title') || !data.hasOwnProperty('url') || !data.hasOwnProperty('note')) {
        return false;
    }

    if (typeof data.title !== 'string' || typeof data.url !== 'string' || typeof data.note !== 'string') {
        return false;
    }
    return true;
}

