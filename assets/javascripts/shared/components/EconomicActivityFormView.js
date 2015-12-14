import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class EconomicActivityFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var economicActivity = React.findDOMNode(this.refs.economic_activity).value.trim();

      if (!economicActivity) {
        return;
      }
      let values = {
        value: economicActivity
      };

      this.props.actions.createEconomicActivity(values);

      React.findDOMNode(this.refs.economic_activity).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="col s2">
          <input type="text" placeholder="Economic Activity" ref="economic_activity" onKeyDown={this.handleKeyDown} />
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default EconomicActivityFormView;
