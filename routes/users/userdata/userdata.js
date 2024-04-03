import Express from 'express'
import { verifyUser } from '../../../database/database.js'
import { dbGetUserData , dbUploadUserData , dbPutUserData , dbDelUserData , validateInput } from '../../../database/handleUserInfo.js';
export const router = Express.Router()


async function getUserData( req , res ){
    const jwtVerifyUser = await verifyUser(req.headers.authorization)

    if (!req.headers.authorization) {
        res.status(401).send("未通過認證");
      } else if ( jwtVerifyUser )  {
        res.set("Content-Type", "application/json"); 
        res.status(200).send( await dbGetUserData( jwtVerifyUser ) )
      } else {
        res.status(401).send("未通過認證");
      }
}

async function uploadUserData( req , res ){
  const jwtVerifyUser = await verifyUser(req.headers.authorization)
  const userdata = req.body?.data
  const urlParams = req.params.type
  
  if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if(!(urlParams === 'favList' ||  urlParams === 'editList' )){
      res.status(400).send("網址參數不正確");
    }else if (!validateInput( userdata )){
      res.status(400).send("資料格式不正確");
    }else if ( jwtVerifyUser )  {
      res.set("Content-Type", "application/json"); 
      res.status(200).send( await dbUploadUserData( userdata ,  urlParams , jwtVerifyUser ) )
    } else {
      res.status(401).send("未通過認證");
    }
}

async function putUserData( req , res ){
  const jwtVerifyUser = await verifyUser(req.headers.authorization)
  const userdata = req.body?.data
  const urlParams = req.params.type

  if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if( !(urlParams === 'favList' ||  urlParams === 'editList' )){
      res.status(400).send("網址參數不正確");
    }else if (!validateInput( userdata )){
      res.status(400).send("資料格式不正確");
    }else if ( jwtVerifyUser )  {
      res.set("Content-Type", "application/json"); 
      res.status(200).send( await dbPutUserData( userdata , urlParams , jwtVerifyUser ) )
    } else {
      res.status(401).send("未通過認證");
    }
}

async function delUserData( req , res ){
  const jwtVerifyUser = await verifyUser(req.headers.authorization)
  const userdata = req.body?.data
  const urlParams = req.params.type

  if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if( !(urlParams === 'favList' ||  urlParams === 'editList' )){
      res.status(400).send("網址參數不正確");
    }else if (userdata.id === undefined  ){
      res.status(400).send("資料格式不正確");
    }else if ( jwtVerifyUser )  {
      res.set("Content-Type", "application/json"); 
      res.status(200).send( await dbDelUserData( userdata , urlParams , jwtVerifyUser ) )
    } else {
      res.status(401).send("未通過認證");
    }
}



router.route('/userdata')
.get( getUserData )
router.post( "/userdata/:type" , uploadUserData  )
router.put( "/userdata/:type" , putUserData )
router.delete( "/userdata/:type" , delUserData )