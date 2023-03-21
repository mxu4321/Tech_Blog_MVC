
# Tech Blog MVC

Module 14 challenge: Model-View-Controller (MVC) Tech Blog

## Description
This application is a CMS-style blog site that allows users to publish their blog posts and comment on other users' posts. It has been deployed on Heroku but can also run locally on your computer.
## Table of content
* [Acceptance Criteria](#acceptance-criteria)
* [Screenshots](#screenshots)
* [Run Locally](#run-locally)
* [Dependencies](#dependencies)
* [Deployment](#deployment)

## Acceptance Criteria
   ```
   GIVEN a CMS-style blog site
   WHEN I visit the site for the first time
   THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
   WHEN I click on the homepage option
   THEN I am taken to the homepage
   WHEN I click on any other links in the navigation
   THEN I am prompted to either sign up or sign in
   WHEN I choose to sign up
   THEN I am prompted to create a username and password
   WHEN I click on the sign-up button
   THEN my user credentials are saved and I am logged into the site
   WHEN I revisit the site at a later time and choose to sign in
   THEN I am prompted to enter my username and password
   WHEN I am signed in to the site
   THEN I see navigation links for the homepage, the dashboard, and the option to log out
   WHEN I click on the homepage option in the navigation
   THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
   WHEN I click on an existing blog post
   THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
   WHEN I enter a comment and click on the submit button while signed in
   THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
   WHEN I click on the dashboard option in the navigation
   THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
   WHEN I click on the button to add a new blog post
   THEN I am prompted to enter both a title and contents for my blog post
   WHEN I click on the button to create a new blog post
   THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
   WHEN I click on one of my existing posts in the dashboard
   THEN I am able to delete or update my post and taken back to an updated dashboard
   WHEN I click on the logout option in the navigation
   THEN I am signed out of the site
   WHEN I am idle on the site for more than a set time
   THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
   ```
## Screenshots

![homepage](https://user-images.githubusercontent.com/112605297/226143363-d9931a51-526b-4688-aa5e-30de3abcf3f6.png)
![login](https://user-images.githubusercontent.com/112605297/226143367-0a65a0ad-ca9a-42d6-aca1-866ed2ceca21.png)
![singup](https://user-images.githubusercontent.com/112605297/226143371-4a145c72-980c-4a84-868f-109a544f3cd0.png)
![dashboard](https://user-images.githubusercontent.com/112605297/226143354-57f5420c-06c9-4a67-bbad-7da6e41f2589.png)
![single-post](https://user-images.githubusercontent.com/112605297/226143373-af7846e3-765b-4e2d-8e5c-3e0e7ead13f3.png)
![new-post](https://user-images.githubusercontent.com/112605297/226143432-3bc242ce-d8a6-4406-9e46-4ffb80e7e64c.png)
![edit-post](https://user-images.githubusercontent.com/112605297/226746792-71fb25df-1d00-4fcc-bddd-5b14fcff66d3.png)


## Run Locally

To run this app locally, use these commands below in your terminal:

- Intall all dependencies:
```
npm i
```

- Seed the database:
```
npm run Seed
```

- Run the server
```
npm start 
```
## Dependencies

    "bcrypt": "^5.0.0",
    "connect-session-sequelize": "^7.0.4",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-handlebars": "^5.2.0",
    "express-session": "^1.17.1",
    "path": "^0.12.7",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5"
## Deployment

<!-- TODO: add heroku link -->
[Click here for the deployed application](https://tech-blog-mvc-module-14.herokuapp.com/)


![Heroku](https://camo.githubusercontent.com/6979881d5a96b7b18a057083bb8aeb87ba35fc279452e29034c1e1c49ade0636/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e737667)

