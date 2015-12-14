import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class LoanUsageSelectView extends BaseComponent {

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
    var loanUsage = nextState.loan_usage || nextProps.value;
    if(!loanUsage &&  nextProps.loan_usages && nextProps.loan_usages.length > 0){
      loanUsage = nextProps.loan_usages[0].id;
    }
    this.setState({loan_usage: loanUsage})
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
    return this.state.loan_usage;
  }


  render() {

    let self = this;
    let optionsLoanUsage = null;
    if(this.props.loan_usages == null){
      optionsLoanUsage = (<select></select>)
    }else{
      optionsLoanUsage = this.props.loan_usages.map(function(loanUsage) {
        return <option value={loanUsage.id} key={loanUsage.id}>{loanUsage.value}</option>;
      });
    }


    return (
        <select onChange={this.onChangeValue} id="loan_usage" className="browser-default fieldsWidth" value={this.state.loan_usage} >
          {optionsLoanUsage}
        </select>
    );
  }

}

export default LoanUsageSelectView;
