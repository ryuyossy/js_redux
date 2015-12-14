import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';

class PreloaderView extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  render() {
    return (
      <div className="preloadWrap">
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreloaderView;
