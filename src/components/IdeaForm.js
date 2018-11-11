import React, { Component } from 'react';
import axios from 'axios';

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = () => {
    const idea = { title: this.state.title, body: this.state.body };
    axios
      .put(`http://localhost:4000/api/v1/ideas/${this.props.idea.id}`, {
        idea: idea
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="dib br3 grow tc bg-light-yellow bw2 shadow-5 pa2 tile">
        <form onBlur={this.handleBlur}>
          <input
            value={this.state.title}
            onChange={this.handleInput}
            name="title"
            type="text"
            className="input"
            placeholder="Enter title"
          />
          <textarea
            value={this.state.body}
            onChange={this.handleInput}
            name="body"
            cols="30"
            rows="10"
            placeholder="Describe your idea"
            className="input"
          />
        </form>
      </div>
    );
  }
}

export default IdeaForm;
