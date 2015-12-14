import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

class PotentialResponseView extends BaseComponent {



  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleDelete(e) {
    this.props.actions.deletePotentialResponse(this.props.potentialResponse.id)
  }




  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var value = React.findDOMNode(this.refs.potential_response).value.trim();

      if (!value) {
        return;
      }
      let values = {
        value: value
      };

      this.props.actions.updatePotentialResponse(this.props.id,values);

      this.setState({text_pressed : false});
    }else if(key == 27){ //esc
      this.setState({text_pressed : false });
    }
  }



  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let potentialResponse = this.props.potentialResponse;


    if(this.state.text_pressed || this.props.errors){
      result = (

        <div>
          <div className="row">
             <div className="input-field col s6">
               <input onKeyDown={this.handleKeyDown}  ref="potential_response" defaultValue={potentialResponse.value} id="potential_response" type="text" className="validate" />
               <label className="active" htmlFor="potential_response">Potential Response to the suggestion</label>
             </div>
          </div>

          <div className="row">
             <div className="input-field col s6">
               Delete
             </div>
          </div>
          {errorsNode}
        </div>
      );
    }
    else{
      result = (<div className={border}>
        <div className="col s6" onClick={this.handleEdit}>
          {this.props.potentialResponse.value}
        </div>
        <div className="col s6" onClick={this.handleDelete}>Delete</div>
      </div>);
    }

    return result
  }


}


export default PotentialResponseView;
