
export class Query {
  constructor(){

  }
  getNews(search) {
    return new Promise(function(resolve,reject) {
      //debugger
      let request = new XMLHttpRequest();
      const apiKey = process.env.API_KEY_TRUTHY;
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${apiKey}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

  }
}
