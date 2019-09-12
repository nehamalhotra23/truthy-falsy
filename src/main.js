import $ from 'jquery';
import { Query, Headlines } from './newsService.js';
import { Dictionary } from './dictionaryService.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
$(document).ready(function() {
  let scoreCount = 0;
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
        $(".result").html(displayResults(mixedHeadlineObj));
      });

    }, function(error) {
      $(".result").text(error);
    });

  });
  
  $(".result").click(function(event){
    const id = event.target.closest("p").id;
    if(id === "0") {
      $("#"+id).addClass("green");
      if (addScore()) {
        scoreCount++;
      }
    } else {
      $("#"+id).addClass("red");
    }
    $("#score").text(scoreCount);
  });


});

function displayResults(headlinesObj){
  let results = ``;
  let arrayNum = [0, 1, 2, 3, 4];
  for(let i=0; i< 5; i++){
    const numIndex = Math.floor(Math.random()*arrayNum.length);
    const index = arrayNum[numIndex];
    results += makeResultDiv(headlinesObj.headlines[index], index);
    arrayNum.splice(numIndex, 1);
  }
  return results;
}

function makeResultDiv(headline, index){
  return `<p id="${index}" class="headline">${headline}<p>`;
}

function addScore() {
  let isFirst = true;
  $(".result").contents().each(function(){
    if($(this).hasClass('red')) {
      isFirst = false;
    }

  });
  return isFirst;

}
