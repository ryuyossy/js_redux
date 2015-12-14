import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import IdPaper from './IdPaperView';
import BaseComponent from './BaseComponent';
import IdPaperFormView from './IdPaperFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class IdPaperListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.idPapers == null || !this.props.idPapers.length){
      return (
        <div>
          <div className="row">
            <div className="col s2"><b>ID paper</b></div>
          </div>
          <IdPaperFormView actions={this.props.actions}  errors={this.props.idPaperErrors} createIdPaper={this.props.createIdPaper} />
        </div>

      );
    }

    var idPaperNodes = this.props.idPapers.map(function(idPaper, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <IdPaper index={index+1}  errors={idPaper.errors} key={idPaper.id} idPaper={idPaper} id={idPaper.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>ID paper</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {idPaperNodes}
      </ReactCSSTransitionGroup>
      <IdPaperFormView actions={this.props.actions} errors={this.props.idPaperErrors} createIdPaper={this.props.createIdPaper} />
    </div>

    );
  }


}

export default IdPaperListView;
