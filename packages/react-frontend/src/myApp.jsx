// src/MyApp.jsx
import React, { useState, useEffect } from "react";

import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      }, []);

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });
        
        return promise;
    }

    function updateList(person) {
        postUser(person)
          .then((response) => response.json()) 
          .then(() => setCharacters([...characters, person]))
          .catch((error) => {
            console.log(error);
          });
      }
    
    function deleteUser(person) {
        const promise = fetch(`http://localhost:8000/users/${person.id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
        });
        return promise;
    }

    function removeOneCharacter(person) {
        console.log("Deleting user with ID:", person.id); // Log to verify ID is correct
    
        deleteUser(person)
            .then((response) => {
                if (response.ok) {
                    const updated = characters.filter((character) => character.id !== person.id);
                    setCharacters(updated);
                } else {
                    console.log("Failed to delete the user.");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }



    return (
        <div className="container">
            <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
        );
    }

export default MyApp;