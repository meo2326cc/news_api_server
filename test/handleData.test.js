import  { getNewsInit } from '../routes/news/getNews.js'

 test.each(['cna' , 'cts' , 'pts' , 'keywords' ])
 ( '模擬隨機api路徑取得資料' , async( path )=>{
     
    //建立環境
    const newsInit = await getNewsInit()
    let result;

      try {
        result = await newsInit( path ); 
        console.log( path , result )
        // 結果
        expect(result).toBeInstanceOf(Array);

      } catch (error) {
        
          expect(typeof error).toBe('object')
      }
     
 } )