import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';


class CollateralFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillReceiveProps(nextProps){


  }

  componentWillMount(){

 }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleKeyDown(e){
    if(e.which == 13){ //enter

      var name = this.state.name;

      if (!name) {
        return;
      }
      let values = {
        name: name
      };

      this.props.actions.createCollateral(values);

      React.findDOMNode(this.refs.name).value = '';

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);


    return (


      <div>
        <div className="row">
           <div className="input-field col s6">
             <input onChange={this.onChangeText} onKeyDown={this.handleKeyDown}  ref="name"  id="name" type="text" className="validate" />
             <label className="" htmlFor="name">Name</label>
           </div>

        </div>


        {errorsNode}
      </div>

    );
  }

}

export default CollateralFormView;
