import  Express  from "express";
import { getCnaNews , getLtnNews } from "./getNews.js";
const app = Express();
const port = 3001;

//暫時用不到
//app.use(Express.json()) // for parsing application/json
//app.use(Express.text()) // for parsing text

app.get( '/cna' , (req , res ) => {

    new Promise(solve => {
        solve(getCnaNews())
    }).then( ( data )=>{
    res.set('Content-Type', 'application/json') //res 是回傳什麼給用戶端
    res.send({data: data }) 
    } )
 
} )

app.get( '/ltn' , (req , res ) => {

    new Promise(solve => {
        solve(getLtnNews())
    }).then( ( data )=>{
    res.set('Content-Type', 'application/json') //res 是回傳什麼給用戶端
    res.send({data: data }) 
    } )
 
} )

app.get( '*' , (req , res ) => {
    res.set('Content-Type', 'text/plain') //res 是回傳什麼給用戶端
    res.status(404).send('cannot_get') 
} )

app.listen( port )