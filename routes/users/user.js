import  Express  from "express";
import {  hash  } from "bcrypt";
import { register , login } from "../../database/database.js";
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
//const someOtherPlaintextPassword = 'not_bacon';

export const router = Express.Router()

export async function handleRegistration (req , res) {   

    if(JSON.stringify(req.body) === '{}'){
        res.status(400).send('資料不得為空')
    }else if( !(req?.body.username && req?.body.password) ){
        res.status(400).send('請填寫欄位')
    }else if ( !(/^[a-z0-9]+$/i.test( req?.body.username) )  ){
        res.status(400).send('不得使用英文字母或數字以外的輸入法')
    } else if( req?.body.password.length < 4 ){
        res.status(400).send('密碼長度不得小於4')
    }else if ( req?.body.username.length < 4) {
        res.status(400).send('帳號長度不得小於4')
    }else{
    //     hash( req.body.password , saltRounds, async function(err, hash) {
    //     await register({"username":req.body.username , "password":hash } , res )
    // }); 
    const hashPassword = await hash( req.body.password , saltRounds )
    await register({"username":req.body.username , "password":hashPassword } , res )


    }
}

export function handleLogin(req , res) {   

    if(JSON.stringify(req.body) === '{}'){
        res.status(400).send('資料不得為空')
    }else if( !(req?.body.username && req?.body.password) ){
        res.status(400).send('請填寫欄位')
    }else{
        login({"username":req.body.username , "password": req.body.password } , res )
    }
}

router.post('/register' , handleRegistration )
router.post('/login' ,  handleLogin)