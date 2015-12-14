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




class EconomicActivitySelectView extends BaseComponent {


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
    var economicActivity = nextState.economic_activity || nextProps.value;
    if(!economicActivity && nextProps.economic_activities.length > 0){
      economicActivity = nextProps.economic_activities[0].id;
    }
    this.setState({economic_activity: economicActivity})
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
    return this.state.economic_activity;
  }


  render() {

    let self = this;

    let optionsEconomicActivity = this.props.economic_activities.map(function(economicActivity) {
      return <option value={economicActivity.id} key={economicActivity.id}>{economicActivity.value}</option>;
    });



    return (
            <select onChange={this.onChangeValue} id="economic_activity" className="browser-default fieldsWidth" value={this.state.economic_activity} >
              {optionsEconomicActivity}
            </select>

    );
  }

}

export default EconomicActivitySelectView;
