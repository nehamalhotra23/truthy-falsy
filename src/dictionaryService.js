export class Dictionary{
  constructor(){

  }
  getWord(word){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const apiKey = process.env.API_KEY_DICT;

      const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`

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

  parseWordForType(search){
    return new Promise((resolve, reject) => {
    let dictionary = new Dictionary();
    let entry = dictionary.getWord(search);

    entry.then(function(response){
      const body = JSON.parse(response);
      //const result = body.response.docs[0].headline.main;
      let result = body[0].fl;
      const regex = /[,]/;
      if(regex.test(result)){
        result = result.substring(0, result.indexOf(","));
      }
        resolve(result);
      });
    });
  }
}
