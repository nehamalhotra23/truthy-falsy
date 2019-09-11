import $ from 'jquery';
import { parseNewsForHeadline } from './truthy-falsy.js';
$(document).ready(function() {
 $("#formOne").submit(function(event){
   event.preventDefault()
   const userInput = $("#userInput").val();
   console.log(parseNewsForHeadline(userInput));
   $(".result").text(parseNewsForHeadline(userInput));
 })


})
