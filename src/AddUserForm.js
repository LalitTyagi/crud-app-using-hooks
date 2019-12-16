import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";

import "./styles.css";

const AddUserForm = props => {
  const initialFormState = { id: null, first_name: "", email: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    console.log("onSubmit");
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (!user.first_name || !user.email) return;

        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Name"
        margin="normal"
        variant="outlined"
        name="first_name"
        value={user.first_name}
        onChange={handleInputChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        margin="normal"
        variant="outlined"
        name="email"
        value={user.email}
        onChange={handleInputChange}
      />
      <br />
      <button variant="contained">Add new user</button>
      <br />
    </form>
  );
};

export default AddUserForm;
