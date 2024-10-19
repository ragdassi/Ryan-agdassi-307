// backend.js
import express from "express";
import cors from "cors";
import userService from './user-service.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });


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

const generateID = () => {
  return 'id' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
};



  
// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users (potentially with a filter on name or job)
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then(users => {
      res.send({ users_list: users });
    })
    .catch(error => {
      res.status(500).send("Error fetching users");
    });
});

// Get individual user
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService.findUserById(id)
    .then(user => {
      if (user === null) {
        res.status(404).send("User not found.");
      } else {
        res.send(user);
      }
    })
    .catch(error => {
      res.status(500).send("Error fetching user");
    });
});

// Create new user (with error handling
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  if (!userToAdd.name || !userToAdd.job) {
    res.status(400).send("Invalid user data. Please provide name and job.");
  } else {
    userService.addUser(userToAdd)
      .then(newUser => {
        res.status(201).send(newUser);
      })
      .catch(error => {
        res.status(500).send("Error creating user");
      });
  }
});
  
// Delete indiv. user
// Delete individual user by ID
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    
    userService.findUserById(id)
      .then(user => {
        if (user === null) {
          res.status(404).send("User not found.");
        } else {
          return userService.deleteUser(id);
        }
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(error => {
        res.status(500).send("Error deleting user");
      });
});