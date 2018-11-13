import React, { Component } from 'react';

class Idea extends Component {
  handleClick = () => {
    this.props.onClick(this.props.idea.id);
  };
  handleDeleteIdea = () => {
    this.props.onDelete(this.props.idea.id);
  };
  render() {
    return (
      <div className="dib br3 grow tc bg-light-yellow bw2 shadow-5 pa2 tile">
        <span className="deleteIdea" onClick={this.handleDeleteIdea}>
          X
        </span>
        <h3 onClick={this.handleClick}>{this.props.idea.title}</h3>
        <p onClick={this.handleClick}>{this.props.idea.body}</p>
      </div>
    );
  }
}

export default Idea;
