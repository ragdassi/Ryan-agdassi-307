// backend.js
import express from "express";

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const app = express();
const port = 8000;


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };

const deleteUser = (id) => {  
const index = users["users_list"].findIndex((user) => user["id"] === id);  
if (index !== -1) {  
    users["users_list"].splice(index, 1);  
    return id;  
} else {  
    return undefined;  
}  
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
    
};

app.use(express.json());

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });

  
// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users (potentially with a filter on name or job)
app.get("/users", (req, res) => {
    const name = req.query.name;  
    const job = req.query.job;  
    
    if (name !== undefined) {  
     let result = findUserByName(name);  
     result = { users_list: result };  
     res.send(result);  
    } else if (job !== undefined) {  
     let result = findUserByJob(job);  
     result = { users_list: result };  
     res.send(result);  
    } else {  
     res.send(users);  
    }  
  });

// Get individual user
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

// Create new user (with error handling)
app.post("/users", (req, res) => {
    const userToAdd = req.body;  
    if (!userToAdd.id || !userToAdd.name || !userToAdd.job) {  
        res.status(400).send("Invalid user data. Please provide id, name, and job.");  
       } else {  
        addUser(userToAdd);  
        res.send(`User added successfully: ${userToAdd.name}`);
       }}); 
  
// Delete indiv. user
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = deleteUser(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    };
});

