import axios from "axios";
import 'dotenv/config';
import { handleCnaData , handleLtnData , handlePtsData  }from "./handleData.js";


export function getNewsInit () {

    let cna = getCnaNews()
    let ltn = getLtnNews()
    let pts = getPtsNews()

    setInterval( ()=>{ 
    cna = getCnaNews()
    ltn = getLtnNews() 
    pts = getPtsNews()
    console.log('refresh')
     } , 3600000 )

    return async function( type ) {
        switch (type){
            case 'cna' : return cna
            case 'ltn' : return ltn
            case 'pts' : return pts
            default : undefined
        }
    }
}

export async function getCnaNews () {
    try{
        const response = await axios.get(process.env.NEWS_LINK_CNA)

        return handleCnaData(response.data)
    }catch(error){
        console.log( 'cna' ,error.response?.status , error.response?.statusText )
        return { error:'取得資料發生錯誤' }
    }

}

export async function getLtnNews () {
    try{
        const response = await axios.get(process.env.NEWS_LINK_PTS)

        return handleLtnData(response.data)
    }catch(error){
        console.log( 'ltn' , error.response?.status , error.response?.statusText )
        return { error:'取得資料發生錯誤' }
    }

}

export async function getPtsNews () {
    try{
        const response = await axios.get(process.env.NEWS_LINK_LTN)

        return handlePtsData(response.data)
    }catch(error){
        console.log( 'pts' ,error.response?.status , error.response?.statusText )
        throw { error:'取得資料發生錯誤' }
    }

}

