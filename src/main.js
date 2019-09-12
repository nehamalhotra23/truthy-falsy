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
      let wordTypes = test.wordTypeLookup();
      console.log("wordType:", wordTypes);
      wordTypes.then(function(response2){
        const mixedHeadlineObj = test.replaceWords();
        $(".result").html(mixedHeadlineObj.headlines[0] + "<br>" + mixedHeadlineObj.headlines[1] + "<br>" + mixedHeadlineObj.headlines[2] + "<br>" +   mixedHeadlineObj.headlines[3] + "<br>" + mixedHeadlineObj.headlines[4]);
      });

    }, function(error) {
      $(".result").text(error);
    });

  });
});
