import * as cheerio from 'cheerio';

export  function handleCnaData( data ) {
    const $ = cheerio.load( data )
    return $('#jsMainList').find('li').map( (item , el )=>{ return {"title":$(el).find('h2').text(), "url": $(el).find('a').attr('href') , "date": $(el).find('.date').text()  } } ).toArray()
}

export  function handleLtnData( data ) {
    const $ = cheerio.load( data )
    const date = new Date()
    return $('.list').find('li').map( (item , el )=>{ return {"title":$(el).find('h3').text(), "url": $(el).find('a').attr('href') , "date": `${date.getFullYear()}/${(date.getMonth()+1) < 10 ? ("0" +( date.getMonth()+1) ) : (date.getMonth()+1) }/${date.getDate()} ${$(el).find('.time').text()}` } } ).toArray()
}

export  function handleCtsData ( data ) {
    const $ = cheerio.load( data )
    return $('.newslist-container').find('a').map( (item , el )=>{ return {"title":$(el).attr('title'), "url": $(el).attr('href') , "date" : $(el).find('h3 .newstime').text() } } ).toArray()
}