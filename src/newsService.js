import { Dictionary } from './dictionaryService.js';
export class Query {
  constructor(){

  }
  getNews(search) {
    return new Promise(function(resolve,reject) {
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

  parseNewsForHeadline(search){
    return new Promise((resolve, reject) => {
    let query = new Query();
    let news = query.getNews(search);

    news.then(function(response){
      const body = JSON.parse(response);
     const result = body.response.docs;
        resolve(result);
      });
    });
  }
}

export class Headlines {
  constructor(){
    this.headlines = [];
  }

  pushHeadlines(search) {
    return new Promise((resolve, reject) => {
      let queryService = new Query();
      let headline = queryService.parseNewsForHeadline(search);

      headline.then((response) => {

        for(let i = 0; i < 5; i++){
          const title = response[i].headline.main;
          this.headlines.push(title);
        }
        resolve(this.headlines);
      });
    });
  }

  wordTypeLookup() {
    this.headlines.forEach((headline, index) => {
      this['h'+index] = [];
      let array = headline.split(" ");
      console.log("array", array);
      let wordTypes = [];

      let promises = array.map((word) => {
        return new Promise ((resolve,reject) => {
          let dictionary = new Dictionary();
          let wordType = dictionary.parseWordForType(word);

          wordType.then((response) => {
            resolve(response);
          });
        });
      });
      return Promise.all(promises).then((valueList) => {
        valueList.forEach((value) => {
          this['h'+index].push(value);
        });
        console.log("After all promises", this);
      });
    });
  }
}
