import React from "react";

import { useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const UserTable = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(0);

  const initialState = {
    id: null,
    first_name: "",
    email: "",
    last_name: "",
    avatar: ""
  };
  const [modalData, setmodalData] = useState(initialState);

  const handleClickOpenModal = user => {
    console.log(user);
    setmodalData(user);
    setOpen(true);
  };

  console.log("modalData", modalData);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Table>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User Details
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Fisrt name: {modalData.first_name}
          </Typography>
          <Typography gutterBottom>
            Last name : {modalData.last_name}
          </Typography>
          <Typography gutterBottom>Email id : {modalData.email}</Typography>
          <Grid container justify="center" alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={modalData.avatar}
              className={classes.bigAvatar}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <TableHead>
        <TableRow hover>
          <th onClick={() => props.shortById()}>Id</th>
          <th onClick={() => props.shortByName()}>Name</th>
          <th onClick={() => props.shortByEmail()}>Email</th>
          <th>Actions</th>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.users.length > 0 ? (
          props.users.map(user => (
            <TableRow hover key={user.id}>
              <TableCell
                align="center"
                onClick={() => handleClickOpenModal(user)}
              >
                {user.id}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleClickOpenModal(user)}
              >
                {user.first_name}
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleClickOpenModal(user)}
              >
                {user.email}
              </TableCell>
              <TableCell align="center">
                <EditIcon onClick={() => props.editRow(user)} />
                <DeleteIcon onClick={() => props.deleteUser(user.id)} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No users</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
