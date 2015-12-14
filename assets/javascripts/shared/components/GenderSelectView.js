import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {GENDER_MASTER, GENDER_MALE, GENDER_FEMALE} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'




class GenderSelectView extends BaseComponent {


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
    var gender = nextState.gender || nextProps.value;
    if(!gender){
      gender = GENDER_MALE;
    }
    this.setState({gender: gender})
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
    return this.state.gender;
  }


  render() {

    let self = this;

    let optionsGender = GENDER_MASTER.map(function(gender) {
      return <option value={gender.value} key={gender.value}>{gender.label}</option>;
    });


    return (
      <div>

        <div className="area">
          <div className="item1">Gender</div>
          <div className="item2 bn">
            <select onChange={this.onChangeValue} id="gender" className="browser-default fieldsWidth" value={this.state.gender}>
              {optionsGender}
            </select>
          </div>
        </div>

      </div>

    );
  }

}

export default GenderSelectView;
