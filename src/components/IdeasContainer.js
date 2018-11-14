import React, { Component } from 'react';
import IdeaForm from './IdeaForm';
import axios from 'axios';
import Idea from './Idea';
import update from 'immutability-helper';
import Notification from './Notification';

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: '',
      transitionIn: false
    };
  }

  componentDidMount() {
    axios
      .get('https://shrouded-gorge-19944.herokuapp.com/api/v1/ideas')
      .then((response) => {
        console.log(response);
        console.log(response);
        this.setState({ ideas: response.data });
      })
      .catch((error) => console.log(error));
  }

  addNewIdea = () => {
    axios
      .post('https://shrouded-gorge-19944.herokuapp.com/api/v1/ideas', {
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
    this.setState({
      ideas,
      notification: 'All changes saved',
      transitionIn: true
    });
  };

  deleteIdea = (id) => {
    axios
      .delete(`https://shrouded-gorge-19944.herokuapp.com/api/v1/ideas/${id}`)
      .then((response) => {
        const ideaIndex = this.state.ideas.findIndex((x) => x.id === id);
        const ideas = update(this.state.ideas, {
          $splice: [[ideaIndex, 1]]
        });
        this.setState({
          ideas
        });
      })
      .catch((error) => console.log(error));
  };

  resetNotification = () => {
    this.setState({ notification: '', transitionIn: false });
  };

  enableEditing = (id) => {
    this.setState({ editingIdeaId: id }, () => {
      this.title.focus();
    });
  };
  render() {
    return (
      <div>
        <nav class="pa3 pa4-ns">
          <a class="link dim black b f6 f5-ns dib mr3" href="#" title="Home">
            Sugest.fun
          </a>
          <button
            onClick={this.addNewIdea}
            className="newIdeaButton f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue">
            Suggest something fun
          </button>
        </nav>
        <Notification
          in={this.state.transitionIn}
          notification={this.state.notification}
        />
        <div className="ideas">
          {this.state.ideas.map((idea) => {
            if (this.state.editingIdeaId === idea.id) {
              return (
                <IdeaForm
                  idea={idea}
                  key={idea.id}
                  updateIdea={this.updateIdea}
                  titleRef={(input) => (this.title = input)}
                  resetNotification={this.resetNotification}
                />
              );
            } else {
              return (
                <Idea
                  key={idea.id}
                  idea={idea}
                  onClick={this.enableEditing}
                  onDelete={this.deleteIdea}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default IdeasContainer;
