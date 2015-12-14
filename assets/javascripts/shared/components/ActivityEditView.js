import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import ActivityFormView from './ActivityFormView';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActivityActions from '../actions/ActivityActions';
import * as LoanProductActions from '../actions/LoanProductActions';
import * as PotentialResponseActions from '../actions/PotentialResponseActions';
import * as PotentialNextStepActions from '../actions/PotentialNextStepActions';
import * as PotentialReasonActions from '../actions/PotentialReasonActions';
import * as CustomerActions from '../actions/CustomerActions';

import {YES, NO} from "../constants/Constants.js"


let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'


import ReactMixin from 'react-mixin';


@connect(state => (
{
  potential_customer: state.customers,
  loan_products: state.loanProducts,
  potential_responses: state.potentialResponses,
  potential_next_steps: state.potentialNextSteps,
  potential_reasons: state.potentialReasons,
  activity: state.activities
}
))
@ReactMixin.decorate(History)
class ActivityEditView extends BaseComponent {

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


    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(values) {
    let customerId = this.props.params.id;
    const {  dispatch } = this.props;
    const activityActions = bindActionCreators(ActivityActions, dispatch);
    activityActions.createActivity(customerId, values);
  }






  handleKeyDown(e){

  }


  componentWillMount(){
    const { dispatch } = this.props;
    const loanProductActions = bindActionCreators(LoanProductActions, dispatch);
    const potentialResponseActions = bindActionCreators(PotentialResponseActions, dispatch);
    const potentialNextStepActions = bindActionCreators(PotentialNextStepActions, dispatch);
    const potentialReasonActions = bindActionCreators(PotentialReasonActions, dispatch);
    const customerActions = bindActionCreators(CustomerActions, dispatch);

    loanProductActions.getLoanProducts();
    potentialResponseActions.getPotentialResponses();
    potentialNextStepActions.getPotentialNextSteps();
    potentialReasonActions.getPotentialReasons();
    customerActions.getPotentialCustomerDetail(this.props.params.id);
    this.setDefaultStates(this.props,this.state);
 }


 setDefaultStates(nextProps,nextState){

 }

 componentWillReceiveProps(nextProps,nextState){
   if(nextProps.activity.isActivityUpdated == true){
     this.props.history.pushState(null, `/potential_customers_search`, null);
   }
   this.setDefaultStates(nextProps,nextState);
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
    let loanProducts = this.props.loan_products.loanProducts;
    let potentialResponses = this.props.potential_responses.potentialResponses;
    let potentialNextSteps = this.props.potential_next_steps.potentialNextSteps;
    let potentialReasons = this.props.potential_reasons.potentialReasons;
    return (
      <div>
        <ActivityFormView onSubmit={this.handleSubmit}  potential_customer={this.props.potential_customer.potentialCustomer} customer_id={customerId} potential_responses={potentialResponses} loan_products={loanProducts} potential_next_steps={potentialNextSteps} potential_reasons={potentialReasons}  activity={null} />
      </div>
    );
  }
}

export default ActivityEditView;
