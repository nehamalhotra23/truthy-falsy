import { Query } from './../src/newsService.js';
import { parseNewsForHeadline } from './../src/truthy-falsy.js';

describe('API queries', function(){
 it('should check whether truthy Api returns content', function() {
   let query = new Query();
   let news = query.getNews('search');
   console.log(news);
   expect(news).toBeDefined();
 });

 it('should parse API return content for headline', async function() {
   let stories = await parseNewsForHeadline('search');
   console.log("Test", stories, parseNewsForHeadline('search'));
   let query = new Query();
   let news = query.getNews('search');
     expect(stories[0]).toBeDefined();
 });

 it('should check whether falsy API return content', function() {

 });
});
