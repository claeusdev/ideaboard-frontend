import React, { Component } from 'react';
import IdeaForm from './IdeaForm';
import axios from 'axios';
import Idea from './Idea';
import update from 'immutability-helper';

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingIdeaId: null
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/v1/ideas')
      .then((response) => {
        console.log(response);
        console.log(response);
        this.setState({ ideas: response.data });
      })
      .catch((error) => console.log(error));
  }

  addNewIdea = () => {
    axios
      .post('http://localhost:4000/api/v1/ideas', {
        idea: { title: '', body: '' }
      })
      .then((response) => {
        const ideas = update(this.state.ideas, {
          $splice: [[0, 0, response.data]]
        });
        this.setState({ ideas, editingIdeaId: response.data.id });
      })
      .catch((error) => console.log(error));
  };

  updateIdea = (idea) => {
    const ideaIndex = this.state.ideas.findIndex((x) => x.id === idea.id);
    const ideas = update(this.state.ideas, { [ideaIndex]: { $set: idea } });
    this.setState({ ideas });
  };
  render() {
    return (
      <div>
        <button
          onClick={this.addNewIdea}
          className="newIdeaButton f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue">
          Add new idea
        </button>
        <div className="ideas">
          {this.state.ideas.map((idea) => {
            if (this.state.editingIdeaId === idea.id) {
              return <IdeaForm idea={idea} key={idea.id} />;
            } else {
              return <Idea key={idea.id} idea={idea} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default IdeasContainer;
