import axios from "axios";
import 'dotenv/config';
import { handleCnaData , handleLtnData , handleCtsData  }from "./handleData.js";


export function getNewsInit () {

    let cna = getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    let ltn = getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN )
    let cts = getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )

    setInterval( ()=>{ 
    cna = getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    ltn = getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN ) 
    cts = getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )
    console.log('refresh')
     } , 3600000 )

    return async function( type ) {
        switch (type){
            case 'cna' : return cna
            case 'ltn' : return ltn
            case 'cts' : return cts
            default : undefined
        }
    }
}

export async function getNews ( newsStr , dataHandlerFn , env ) {
    try{
        const response = await axios.get( env )

        return dataHandlerFn(response.data)
    }catch(error){
        console.log( newsStr ,error.response?.status , error.response?.statusText )
        return { error:'取得資料發生錯誤' }
    }
}


