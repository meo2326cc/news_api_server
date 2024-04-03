import { handleRegistration , handleLogin } from "../routes/users/user";
import { register } from "../database/database";
import { login } from "../database/database";
jest.mock('../database/database');

//測試 handleRegistration()
describe( 'handleRegistration ' , ()=>{
    test( '全部欄位未填寫' , ( )=>{
        
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const req = {body:{}}

        handleRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('資料不得為空');
    } )

    test.each([{body:{ username:'', password:'' }} , {body:{ username:'aaa' } }])
    ( '任意欄位未填寫' , ( req )=>{
        
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        handleRegistration(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('請填寫欄位');
    } )

    test( '成功連接並啟動 ' , async()=>{
        const req = { body: { username: 'joe10', password: 'testpassword' } }; 
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }; 
        await handleRegistration(req, res);

        expect(register).toHaveBeenCalled()

    } )

} )

//測試 handleLogin()
describe( 'handleLogin' , ()=>{

    test( '全部欄位未填寫' , ( )=>{
        
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const req = {body:{}}

        handleLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('資料不得為空');
    } )

    test.each([{body:{ username:'', password:'' }} , {body:{ username:'aaa' } }])
    ( '任意欄位未填寫' , ( req )=>{
        
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        handleLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('請填寫欄位');
    } )

    test( '成功連接並啟動 ' , ()=>{
        const req = { body: { username: 'joe10', password: 'testpassword' } }; 
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }; 
        handleLogin(req, res);

        expect(login).toHaveBeenCalled()

    } )

} )