import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import UserTable from "./userTable.js";
import AddUserForm from "./AddUserForm.js";
import EditUserForm from "./editUserForm.js";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const App = () => {
  const classes = useStyles();
  // const usersData = [
  //   { id: 1, name: "Tania", username: "floppydiskette", status: false },
  //   { id: 2, name: "Craig", username: "siliconeidolon", status: true },
  //   { id: 3, name: "Ben", username: "benisphere", status: false }
  // ];

  const [count, setCount] = useState(1);

  const [sortName, setNameSort] = useState(1);
  const [sortEmail, setEmailSort] = useState(1);
  const [sortId, setIdSort] = useState(1);

  const [users, setUsers] = useState({ hits: [] });

  const [searchValue, setSearchValue] = useState("");

  const [, setSortedUsers] = useState(users);

  const initialFormState = { id: null, first_name: "", email: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  async function fetchData(count) {
    const result = await axios(`https://reqres.in/api/users?page=${count}`);
    setUsers(result.data.data);
  }

  useEffect(() => {
    fetchData(count);
  }, [count]);

  const addUser = user => {
    user.id = users[users.length - 1].id + 1;
    setUsers([...users, user]);
  };

  const editRow = user => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      first_name: user.first_name,
      email: user.email
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleInputSearch = e => {
    // console.log("handleInputChange",e.target.value)
    setSearchValue(e.target.value);
    let newArr = [];
    let tempUser = users;

    tempUser.map(user => {
      if (
        user.first_name.indexOf(e.target.value) > -1 ||
        user.email.indexOf(e.target.value) > -1
      ) {
        console.log("123456", user);
        newArr.push(user);
      }
    });

    // console.log("newArr",newArr)

    setUsers(newArr);
  };

  const goToLeftSlide = () => {
    // console.log("goToLeftSlide")
    if (count === 1) {
      setCount(4);
    } else {
      setCount(count - 1);
    }
    // console.log(count)
  };
  const goToRightSlide = () => {
    // console.log("goToRightSlide")
    if (count === 4) {
      setCount(1);
    } else {
      setCount(count + 1);
    }
    // console.log(count)
  };

  const shortById = () => {
    if (sortId === 1) {
      setSortedUsers(users.sort((a, b) => (a.id > b.id ? 1 : -1)));
      setIdSort(0);
    } else {
      setSortedUsers(users.sort((a, b) => (a.id < b.id ? 1 : -1)));
      setIdSort(1);
    }
  };
  const shortByName = () => {
    if (sortName === 1) {
      setSortedUsers(
        users.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      );
      setNameSort(0);
    } else {
      setSortedUsers(
        users.sort((a, b) => (a.first_name < b.first_name ? 1 : -1))
      );
      setNameSort(1);
    }
  };
  const shortByEmail = () => {
    if (sortEmail === 1) {
      setSortedUsers(users.sort((a, b) => (a.email > b.email ? 1 : -1)));
      setEmailSort(0);
    } else {
      setSortedUsers(users.sort((a, b) => (a.email < b.email ? 1 : -1)));
      setEmailSort(1);
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h2" component="h3" align="center">
          CRUD App with Hooks
        </Typography>
      </Paper>
      <div>
        <div>
          {editing ? (
            <>
              <Typography variant="h3" align="center">
                Edit user
              </Typography>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </>
          ) : (
            <>
              <Typography variant="h3" align="center">
                Add user
              </Typography>
              <AddUserForm addUser={addUser} />
            </>
          )}
        </div>
        <div>
          <br />
          <Typography variant="h3" align="center">
            Search User
          </Typography>
          <TextField
            align="left"
            id="outlined-required"
            label="Search"
            margin="normal"
            variant="outlined"
            value={searchValue}
            onChange={handleInputSearch}
          />
          <Typography variant="h3" align="center">
            View users
          </Typography>
          <UserTable
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
            shortById={shortById}
            shortByName={shortByName}
            shortByEmail={shortByEmail}
          />
        </div>
        <br />
        <div class="pagination">
          <a href="#" onClick={goToLeftSlide}>
            ❮
          </a>
          <a href="#" onClick={goToRightSlide}>
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
