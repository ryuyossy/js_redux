import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import FamilyFormView from './FamilyFormView';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as FamilyActions from '../actions/FamilyActions';
import * as EconomicActivityActions from '../actions/EconomicActivityActions';


import {YES, NO} from "../constants/Constants.js"



let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'


import ReactMixin from 'react-mixin';


@connect(state => (
{
  families: state.families,
  economicActivities: state.economicActivities
}
))
@ReactMixin.decorate(History)
class FamilyEditView extends BaseComponent {

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

    this.onChangeSelectValue = this.onChangeSelectValue.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);

  }

  handleSubmit(values) {
    const {  dispatch } = this.props;
    const familyActions = bindActionCreators(FamilyActions, dispatch);
    if(values["id"]){
      familyActions.updateFamily(this.props.params.id,values["id"], values);
    }else{
      familyActions.createFamily(this.props.params.id, values);
    }
  }


  handleNext() {

    this.props.history.pushState(null, `/customers/${this.props.params.id}`, {defaultFlow: true});

    // if(this.props.location.query.potential == "true"){
    //   this.props.history.pushState(null, `/potential_customers/${this.props.params.id}/activities`, {defaultFlow: true});
    // }else{
    // }
  }

  handleKeyDown(e){

  }


  componentWillMount(){
    const { dispatch } = this.props;
    const familyActions = bindActionCreators(FamilyActions, dispatch);
    const economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    economicActivityActions.getEconomicActivities();
    familyActions.getFamilies(this.props.params.id);
    this.setDefaultStates(this.props,this.state);
 }


 setDefaultStates(nextProps,nextState){

 }

 componentWillReceiveProps(nextProps,nextState){
   this.setDefaultStates(nextProps,nextState);
 }


  onChangeSelectValue(e) {
    this.setState({selectValue: e.target.value});
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {
    // let errorsNode = this.getErrorNodes(this.props.guarantors.errors);

    let self = this;
    let customerId = this.props.params.id;
    let families = null;
    if(this.props.families != null){
      families = this.props.families.families;
    }
    let economicActivities = this.props.economicActivities.economicActivities;
    let familyNodes = null;
    if(families == null || families.length == 0){
      familyNodes =
      (
        <FamilyFormView onSubmit={this.handleSubmit} customer_id={customerId} economic_activities={economicActivities}  family={null} />
      );
    }else{
      let i = 0;
      familyNodes = families.map(function(family, index) {
        i = index;
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <FamilyFormView onSubmit={self.handleSubmit} customer_id={customerId} economic_activities={economicActivities} index={index+1}  errors={family.errors} key={family.id} family={family} id={family.id}  />
        );
      });
      i++;
      familyNodes.push(
        <FamilyFormView index={i+1} key="1" onSubmit={self.handleSubmit} customer_id={customerId} economic_activities={economicActivities} family={null} />
      )
    }
    return (
      <div>
        {familyNodes}

        <button onClick={this.handleNext} className="btn waves-effect waves-light" type="submit" name="action">Next
            <i className=""></i>
        </button>

      </div>
    );
  }
}

export default FamilyEditView;
