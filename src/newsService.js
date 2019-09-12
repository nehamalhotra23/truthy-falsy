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
          console.log("title", title);
        }
        resolve(this.headlines);
      });
    });
  }

  wordTypeLookup() {
    let largePromisesArr = this.headlines.map((headline, index) => {
      this['h'+index] = [];
      let array = headline.split(" ");
      let wordTypes = [];

      let promises = array.map((word) => {
        return new Promise ((resolve,reject) => {
          if(isNaN(word) && !word.includes('-')){
            let dictionary = new Dictionary();
            let wordType = dictionary.parseWordForType(word);

            wordType.then((response) => {
              resolve(response);
            });
          } else {
            resolve(undefined);
          }
        });
      });
      return Promise.all(promises).then((valueList) => {
        valueList.forEach((value) => {
          this['h'+index].push(value);
        });
        console.log("After all promises", this);
      });
    });
    return Promise.all(largePromisesArr);
  }

  replaceWords() {
    const wordTypes = ['noun', 'adjective', 'verb', 'preposition', 'pronoun', 'adverb', 'conjunction'];

    for (let i=1; i < 4; i++ ){
      for(let j=0; j < wordTypes.length; j++){
        // h1 headline 1
        // Example: const noun = this.h1.indexOf('noun');
        // replaces h1 typed property with dynamic property
        let wordTypeArrH1 = [];
        let wordTypeArrH2 = [];
        let split = this.headlines[i].split(" ");
        // h2 headline 2
        let splith2 = this.headlines[i+1].split(" ");
        this['h' + i].forEach((wordType, index) => {
          if(wordTypes[j] === wordType) {
            wordTypeArrH1.push(index);
          }
        });

        this['h' + (i + 1)].forEach((wordType, index) => {
          if(wordTypes[j] === wordType){
            wordTypeArrH2.push(index);
          }
        });

        let wordTypeIndexH1 = this['h'+i].indexOf(wordTypes[j]);
        const wordTypeIndexH2 = this['h'+(i+1)].indexOf(wordTypes[j]);
        if(wordTypeIndexH1 !== -1 && wordTypeIndexH2 !== -1){
          let useIndexH1 = wordTypeArrH1[Math.floor(Math.random() * (wordTypeArrH1.length))];
          const useIndexH2 = wordTypeArrH2[Math.floor(Math.random() * (wordTypeArrH2.length))];

          let nH1Word = split[useIndexH1];
          const nH2Word = splith2[useIndexH2];

          if (nH1Word === nH2Word){
            useIndexH1 = wordTypeArrH1[Math.floor(Math.random * (wordTypeArrH1.length))];
            nH1Word = split[useIndexH1];
          }

          // reassinging word types to different headlines
          split[useIndexH1] = nH2Word;
          splith2[useIndexH2] = nH1Word;

          // join replaced word arrays into strings
          const newHeadline1 = split.join(" ");
          const newHeadline2 = splith2.join(" ");


          // reassigning new headlines to headlines array
          this.headlines[i] = newHeadline1;
          this.headlines[i+1] = newHeadline2;
        }
      }
    }
    return this;
  }
}
