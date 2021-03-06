# Backslash Academy 2019 Semester 1 - Session 2.

- create a new folder for session 2.
- inside this folder create 2 more folders called 'backend' and 'frontend', we'll be using these to build our server and client parts of the application.

## setting up the frontend:

- here you can either copy your previous work over or start fresh by running `create-react-app .` in your frontend folder
- install react router with: `npm install --save react-router-dom`

## setting up the backend:

- inside the backend folder run `npm init` and then `npm install --save express cors faker`
- create a file in the backend folder called `index.js`
- update your backend folder `package.json` to have the following scripts section
  ```
  {
    "scripts": {
      "start": "node index.js"
    }
  }
  ```
- paste the following hello-world backend code into your backend/index.js file:

  ```
  const express = require("express");
  const cors = require("cors");
  const app = express();

  app.use(cors());

  const port = 5000;

  app.get("/", (req, res) => res.send("Hello World!"));

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  ```

- start the backend by running `npm start` in the backend folder

example package.json

```
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "faker": "^4.1.0"
  },
  "devDependencies": {},
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}

```
