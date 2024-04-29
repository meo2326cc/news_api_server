# news_api_server
使用 express.js 建構的資料爬取伺服器，並包含 10 支以上的 API、資料庫、認證等功能。

## API文件
[文件](https://documenter.getpostman.com/view/26370752/2sA3BheaTb)

## 使用技術
Express.js、Jest、Bcrypt、JSON Web Token、Axios、Cheerio、Mongoose、NodeJieba

## 功能特色
- 使用 Axios , Cheerio 對各大新聞政治版面（目前3個）進行爬取，並使用jieba對新聞標題進行斷詞分析，整理出熱門關鍵字。
- 具有使用者註冊、登入功能，使用 MongoDB 保存使用者資料
- 完整的 RESTful API 功能，可對單一使用者資料進行增刪檢改
- API 需要 JWT 認證
- 新聞資料請求逐小時更新、使用閉包封裝功能避免 API 請求一次就需要重新分析資料造成負擔

## 測試
模組化開發，使用 Jest 對主要的功能進行測試，包含：
- 認證
- 註冊使用者
- 連接資料庫
- 爬蟲資料處理
確保資料正確回傳與日後新增新聞資料 API 路徑

## 斷詞處理
- 使用nodejieba進行斷詞處理
- jieba辭典採用 https://github.com/ldkrsi/jieba-zh_TW 專案提供之dict.txt，其來源為中研院斷詞服務之詞庫
- 本專案僅作為學習用途，不做營利使用，並遵守中研院斷詞服務之服務條款

## 環境變數
```
#伺服器PORT
PORT

#JWT KEY
JWT_KEY

#要進行資料爬取的網址(華視、中央社、自由時報)
NEWS_LINK_CNA=https://www.cna.com.tw/list/aipl.aspx
NEWS_LINK_CTS=https://news.cts.com.tw/politics/index.html
NEWS_LINK_LTN=https://news.ltn.com.tw/list/breakingnews/politics

#MongoDB資料庫路徑
MONGO_CONNECTION_STRING
```