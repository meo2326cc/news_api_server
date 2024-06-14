import  nodejieba  from "nodejieba";

export default function handleKeywords( newsData ) {


  nodejieba.load({
    userDict: 'jieba/dict.txt',
  })


  const wordCount = {} ;


  newsData.forEach((news) => {

    const handleWords = nodejieba.cut(news.title);

    const words = handleWords.filter( word => word.length > 1 )

    words.forEach((word) => {

      let newsType ;

      const dataStructure = { keyWord:'' , totalCount : 1 , cna : 0 , ltn : 0 , cts : 0 , cht: 0 , pts:0 }

      if ( news.url.includes('news.cts.com.tw') ) {newsType = 'cts'}
      if ( news.url.includes('news.ltn.com.tw') ) {newsType = 'ltn'}
      if ( news.url.includes('news/aipl') ) {newsType = 'cna'}
      if ( news.url.includes('/realtimenews/') ) {newsType = 'cht'}
      if ( news.url.includes('news.pts.org.tw/') ) {newsType = 'pts'}
      

        if (wordCount[word]) {
          wordCount[word].totalCount += 1;
          wordCount[word][newsType] += 1;
        } else {
          // init
          wordCount[word] = dataStructure ;
          wordCount[word].keyWord = word ;
          wordCount[word][newsType] = 1;
        }
        

    });
  });


  const sortedWordCount = Object.values(wordCount).sort((a , b ) => b.totalCount - a.totalCount  )

  return sortedWordCount.slice(0,10)

}
