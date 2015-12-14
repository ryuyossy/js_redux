import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import {WORKING_YEARS, WORKING_MONTHS} from "../constants/Constants.js"


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'




class WorkingYearsSelectView extends BaseComponent {


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
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
  }


  setDefaultStates(nextProps, nextState){
    var workingYear = nextState.working_year || nextProps.year;
    var workingMonth = nextState.working_month || nextProps.month;
    if(!workingYear){
      workingYear = "0";
    }
    if(!workingMonth){
      workingMonth = "0";
    }
    this.setState({working_year: workingYear, working_month: workingMonth})
  }


  componentWillReceiveProps(nextProps, nextState){
    this.setDefaultStates(nextProps, nextState);
  }

  componentWillMount(){
    this.setDefaultStates(this.props, this.state);
  }

  onChangeMonth(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.props.onChange(this.state.working_year, e.target.value);
    this.setState(obj);
  }

  onChangeYear(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.props.onChange(e.target.value, this.state.working_month);
    this.setState(obj);
  }

  getValue(){
    return this.state;
  }


  render() {

    let self = this;

    let optionsWorkingYears = WORKING_YEARS.map(function(year) {
      return <option value={year} key={year}>{year}</option>;
    });

    let optionsWorkingMonths = WORKING_MONTHS.map(function(month) {
      return <option value={month} key={month}>{month}</option>;
    });


    return (
      <div>

        <div className="row">
            <label>Working years</label>
            <select onChange={this.onChangeYear} id="working_year" className="browser-default" value={this.state.working_year} >
              {optionsWorkingYears}
            </select>
            <label>Working months</label>
            <select onChange={this.onChangeMonth} id="working_month" className="browser-default" value={this.state.working_month} >
              {optionsWorkingMonths}
            </select>
        </div>

      </div>

    );
  }

}

export default WorkingYearsSelectView;
