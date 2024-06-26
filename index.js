import  Express  from "express";
import { config } from "dotenv";
import { router as news } from './routes/news/news.js'
import { router as users } from './routes/users/user.js'
import { router as userdata } from './routes/users/userdata/userdata.js'
import cors from 'cors'
const app = Express();


app.use(Express.json()) // for parsing application/json
app.use(Express.text()) // for parsing text
app.use(cors())

app.use( '/news' , news )
app.use( '/user' , users )
app.use( '/user' , userdata )
app.get( '/' , (req , res )=>{
    res.send('hello')
} )


app.listen( process.env.PORT )


