# MyTweet

College project to create a Node Web App using Hapi and also has an Api that can be consumed by an Android app and an Aurellia SPA. Meant to mimic some of the basic functionality of Twitter. 

- Android repo : https://github.com/austincunningham/android-mytweet
- Aurellia repo : https://github.com/austincunningham/mytweet-webdev-spa

![mytweet](https://user-images.githubusercontent.com/16667688/45455001-90502800-b6dd-11e8-8928-aabb8db52a47.gif)


## What is this repository for?

* Quick summary this is a web app built with Node JS which mimics the functionality of Twitter 
* User can signup, Login. 
* User can Add Tweets, delete one or many of there own tweets.
* User can search for other users tweets and look at all tweets
```
    User: homer@simpson.com
    Password : secret
```    
* Admin can add and delete users, remove users tweets and look at stats
```
  Admin: admin@mytweet.com
  Password : secret
  ```
* [API documentation](API.md) 
* Version MyTweet-v18
* [Live version on Heroku] (https://mytweet-web-austin.herokuapp.com/)




### How do I get set up? ###

* Summary of set up, git clone https://austincunningham@bitbucket.org/austincunningham/mytweet-web.git
  'cd mytweet-web/' and run 'npm install' and 'node index' to start the server  
* Dependencies Node js, npm and MongoDB
* Database configuration current config is pointing to locally hosted mongo DB , you can change reference in 
'/app/models/db.js' to select mlabs by uncommenting line 10
 ```javascript
'//let dbURI= 'mongodb://mytweetuser:mytweetuser@ds057066.mlab.com:57066/mytweet';'
```
and commenting line 9
```javascript
'let dbURI = 'mongodb://localhost/myTweet';'
```


