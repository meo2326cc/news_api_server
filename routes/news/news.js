import  Express  from "express";
export const router = Express.Router()
import { getCnaNews, getLtnNews , getPtsNews , getNewsInit } from "./getNews.js";
import { verifyUser } from "../../database/database.js";

const newsInit = getNewsInit()

export async function handleCnaRoute (req, res) {
    if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if (await verifyUser(req.headers.authorization)) {

      res.set("Content-Type", "application/json"); 
      res.status(200).send( await newsInit('cna') )

    } else {
      res.status(401).send("未通過認證");
    }
  }
  
export  async function handleLtnRoute(req, res) {

  if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if (await verifyUser(req.headers.authorization)) {

      res.set("Content-Type", "application/json"); 
      res.status(200).send( await newsInit('ltn') )

    } else {
      res.status(401).send("未通過認證");
    }


}

export  async function handlePtsRoute(req, res) {

  if (!req.headers.authorization) {
      res.status(401).send("未通過認證");
    } else if (await verifyUser(req.headers.authorization)) {
      // new Promise((solve) => {
      //     solve(getPtsNews());
      //   }).then((data) => {
      //     res.set("Content-Type", "application/json");
      //     res.status(200).send(data);
      //   });
      res.set("Content-Type", "application/json"); 
      res.status(200).send( await newsInit('pts') )
    } else {
      res.status(401).send("未通過認證");
    }

}

router.get("/cna", handleCnaRoute );
router.get("/ltn", handleLtnRoute );
router.get("/pts", handlePtsRoute );