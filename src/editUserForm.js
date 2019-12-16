import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";

import "./styles.css";

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateUser(user.id, user);
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
      <button>Update user</button>
      <br />
      <br />
      <button onClick={() => props.setEditing(false)}>Cancel Edit</button>
    </form>
  );
};

export default EditUserForm;
