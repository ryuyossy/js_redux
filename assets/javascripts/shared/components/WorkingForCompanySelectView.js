import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {WORKING_FOR_COMPANY_MASTER, WORKING_FOR_COMPANY_YES, WORKING_FOR_COMPANY_NO} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class WorkingForCompanySelectView extends BaseComponent {


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
    var workingForCompany = nextState.workingForCompany || nextProps.value;
    if(!workingForCompany){
      workingForCompany = WORKING_FOR_COMPANY_YES;
    }
    this.setState({workingForCompany: workingForCompany})
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
    return this.state.workingForCompany;
  }


  render() {

    let self = this;

    let optionsWorkingForCompany = WORKING_FOR_COMPANY_MASTER.map(function(workingForCompany) {
      return <option value={workingForCompany.value} key={workingForCompany.value}>{workingForCompany.label}</option>;
    });


    return (
        <div className="area">
            <div className="item1">Working for a company?</div>
            <div className="item2 bn">
              <select onChange={this.onChangeValue} id="workingForCompany" className="browser-default" value={this.state.workingForCompany} >
                {optionsWorkingForCompany}
              </select>
            </div>
        </div>
    );
  }

}

export default WorkingForCompanySelectView;
