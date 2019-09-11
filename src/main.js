import $ from 'jquery';
import { Query, Headlines } from './newsService.js';
import { Dictionary } from './dictionaryService.js';

$(document).ready(function() {
  $("#formOne").submit(function(event){
    event.preventDefault();
    const userInput = $("#userInput").val();

    let test = new Headlines();
    let headline = test.pushHeadlines(userInput);
    headline.then(function(response){
      $(".result").text(response);
      let wordTypes = test.wordTypeLookup();
      wordTypes.then(function(response2){
        console.log(response2);
      });

    }, function(error) {
      $(".result").text(error);
    });

    // let dictionary = new Dictionary();
    // let wordType = dictionary.parseWordForType(userInput);
    // wordType.then(function(response){
    //   $(".result").append(response);
    // });
    //console.log();

  });
});
