import  { getCnaNews , getLtnNews } from '../routes/news/getNews.js'

// test('cna_data_content', async() => {
//      expect(getCnaNews()).resolves.toHaveReturned();
//   });

// test('ltn_data_content', () => {
//      expect(getLtnNews()).resolves.toHaveReturned();
//   });

// describe('fetchRemoteData', () => {
//    it('should return an array when successful', async () => {
//      const result = await getCnaNews(); // Assuming fetchRemoteData is an async function
//      expect(result).toBeInstanceOf(Array);
//    });
 
//    it('should return a string when failed', async () => {
//      // Assuming you have a way to simulate failure, for example using a mock or stub
//      // If fetchRemoteData is not an async function, handle error synchronously
//      const result = await getCnaNews(); // Assuming fetchRemoteData is an async function
//      // Simulate failure and return string
//      expect(result).toEqual(expect.any(String));
//    });
//  });

it('should return an array when successful', async () => {
   let result;
   try {
     result = await getCnaNews(); // Assuming fetchRemoteData is an async function
   } catch (error) {
     // If an error is caught, fail the test
     fail('fetchRemoteData should not throw an error');
   }
   expect(result).toBeInstanceOf(Array);
 });
