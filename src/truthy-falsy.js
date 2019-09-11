import { Query } from './newsService.js';

export function parseNewsForHeadline(search){
  let query = new Query();
  let news = query.getNews(search);
  let result;

  news.then(function(response){
    const body = JSON.parse(response);
    result = body.response.docs[0].headline.main;
    console.log("Second time", news, result);
  });
  console.log(news, result);

  return result;
}
