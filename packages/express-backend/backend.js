import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) => {
    return users["users_list"].find((user) => user["id"] === id);
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

// get all users or a user by name or a user by name and job
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

// get a user by id
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found");
    } else {
        res.send(result);
    }
});

// add a user
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send();
});

// delete a user by id
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const userToDelete = findUserById(id);
    if (userToDelete === undefined) {
        res.status(404).send("Resource not found");
    } else {
        // Remove the user from the users_list array
        users["users_list"] = users["users_list"].filter(user => user.id !== id);
        res.send();
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
