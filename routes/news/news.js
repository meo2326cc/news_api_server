import  Express  from "express";
export const router = Express.Router()
import { getNewsInit } from "./getNews.js";
import { verifyUser } from "../../database/database.js";
import handleKeywords from "../../jieba/jiebatest.js";

const newsInit = await getNewsInit()


export async function handleNewsRoute( req , res ) {

  if (!req.headers.authorization) {
    res.status(401).send("未通過認證");
  } else if (await verifyUser(req.headers.authorization)) {
    const route = req.route.path
    res.set("Content-Type", "application/json"); 
    res.status(200).send( await newsInit( route.split("/")[1] ) )
  } else {
    res.status(401).send("未通過認證");
  }

}


router.get("/cna", handleNewsRoute );
router.get("/ltn", handleNewsRoute );
router.get("/cts", handleNewsRoute );
router.get("/keywords" ,handleNewsRoute )