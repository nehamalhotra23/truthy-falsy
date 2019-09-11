import { Query } from './../src/newsService.js';
import { parseNewsForHeadline } from './../src/truthy-falsy.js';

describe('API queries', function(){
 it('should check whether truthy Api returns content', function() {
   let query = new Query();
   let news = query.getNews('search');
   expect(news).toBeDefined();
 });

 it('should parse API return content for headline', function() {
   let headline = parseNewsForHeadline('search');
   headline.then(function(response){
     expect(response).toBeDefined();
 });
});
 it('should check whether falsy API return content', function() {

 });
});
