import React from 'react';

const Idea = ({ idea }) => (
  <div
    key={idea.id}
    className="dib br3 grow tc bg-light-yellow bw2 shadow-5 pa2 tile">
    <h3>{idea.title}</h3>
    <p>{idea.body}</p>
  </div>
);

export default Idea;
