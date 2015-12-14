import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as CustomerActions from '../actions/CustomerActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';
import * as IdPaperActions from '../actions/IdPaperActions';
import * as EconomicActivityActions from '../actions/EconomicActivityActions';

import {YES, NO} from "../constants/Constants.js"

import AddressHandler from './AddressHandler';
import GenderSelectView from './GenderSelectView';
import IdPaperSelectView from './IdPaperSelectView';
import WorkingForCompanySelectView from './WorkingForCompanySelectView';
import EconomicActivitySelectView from './EconomicActivitySelectView';
import WorkingYearsSelectView from './WorkingYearsSelectView';


let Tabs = mui.Tabs;
let Tab = mui.Tab;
let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'
import ReactMixin from 'react-mixin';


@connect(state => (
{
  area_settings: state.areaSettings,
  id_papers: state.idPapers,
  economicActivities: state.economicActivities,
  customers: state.potentialCustomers
}
))
@ReactMixin.decorate(History)
class PotentialCustomerFormView extends BaseComponent {

  static get childContextTypes(){
    return {
      muiTheme: React.PropTypes.object.isRequired
    };
  }

  handleKeyDown(){

  }



  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props,context) {
    super(props,context);
    this.state = {
    };

    this.onChangeSelectValue = this.onChangeSelectValue.bind(this);
    this.handleOnCheckBt = this.handleOnCheckBt.bind(this);
    this.nextHandleStep = this.nextHandleStep.bind(this);
    this.backHandleStep = this.backHandleStep.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCurrentAddress = this.onChangeCurrentAddress.bind(this);
    this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);
    this.onChangeBirthAddress = this.onChangeBirthAddress.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeIdPaper = this.onChangeIdPaper.bind(this);
    this.onChangeWorkingForCompany = this.onChangeWorkingForCompany.bind(this);
    this.onChangeEconomicActivity = this.onChangeEconomicActivity.bind(this);
    this.onChangeWorkingYears = this.onChangeWorkingYears.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeIdDate = this.onChangeIdDate.bind(this);

  }

  onChangeBirthday(nil,date){
    this.setState({birthday: date})
  }

  onChangeIdDate(nil,date){
    this.setState({id_date: date})
  }


  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }



  submitForm(){
    var firstName = this.state.first_name;
    var lastName = this.state.last_name;
    var gender = this.refs.gender.getValue();
    var workingForCompany = this.refs.working_for_company.getValue();
    var economicActivityId = this.refs.economic_activity_id.getValue();
    var homePhoneNumber = this.state.home_phone_number;
    var personalPhoneNumber = this.state.personal_phone_number;

    var currentAddressProvince = this.state.current_address_province;
    var currentAddressDistrict = this.state.current_address_district;
    var currentAddressCommune = this.state.current_address_commune;
    var currentAddressVillage = this.state.current_address_village;
    var currentAddressDetail = this.state.current_address_detail;

    var companyName = this.state.company_name;


    let values = {
      firstName:firstName,
      lastName:lastName,
      gender:gender,
      workingForCompany:workingForCompany,
      economicActivityId:economicActivityId,
      homePhoneNumber:homePhoneNumber,
      personalPhoneNumber:personalPhoneNumber,
      currentAddressProvince:currentAddressProvince,
      currentAddressDistrict:currentAddressDistrict,
      currentAddressCommune:currentAddressCommune,
      currentAddressVillage:currentAddressVillage,
      currentAddressDetail:currentAddressDetail,
      companyName:companyName,
    };

    if (!firstName || !lastName || !gender || !workingForCompany || !economicActivityId) {
      return;
    }

    this.props.handleSubmit(values)
  }




  nextHandleStep(e) {
    var stepOne = React.findDOMNode(this.refs.stepOne);
    var stepTwo = React.findDOMNode(this.refs.stepTwo);
    var stepThree = React.findDOMNode(this.refs.stepThree);
    var nextBtns = React.findDOMNode(this.refs.nextBtns);
    var backBtns = React.findDOMNode(this.refs.backBtns);

    if (stepOne.className == 'current') {
      stepOne.className = '';
      stepTwo.className = 'current';
      backBtns.className = 'btn ' + 'btn-large ' + 'blue ' + 'waves-effect ' + 'darken-2';
    } else if(stepTwo.className == 'current') {
      stepTwo.className = '';
      stepThree.className = 'current';
      nextBtns.className = 'btn ' + 'btn-large ' + 'blue ' + 'darken-2 ' + 'disabled';
    }
  }

  backHandleStep(e) {
    var stepOne = React.findDOMNode(this.refs.stepOne);
    var stepTwo = React.findDOMNode(this.refs.stepTwo);
    var stepThree = React.findDOMNode(this.refs.stepThree);
    var nextBtns = React.findDOMNode(this.refs.nextBtns);
    var backBtns = React.findDOMNode(this.refs.backBtns);

    if (stepTwo.className == 'current') {
      stepOne.className = 'current';
      stepTwo.className = '';
      backBtns.className = 'btn ' + 'btn-large ' + 'blue ' + 'darken-2 ' + 'disabled';
    } else if(stepThree.className == 'current') {
      stepTwo.className = 'current';
      stepThree.className = '';
      nextBtns.className = 'btn ' + 'btn-large ' + 'blue ' + 'waves-effect ' + 'darken-2';
    }
  }


  componentWillMount(){
    const { dispatch } = this.props;
    const areaSettingActions = bindActionCreators(AreaSettingActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    economicActivityActions.getEconomicActivities();
    idPaperActions.getIdPapers();
    areaSettingActions.getAreaSettings();
    this.setDefaultStates(this.props,this.state);
 }

 componentWillReceiveProps(nextProps,nextState){
   this.setDefaultStates(nextProps,nextState);
 }


 setDefaultStates(nextProps,nextState){
   let self = this;
   let customer = nextProps.potential_customer;
   if(customer != null){
     Object.keys(customer).forEach(function (element, index) {
       if(self.state[element] == null){
         let obj = {};
         obj[element] = customer[element]
         self.setState(obj);
       }
     });
   }


 }


  handleOnCheckBt(e,checked) {
    this.setState({selectBt: checked});
    this.setState({checkedBt: checked});
  }

  onChangeSelectValue(e) {
    this.setState({selectValue: e.target.value});
    this.setState({selectPurpose: e.target.value});
  }

  getStyles() {
    return {
      headlines: {
        backgroundColor: '#e9e9e9',
        color: '#333'
      }
    };
  }

  onChangeCurrentAddress(address){
    var map = {current_address_province: address.province,current_address_district: address.district,current_address_commune: address.commune,current_address_village: address.village,current_address_detail: address.address };
    this.setState(map);
  }

  onChangeCompanyAddress(address){
    var map = {company_address_province: address.province,company_address_district: address.district,company_address_commune: address.commune,company_address_village: address.village,company_address_detail: address.address };
    this.setState(map);
  }

  onChangeBirthAddress(address){
    var map = {birth_address_province: address.province,birth_address_district: address.district,birth_address_commune: address.commune,birth_address_village: address.village,birth_address_detail: address.address };
    this.setState(map);
  }

  onChangeGender(gender){
    this.setState({gender: gender});
  }

  onChangeIdPaper(idPaperId){
    this.setState({id_paper_id: idPaperId});
  }

  onChangeWorkingForCompany(workingForCompany){
    this.setState({working_for_company: workingForCompany});
  }
  onChangeEconomicActivity(economicActivityId){
    this.setState({economic_activity_id: economicActivityId});
  }

  onChangeWorkingYears(year,month){
    this.setState({working_years: year, working_months: month});
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {
    let customers = this.props.customers || {};

    let errorsNode = this.getErrorNodes(customers.errors);

    let self = this;

    let company = (<div></div>);

    if(this.state.working_for_company == YES ){
      company = (
        <div>
          <div className="companyWrap">
            <h5 className="titlesM">Company</h5>

            <div className="area">
              <div className="item1">name</div>
              <div className="item2">
                <input onChange={this.onChangeValue} value={this.state.company_name}   ref="company_name"  id="company_name" type="text" className="validate fieldsWidth" />
              </div>
            </div>

          </div>
        </div>
      );
    }


    let birthday = new Date();
    if(this.state.birthday){
      birthday = new Date(this.state.birthday);
    }

    let idDate = new Date();
    if(this.state.id_date){
      idDate = new Date(this.state.id_date);
    }

    let customer = this.props.potential_customer || {}
    let user = customer.user || {};
    let organization = customer.organization || {}

    let buttonLabel = "Save"
    let title = "Add Potential client"
    let info = (<div></div>)
    if(customer.id){
      buttonLabel = "Update"
      title = "Edit potential client"
      info = (
        <div>
          <div className="area">
            <div className="item1">Client No.</div>
            <div className="item2" ref="client_no" id="client_no">
              {this.state.client_no}
            </div>
          </div>

          <div className="area">
            <div className="item1">CO Name</div>
            <div className="item2" ref="co_name" id="co_name">
              {`${user.first_name} ${user.last_name}`}
            </div>
          </div>

          <div className="area">
            <div className="item1">Branch</div>
            <div className="item2" ref="branch" id="branch">
              {organization.name}
            </div>
          </div>
        </div>
      )
    }


    return (
      <section className="cutmerFormView">

        <div className="panel-heading">
          <div><i className="material-icons">add</i></div>
          <div><strong>{title}</strong></div>
        </div>
        <div>
              <div className="tabsOnes row">
                <h5 className="titlesM">Basic</h5>
                {info}
                <div className="area">
                  <div className="item1">First Name</div>
                  <div className="item2">
                    <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  value={this.state.first_name} ref="first_name"  id="first_name" type="text" className="validate fieldsWidth" />
                  </div>
                </div>

                <div className="area">
                  <div className="item1">Last Name</div>
                  <div className="item2">
                    <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.last_name}  ref="last_name"  id="last_name" type="text" className="validate fieldsWidth" />
                  </div>
                </div>

                <GenderSelectView onChange={this.onChangeGender} value={this.state.gender} ref="gender" />

                  <div className="area">
                    <div className="item1">Economic Activity</div>
                    <div className="item2">
                      <EconomicActivitySelectView onChange={this.onChangeEconomicActivity} value={this.state.economic_activity_id} economic_activities={this.props.economicActivities.economicActivities} ref="economic_activity_id" />
                      </div>
                    </div>


                <WorkingForCompanySelectView onChange={this.onChangeWorkingForCompany} value={this.state.working_for_company} id="working_for_company" ref="working_for_company" />

                {company}
                <h5 className="titlesM">Current Address</h5>
                <AddressHandler onChange={this.onChangeCurrentAddress} ref="current_address" area_master={this.props.area_settings.area_settings} province={this.state.current_address_province} district={this.state.current_address_district} commune={this.state.current_address_commune} village={this.state.current_address_village} address={this.state.current_address_detail}/>

                <div className="area">
                  <div className="item1">Home Phone No</div>
                  <div className="item2">
                    <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.home_phone_number}  ref="home_phone_number"  id="home_phone_number" type="text" className="validate fieldsWidth" />
                  </div>
                </div>

                <div className="area">
                  <div className="item1">Personal Phone No</div>
                  <div className="item2">
                    <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.personal_phone_number}  ref="personal_phone_number"  id="personal_phone_number" type="text" className="validate fieldsWidth" />
                  </div>
                </div>

              </div>
        </div>

        <form className="userForm col l12" onSubmit={this.handleSubmit} >
          <div className="submitBtn row">
            <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">{buttonLabel}
                <i className="mdi-content-send right"></i>
            </button>
          </div>
        </form>

      </section>

    );
  }
}

export default PotentialCustomerFormView;
