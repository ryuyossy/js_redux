import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class RoleFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter
      var fundingSourceName = React.findDOMNode(this.refs.funding_source_name).value.trim();

      if (!fundingSourceName) {
        return;
      }
      let values = {
        fundingSourceName: fundingSourceName
      };

      this.props.actions.createRole(values);

      React.findDOMNode(this.refs.funding_source_name).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    return (
      <div className="row">
        <div className="col s2">
          <input type="text" placeholder="Funding Source Name" ref="funding_source_name" onKeyDown={this.handleKeyDown} />
        </div>
          {errorsNode}
      </div>
    );
  }

}

export default RoleFormView;
