import React, { Component } from 'react';
import video from '../../../services/night.mp4';

export default class EventComponent extends Component {
  render() {
    return (
      <div id="main-content">
        <div className="container-video">
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="overlay" />
      </div>
    );
  }
}
