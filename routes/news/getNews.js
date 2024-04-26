import axios from "axios";
import 'dotenv/config';
import { handleCnaData , handleLtnData , handleCtsData  }from "./handleData.js";
import handleKeywords from "../../jieba/jiebatest.js";


export async function getNewsInit () {

    let cna = await getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    let ltn = await getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN )
    let cts = await getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )
    let allnews = handleKeywords([ ...cna , ...ltn , ...cts  ]) 

    setInterval( async ()=>{ 
    cna = await getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    ltn = await getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN ) 
    cts = await getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )
    allnews = handleKeywords([ ...cna , ...ltn , ...cts  ]) 
     } , 3600000 )

    return async function( type ) {
        switch (type){
            case 'cna' : return cna
            case 'ltn' : return ltn
            case 'cts' : return cts
            case 'keywords' : return allnews
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


