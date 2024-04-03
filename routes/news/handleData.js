import * as cheerio from 'cheerio';

export  function handleCnaData( data ) {
    const $ = cheerio.load( data )
    return $('#jsMainList').find('li').map( (item , el )=>{ return {"title":$(el).find('h2').text(), "url": $(el).find('a').attr('href') } } ).toArray()
}

export  function handleLtnData( data ) {
    const $ = cheerio.load( data )
    return $('.list').find('li').map( (item , el )=>{ return {"title":$(el).find('h3').text(), "url": $(el).find('a').attr('href') } } ).toArray()
}

export  function handlePtsData ( data ) {
    const $ = cheerio.load( data )
    return $('.list').find('li').map( (item , el )=>{ return {"title":$(el).find('h3').text(), "url": $(el).find('a').attr('href') } } ).toArray()
}