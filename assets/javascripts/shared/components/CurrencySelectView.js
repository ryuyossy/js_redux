import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {CURRENCY_MASTER, CURRENCY_USD, CURRENCY_LKR, CURRENCY_MMK, CURRENCY_KHR} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'




class CurrencySelectView extends BaseComponent {


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
    var currency = nextState.currency || nextProps.value;
    if(!currency){
      currency = CURRENCY_USD;
    }
    this.setState({currency: currency})
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
    return this.state.currency;
  }


  render() {

    let self = this;

    let optionsCurrency = CURRENCY_MASTER.map(function(currency) {
      return <option value={currency.value} key={currency.value}>{currency.label}</option>;
    });

    return (
        <select onChange={this.onChangeValue} id="currency" className="browser-default fieldsWidth" value={this.state.currency}>
          {optionsCurrency}
        </select>
    );
  }

}

export default CurrencySelectView;
