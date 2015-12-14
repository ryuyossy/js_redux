import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class IdPaperFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var value = React.findDOMNode(this.refs.id_paper).value.trim();

      if (!value) {
        return;
      }
      let values = {
        value: value
      };

      this.props.actions.createIdPaper(values);

      React.findDOMNode(this.refs.id_paper).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="col s2">
          <input type="text" placeholder="ID Paper" ref="id_paper" onKeyDown={this.handleKeyDown} />
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default IdPaperFormView;
