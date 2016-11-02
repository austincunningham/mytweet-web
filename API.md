## API Documentation

It is built using JavaScript/Node.js, HapiJS (a small, lightweight web MVC framework) & Mongoose (a MongoDB object modelling library).

**List Users**
----
Returns a list of Users

* **URL**

  `/api/users`

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
     		"_id": "5818c73eaf17a208f40fbe81",
     		"firstName": "Homer",
     		"lastName": "Simpson",
     		"email": "homer@simpson.com",
     		"password": "secret",
     		"__v": 0
    }]
    ```

* **Error Response:**

* **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:**

  ```javascript
  { 'error accessing Mongo db'}
  ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/users",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Find User by id**
----
  Returns JSON data about a single user.

* **URL**

  `/api/users/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
         		"_id": "5818c73eaf17a208f40fbe81",
         		"firstName": "Homer",
         		"lastName": "Simpson",
         		"email": "homer@simpson.com",
         		"password": "secret",
         		"__v": 0
        }
    ```

* **Error Response:**

  * **Code:** 404 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "404": 'id not found' }
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/users/1",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```

**Find User by Email**
----
  Returns JSON data about a single user.

* **URL**

  `/api/users/:email`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `email=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
         		"_id": "5818c73eaf17a208f40fbe81",
         		"firstName": "Homer",
         		"lastName": "Simpson",
         		"email": "homer@simpson.com",
         		"password": "secret",
         		"__v": 0
        }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db' }
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/users/homer@simpson.com",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Delete User by id**
----
  Deletes a single user.

* **URL**

  `/api/users/:id`

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
    	"_id": "5818c73faf17a208f40fbe84",
    	"firstName": "Lisa",
    	"lastName": "Simpson",
    	"email": "lisa@simpson.com",
    	"password": "secret",
    	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db'}
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/users/1",
    dataType: "json",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Delete User by email**
----
  Deletes a single user.

* **URL**

  `/api/users/:email`

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `email=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
    	"_id": "5818c73faf17a208f40fbe84",
    	"firstName": "Lisa",
    	"lastName": "Simpson",
    	"email": "lisa@simpson.com",
    	"password": "secret",
    	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db'}
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/users/homer@simpson.com",
    dataType: "json",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
  ```


  **Create User**
  ----
    Creates a single user.

  * **URL**

    `/api/users/register`

  * **Method:**

    `POST`

  *  **URL Params**

     **Required:**
     ```javascript
     {
     	"firstName": "Bob",
     	"lastName": "Bob",
     	"email": "bob@bob.com",
     	"password": "secret"
     }
      ```

  * **Data Params**

    Json

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:**

      ```javascript
        {
        	"firstName": "Bob",
        	"lastName": "Bob",
        	"email": "bob@bob.com",
        	"password": "secret"
        }
      ```

  * **Error Response:**

    * **Code:** 500 INTERNAL SERVER ERROR <br />
    
    ```javascript
    {'error creating user '}
    ```

  * **Sample Call:**

    ```javascript
    $.ajax({
      url: "/àpi/users/register",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
    ```



**List Tweets**
----
Returns a list of Users

* **URL**

  `/api/tweets`

* **Method:**

  `GET`

*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
     		"_id": "5818c73faf17a208f40fbe86",
     		"message": "Homers tweet",
     		"name": "homer@simpson.com",
     		"tweeter": "5818c73eaf17a208f40fbe81",
     		"__v": 0
     }]
    ```

* **Error Response:**

* **Code:** 500 INTERNAL SERVER ERROR <br />
  **Content:**

  ```javascript
  { 'error accessing Mongo db'}
  ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweets",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Find Tweets by tweet id**
----
  Returns JSON data about a single tweet.

* **URL**

  `/api/tweet/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
    	"_id": "5818c73faf17a208f40fbe86",
    	"message": "Homers tweet",
    	"name": "homer@simpson.com",
    	"tweeter": "5818c73eaf17a208f40fbe81",
    	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 404 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "404": 'id not found' }
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweet/1",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```



**Find users tweets by user id**
----
  Returns JSON data about a single tweet.

* **URL**

  `/api/tweets/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
    	"_id": "5818c73faf17a208f40fbe86",
    	"message": "Homers tweet",
    	"name": "homer@simpson.com",
    	"tweeter": "5818c73eaf17a208f40fbe81",
    	"__v": 0
    }]
    ```

* **Error Response:**

  * **Code:** 404 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { "404": 'id not found' }
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweets/1",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Find Tweets by users Email**
----
  Returns JSON data about an array of Tweet.

* **URL**

  `/api/tweets/email/:email`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `email=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
    	"_id": "5818c73faf17a208f40fbe86",
    	"message": "Homers tweet",
    	"name": "homer@simpson.com",
    	"tweeter": "5818c73eaf17a208f40fbe81",
    	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db' }
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweets/email/homer@simpson.com",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Delete Tweets by id**
----
  Deletes a single tweet.

* **URL**

  `/api/tweet/:id`

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
        	"_id": "5818c73faf17a208f40fbe86",
        	"message": "Homers tweet",
        	"name": "homer@simpson.com",
        	"tweeter": "5818c73eaf17a208f40fbe81",
        	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db'}
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweets/1",
    dataType: "json",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
  ```


**Delete user Tweets by email**
----
  Deletes a single user.

* **URL**

  `/api/users/:email`

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `email=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    {
    	"_id": "5818c73faf17a208f40fbe84",
    	"firstName": "Lisa",
    	"lastName": "Simpson",
    	"email": "lisa@simpson.com",
    	"password": "secret",
    	"__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    { 'error accessing Mongo db'}
    ```

* **Sample Call:**

  ```javascript
  $.ajax({
    url: "/api/tweets/email/homer@simpson.com",
    dataType: "json",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
  ```


 **List user and number of tweets**
 ----
 Returns a list of Users and number of tweets
 
 * **URL**
 
   `/api/tweetcount/`
 
 * **Method:**
 
   `GET`
 
 *  **URL Params**
 
   None
 
 * **Data Params**
 
   None
 
 * **Success Response:**
 
   * **Code:** 200 <br />
     **Content:**
 
     ```javascript
     [
     	{
     		"email": "admin@mytweet.com",
     		"count": 1
     	},
     	{
     		"email": "homer@simpson.com",
     		"count": 1
     	}
     [
     ```
 
 * **Error Response:**
 
 * **Code:** 500 INTERNAL SERVER ERROR <br />
   **Content:**

 * **Sample Call:**
 
   ```javascript
   $.ajax({
     url: "/api/tweetcount/",
     dataType: "json",
     type : "GET",
     success : function(r) {
       console.log(r);
     }
   });
   ```
