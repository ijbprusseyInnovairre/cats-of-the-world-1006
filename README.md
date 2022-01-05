# Cats Of The World

## Start Here
This project is not complete. It will test your frontend skills, and your ability to get an api application running. You will find 3 folders. 2 API folders, and a Client Folder.
The Client Folder is there for you to build a frontend application using ReactJS as we will describe below. You can choose one of the API folders to utilize in your project, depending on your skills.
If you are confident in your ability to get an instance of SQL Server running, please run the application within the API_SQL folder, otherwise concentrate on the API folder.

1. Install a local instance of SQL server developer edition (This is optional -> If you go this route, use the API_SQL project as your API)
2. Restore the included SQL database to your local machine.
3. Add a new user [cats_api_usr] to your local instance of SQL server, for our test application to access.
4. Set a password for this user and update dev.json in the API_SQL folder.
5. Initialize a new npm project within the CLIENT folder. This will be our front end app. This application will display types of cats. Name the application cats-of-the-world-client.
6. Start the included local API in the folder you plan to work in by using the default script included in the api project. Just check our project configuration file.
7. Quickly research dev extreme (react version). Include the appropriate npm packages in your new front end application.
    * https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/Overview/React/Light/
    * https://js.devexpress.com/Documentation/Guide/React_Components/Add_DevExtreme_to_a_React_Application/
8. Implement the update statement for the cats table so that we can update an existing record. This will show off a basic understanding of backend javascript development (there are examples in the API folders). Hint: app.post('/cats/:id'...
9. Create a simple front end application that includes a left navigation, and a content area. You should support typical mobile screen sizes as well as typical desktop screen sizes. We should have a Home tab that displays a description that includes some fun facts about yourself and your favorite hobbies. The second tab should be titled Cats. This should navigate to an area that displays a table that displays types of cats as described below (using a get request to the included API). In the content area of Cats place a basic dev extreme grid. This grid should connect to the included API, and access the endpoint you just created. We should be able to list, add, update, and remove entries. Please use existing npm packages of your choice for handling navigation. Ensure the license for whichever package you use, is truly free to use: (MIT license). Display the name column and description column. Editing of data should be done inline. Do not use bulk editing. When a user edits a given row and clicks save, this should immediately send a request to the api. You will need a simple token to be included when accessing the api, as it is not open. The application uses “Basic Authentication”. Please review the api code to determine how to properly connect to it.

    * You do not need to implement error handling.
    * The API authenticates using basic authentication. The username and passwords are included. After logging in the API will send an accessToken and a refreshToken.
    * After logging into the API you will need to use the accessToken with each request using Bearer Authentication. Your header will need to include an entry for Authorization with a value of 'Bearer includeAuthTokenHere' 
    * When you are finished, ensure that your front end app and the modified api app changes are all pushed to the included repos.

10. Create a merge request to the main branch from your feature branch. This concludes the test.
## Bonus:
*   The table that displays types of cats should be searchable locally using dev extremes included column search feature. 
*   The table columns should be sortable (locally).
*   You should use the API application included in the API_SQL folder and have restored the included sql database on your local machine. Include a screenshot of a simple select statement showing some of the contents of the Cats table. Just include it in the root directory of this project.