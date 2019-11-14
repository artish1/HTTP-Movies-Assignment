import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
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
    width: 350
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    width: "350px"
  }
}));

const initialFormState = {
  id: -1,
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [currentMovie, setCurrentMovie] = useState(initialFormState);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setCurrentMovie(res.data))
      .catch(err => console.log(err.response));
  }, [id]);
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, currentMovie)
      .then(res => {
        console.log(res);
        setCurrentMovie(initialFormState);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  const onTextChange = e => {
    setCurrentMovie({ ...currentMovie, [e.target.name]: e.target.value });
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
          onChange={onTextChange}
        />
        <TextField
          id="director"
          name="director"
          className={classes.textField}
          label="Director"
          margin="normal"
          variant="outlined"
          value={currentMovie.director}
          onChange={onTextChange}
        />
        <TextField
          id="metascore"
          name="metascore"
          className={classes.textField}
          label="Metascore"
          margin="normal"
          variant="outlined"
          type="number"
          onChange={onTextChange}
          value={currentMovie.metascore}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Update Movie
        </Button>
      </form>
    </Card>
  );
};

export default UpdateForm;
