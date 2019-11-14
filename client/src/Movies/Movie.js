import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Button, withStyles } from "@material-ui/core";

const StyledButton = withStyles({
  root: {
    margin: "5px",
    width: "200px"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  updateMovie = () => {
    this.props.history.push(`/update-movie/${this.props.match.params.id}`);
  };

  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props);

    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <StyledButton onClick={this.updateMovie} variant="contained">
          Update
        </StyledButton>

        <StyledButton
          onClick={this.deleteMovie}
          color="secondary"
          variant="contained"
        >
          Delete
        </StyledButton>

        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
    );
  }
}
