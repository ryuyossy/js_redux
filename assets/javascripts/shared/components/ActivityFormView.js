import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import LoanProductSelectView from './LoanProductSelectView';
import PotentialResponseSelectView from './PotentialResponseSelectView';
import NextStepSelectView from './NextStepSelectView';



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

import {YES, NO, LOAN_PURPOSE_BUSINESS, CURRENCY_USD} from "../constants/Constants.js"

import WorkingYearsSelectView from './WorkingYearsSelectView';


let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'
import ReactMixin from 'react-mixin';


@ReactMixin.decorate(History)
class ActivityFormView extends BaseComponent {

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
    this.onChangeWorkingYears = this.onChangeWorkingYears.bind(this);
    this.onChangeLoanProduct = this.onChangeLoanProduct.bind(this)
    this.onChangePotentialResponse = this.onChangePotentialResponse.bind(this);
    this.onChangePotentialReason = this.onChangePotentialReason.bind(this);
  }

  onChangeLoanProduct(loanProductId){
    this.setState({loan_product_id: loanProductId});
  }
  onChangePotentialResponse(potentialResponseId){
    this.setState({potential_response_id: potentialResponseId});
  }

  onChangePotentialReason(potentialReasonIds){
    this.setState({potential_reason_ids: potentialReasonIds});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }


  submitForm(){
    var loanProductId = this.refs.loan_product_id.getValue();
    var discussionWeHad = this.state.discussion_we_had;
    var potentialResponseId = this.refs.potential_response_id.getValue();
    var potentialReasonIds = this.state.potential_reason_ids;
    var nextStepId = this.refs.next_step_id.getValue();
    var advertisingDate = this.refs.advertising_date.getDate();
    advertisingDate = formatDate(advertisingDate);

    var dateToMeetThemAgain = this.refs.date_to_meet_them_again.getDate();
    dateToMeetThemAgain = formatDate(dateToMeetThemAgain);
    var otherInformation = this.state.other_information;


    let values = {
      loanProductId:loanProductId,
      discussionWeHad:discussionWeHad,
      potentialResponseId:potentialResponseId,
      potentialReasonIds:potentialReasonIds,
      nextStepId:nextStepId,
      advertisingDate:advertisingDate,
      dateToMeetThemAgain:dateToMeetThemAgain,
      otherInformation:otherInformation
      };

    if (!loanProductId || !discussionWeHad || !potentialResponseId ) {
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
     if(this.state.loan_purpose == null){
       this.setState({loan_purpose: LOAN_PURPOSE_BUSINESS})
     }
     if(this.state.currency == null){
       this.setState({currency: CURRENCY_USD})
     }
     if(this.state.loan_usage == null && nextProps.loan_usages != null && nextProps.loan_usages.length > 0){
       this.setState({loan_usage: nextProps.loan_usages[0].id})
     }


     let self = this;
     let potentialCustomer = this.props.potential_customer;

     let activity = potentialCustomer;
     if(activity != null){
       Object.keys(activity).forEach(function (element, index) {
         if(self.state[element] == null){
           let obj = {};
           obj[element] = activity[element]
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
    let advertisingDate = new Date();
    if(this.state.advertising_date && this.state.advertising_date != "0001-01-01T00:00:00Z"){
      advertisingDate = new Date(this.state.advertising_date);
    }

    let dateToMeetThemAgain = new Date();
    if(this.state.date_to_meet_them_again && this.state.date_to_meet_them_again != "0001-01-01T00:00:00Z"){
      dateToMeetThemAgain = new Date(this.state.date_to_meet_them_again);
    }


    return (
      <div className="cutmerFormView">
        <div className="tabsOnes">
          <h5 className="titlesM">Activity</h5>

          <div className="areaWrap row">


            <div className="area">
              <div className="item1">Product we suggested</div>
              <div className="item2">
                <LoanProductSelectView list={this.props.loan_products} ref="loan_product_id" onChange={this.onChangeLoanProduct} value={this.state.loan_product_id}  id="loan_product_id" type="text" className="validate fieldsWidth" />
              </div>
            </div>


            <div className="area">
              <div className="item1">Discussion we had</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.discussion_we_had} ref="discussion_we_had" placeholder="Discussion we had" id="discussion_we_had" type="text" className="validate fieldsWidth" />
              </div>
            </div>

            <div className="area">
              <div className="item1">Response to the suggestion</div>
              <div className="item2">
                <PotentialResponseSelectView list={this.props.potential_responses} ref="potential_response_id" onChange={this.onChangePotentialResponse} value={this.state.potential_response_id}  id="potential_response_id" type="text" className="validate fieldsWidth" />
              </div>
            </div>


            <div className="area">
              <div className="item1">Reason why the did not get from us</div>
              <div className="item2">
                <PotentialResponseSelectView multiple={true} list={this.props.potential_reasons} ref="potential_reason_ids" onChange={this.onChangePotentialReason} value={this.state.potential_reason_ids}  id="potential_reason_ids" type="text" className="validate fieldsWidth" />
              </div>
            </div>


            <div className="area">
              <div className="item1">Next step</div>
              <div className="item2">
                <NextStepSelectView list={this.props.potential_next_steps} ref="next_step_id" onChange={this.onChangeNextStep} value={this.state.next_step_id}  id="next_step_id" type="text" className="validate fieldsWidth" />
              </div>
            </div>





            <div className="area">
              <div className="item1">Advertising Date</div>
              <div className="item2">
                <DatePicker
                  hintText="Date"
                　mode="landscape"
                  formatDate={formatDate}
                  value={advertisingDate}
                  ref="advertising_date"
                  onKeyDown={this.handleKeyDown}
                  className="fieldsWidth"
                />
              </div>
            </div>


          <div className="area">
            <div className="item1">Date to meet them again</div>
            <div className="item2">
              <DatePicker
                hintText="Date"
              　mode="landscape"
                formatDate={formatDate}
                value={dateToMeetThemAgain}
                ref="date_to_meet_them_again"
                onKeyDown={this.handleKeyDown}
                className="fieldsWidth"
              />
            </div>
          </div>


        <div className="area">
          <div className="item1">Other information</div>
          <div className="item2">
            <input  onChange={this.onChangeValue} value={this.state.other_information} ref="other_information" placeholder="Other information" id="other_information" type="text" className="validate"　/>
          </div>
        </div>


          <div className="row">
            <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Save
                <i className=""></i>
            </button>
          </div>

        </div>
        </div>
      </div>
    );
  }
}

export default ActivityFormView;
