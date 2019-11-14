import React, { useState } from "react";
import {
  Card,
  Typography,
  makeStyles,
  TextField,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5)
  },
  button: {
    marginTop: theme.spacing(1),
    width: 300
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "300px"
  }
}));

const UpdateForm = () => {
  const [currentMovie, setCurrentMovie] = useState({
    id: -1,
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <Card className={classes.container}>
      <Typography variant="h2" component="h1">
        Update Movie
      </Typography>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="title"
          className={classes.textField}
          label="Title"
          margin="normal"
          variant="outlined"
          value={currentMovie.title}
        />
        <TextField
          id="director"
          name="director"
          className={classes.textField}
          label="Director"
          margin="normal"
          variant="outlined"
          value={currentMovie.director}
        />
        <TextField
          id="metascore"
          name="metascore"
          className={classes.textField}
          label="Metascore"
          margin="normal"
          variant="outlined"
          type="number"
          value={currentMovie.metascore}
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Update Movie
        </Button>
      </form>
    </Card>
  );
};

export default UpdateForm;
