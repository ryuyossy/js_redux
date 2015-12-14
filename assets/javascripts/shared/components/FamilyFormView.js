import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import FamilyTypeSelectView from './FamilyTypeSelectView'
import DependentSelectView from './DependentSelectView'
import EconomicActivitySelectView from './EconomicActivitySelectView'

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

import {YES, NO, FAMILY_TYPE_SPOUSE,FAMILY_TYPE_MASTER,DEPENDENT_MASTER} from "../constants/Constants.js"

import WorkingYearsSelectView from './WorkingYearsSelectView';


let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'
import ReactMixin from 'react-mixin';


@ReactMixin.decorate(History)
class FamilyFormView extends BaseComponent {

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
    this.onChangeFamilyType = this.onChangeFamilyType.bind(this)
    this.onChangeDependent = this.onChangeDependent.bind(this)
    this.onChangeEconomicActivity = this.onChangeEconomicActivity.bind(this)
  }


  onChangeFamilyType(familyType){
    this.setState({family_type: familyType});
  }
  onChangeDependent(dependent){
    this.setState({dependent: dependent});
  }

  onChangeEconomicActivity(economicActivityId){
    this.setState({economic_activity_id: economicActivityId});
  }


  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }



  submitForm(){
    var type = this.refs.family_type.getValue();
    var age = this.state.age;
    var economicActivityId = this.refs.economic_activity_id.getValue();
    var dependent = this.refs.dependent.getValue();




    let values = {
      id:this.props.id,
      customerId:this.props.customer_id,
      type:type,
      age:age,
      economicActivityId:economicActivityId,
      dependent:dependent
      };

    if (!age) {
      return;
    }


    this.props.onSubmit(values)

  }





  handleKeyDown(e){
  }

  componentWillMount(){
    this.setDefaultStates(this.props,this.state);
  }


  componentWillReceiveProps(nextProps,nextState){
    this.setDefaultStates(nextProps,nextState);
  }


   setDefaultStates(nextProps,nextState){
     if(this.state.famil_type == null){
       this.setState({famil_type: FAMILY_TYPE_SPOUSE})
     }
     if(this.state.economic_activity_id == null && nextProps.economic_activities != null && nextProps.economic_activities.length > 0){
       this.setState({economic_activity_id: nextProps.economic_activities[0].id})
     }

     let self = this;
     let family = nextProps.family;
     if(family != null){
       Object.keys(family).forEach(function (element, index) {
         if(self.state[element] == null){
           let obj = {};
           obj[element] = family[element]
           self.setState(obj);
         }
       });
     }


   }



  onChangeSelectValue(e) {
    this.setState({selectValue: e.target.value});
  }

  onChangeWorkingYears(year,month){
    this.setState({working_year: year, working_month: month});
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {

    // let errorsNode = this.getErrorNodes(this.props.guarantors.errors);

    let self = this;

    let buttonLabel = "Save"
    if(this.props.id){
      buttonLabel = "Update"
    }



    return (
      <div className="cutmerFormView">
        <div className="tabsOnes">
          <h5 className="titlesM">Family #{this.props.index}</h5>


          <div className="areaWrap row">


            <div className="area">
              <div className="item1">Family type</div>
              <div className="item2">
                <FamilyTypeSelectView list={FAMILY_TYPE_MASTER} ref="family_type" onChange={this.onChangeFamilyType} value={this.state.family_type}  id="family_type" label_key="label" value_key="value" />
              </div>
            </div>


            <div className="area">
              <div className="item1">Age</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.age} ref="age" placeholder="age" id="age" type="number" className="validate fieldsWidth" />
              </div>
            </div>


            <div className="area">
              <div className="item1">Economic Activity</div>
              <div className="item2">
                <EconomicActivitySelectView onChange={this.onChangeEconomicActivity} value={this.state.economic_activity_id} economic_activities={this.props.economic_activities} ref="economic_activity_id" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Dependent</div>
              <div className="item2">
                <DependentSelectView list={DEPENDENT_MASTER} ref="dependent" onChange={this.onChangeDependent} value={this.state.dependent}  id="dependent" label_key="label" value_key="value" />
              </div>
            </div>



          <div className="row">
            <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">{buttonLabel}
                <i className=""></i>
            </button>
          </div>

        </div>
        </div>
      </div>
    );
  }
}

export default FamilyFormView;
