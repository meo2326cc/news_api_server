import axios from "axios";
import 'dotenv/config';
import { handleCnaData , handleLtnData , handleCtsData , handleChtData , handlePtsData  }from "./handleData.js";
import handleKeywords from "../../jieba/jiebatest.js";
import * as puppeteer from "puppeteer"


export async function getNewsInit () {

    let cna = await getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    let ltn = await getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN )
    let cts = await getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )
    let cht = await getNewsByPt( handleChtData , process.env.NEWS_LINK_CHT )
    let pts = await getNewsByPt( handlePtsData , process.env.NEWS_LINK_PTS )
    let allnews = handleKeywords([ ...cna , ...ltn , ...cts , ...cht , ...pts ]) 

    setInterval( async ()=>{ 
    cna = await getNews( 'cna' , handleCnaData , process.env.NEWS_LINK_CNA )
    ltn = await getNews( 'ltn' , handleLtnData , process.env.NEWS_LINK_LTN ) 
    cts = await getNews( 'cts' , handleCtsData , process.env.NEWS_LINK_CTS )
    cht = await getNewsByPt( handleChtData , process.env.NEWS_LINK_CHT )
    pts = await getNewsByPt( handlePtsData , process.env.NEWS_LINK_PTS )
    allnews = handleKeywords([ ...cna , ...ltn , ...cts , ...cht , ...pts ]) 
     } , 3600000 )

    return async function( type ) {
        switch (type){
            case 'cna' : return cna
            case 'ltn' : return ltn
            case 'cts' : return cts
            case 'cht' : return cht
            case 'pts' : return pts
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

export async function getNewsByPt ( dataHandlerFn , env ) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    page.setDefaultTimeout('domcontentloaded')
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36')
    await page.setViewport({width: 1080, height: 1024});
    await page.goto( env );
    page.isServiceWorkerBypassed( true )
    const pageContent = await page.content()
    const result = dataHandlerFn( pageContent )
    await browser.close();
    return result
    }


