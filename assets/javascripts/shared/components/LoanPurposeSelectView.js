import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {LOAN_PURPOSE_MASTER, LOAN_PURPOSE_BUSINESS, LOAN_PURPOSE_CONSUMPTION, LOAN_PURPOSE_MIX} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'




class LoanPurposeSelectView extends BaseComponent {


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
    var loanPurpose = nextState.loan_purpose || nextProps.value;
    if(!loanPurpose){
      loanPurpose = LOAN_PURPOSE_BUSINESS;
    }
    this.setState({loan_purpose: loanPurpose})
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
    return this.state.loan_purpose;
  }


  render() {

    let self = this;

    let optionsLoanPurpose = LOAN_PURPOSE_MASTER.map(function(loanPurpose) {
      return <option value={loanPurpose.value} key={loanPurpose.value}>{loanPurpose.label}</option>;
    });

    return (
        <select onChange={this.onChangeValue} id="loan_purpose" className="browser-default fieldsWidth" value={this.state.loan_purpose}>
          {optionsLoanPurpose}
        </select>
    );
  }

}

export default LoanPurposeSelectView;
