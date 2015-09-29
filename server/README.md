Server:
=======

REST API:
---------

```
Method | URL         | Request Body | Response Body |
GET    | /levels/:id | Empty        | JSON string   |
POST   | /levels     | JSON string  | Empty         |
PUT    | /levels     | JSON String  | Empty         |
DELETE | /levels/:id | Empty        | Empty         |
```

### General
Inside the file `/server/controllers/levelsController.js`, four methods; getLevel, saveLevel, updateLeve, and deleteLevel are exported for use as the server API.

### GET to `/levels/:id`
getLevel method will handle a GET request made to `/levels/:id`. As a response, the corresponding sequencer data for the id will be retrieved from the database.

### POST to `/levels`
saveLevel method will handle a POST request made to '/levels'. It will save a new sequencer with the level and data parsed from the user interface to the database.

### PUT to `/levels`
updateLevel will handle a PUT request made to '/levels'. It will update an existing sequencer with the parsed level from the user interface to have the newly generated data.

### DELETE to `/levels/:id`
deleteLevel will handle a DELETE request made to '/levels/:id'. It will remove a sequencer with the parsed level from the user interface from the database.
