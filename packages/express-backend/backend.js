// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
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

// Create new user (with error handling)
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
  
// Delete individual user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; // Ensure this is capturing the ID correctly

  userService.deleteUserById(id)
    .then(deletedUser => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch(error => {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    });
});
