import axios from "axios";
import 'dotenv/config';
import {handleCnaData , handleLtnData }from "./handleData.js";

export async function getCnaNews () {
    try{
        const response = await axios.get(process.env.NEWS_LINK_CNA)

        return handleCnaData(response.data)
    }catch(error){
        console.log( error.response?.status , error.response?.statusText )
    }

}

export async function getLtnNews () {
    try{
        const response = await axios.get(process.env.NEWS_LINK_LTN)

        return handleLtnData(response.data)
    }catch(error){
        console.log( error.response?.status , error.response?.statusText )
    }

}