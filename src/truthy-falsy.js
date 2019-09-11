import { Query } from './newsService.js';

export function parseNewsForHeadline(search){
    let query = new Query();
    let news = query.getNews(search);

    news.then(function(response){
      const body = JSON.parse(response);
      const result = body.response.docs[0].headline.main;
      return new Promise((resolve, reject) => {
      console.log("Second time", news, result);
      resolve(result);
    });
  });

}
