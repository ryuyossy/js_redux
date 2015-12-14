import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {OWNER_MASTER, OWNER_BORROWER, OWNER_OTHERS} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'



class OwnerSelectView extends BaseComponent {


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
    this.onChangeValue = this.onChangeValue.bind(this);
  }


  setDefaultStates(nextProps, nextState){
    var owner = nextState.owner || nextProps.value;
    if(!owner){
      owner = OWNER_BORROWER;
    }
    this.setState({owner: owner})
  }


  componentWillReceiveProps(nextProps, nextState){
    this.setDefaultStates(nextProps, nextState);
  }

  componentWillMount(){
    this.setDefaultStates(this.props, this.state);
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
    this.props.onChange(e.target.value);
  }

  getValue(){
    return this.state.owner;
  }


  render() {

    let self = this;

    let optionsOwner = OWNER_MASTER.map(function(owner) {
      return <option value={owner.value} key={owner.value}>{owner.label}</option>;
    });


    return (
      <div>

        <div className="row">
            <label>Owner</label>
            <select onChange={this.onChangeValue} id="owner" className="browser-default" value={this.state.owner} >
              {optionsOwner}
            </select>
        </div>

      </div>

    );
  }

}

export default OwnerSelectView;
