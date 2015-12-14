import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GuarantorActions from '../actions/GuarantorActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';
import * as IdPaperActions from '../actions/IdPaperActions';
import * as EconomicActivityActions from '../actions/EconomicActivityActions';


import AddressHandler from './AddressHandler';
import GenderSelectView from './GenderSelectView';
import IdPaperSelectView from './IdPaperSelectView';
import WorkingForCompanySelectView from './WorkingForCompanySelectView';
import EconomicActivitySelectView from './EconomicActivitySelectView';
import WorkingYearsSelectView from './WorkingYearsSelectView';


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'

import {YES, NO} from "../constants/Constants.js"
import ReactMixin from 'react-mixin';


@connect(state => (
{
  guarantors: state.guarantors,
  area_settings: state.areaSettings,
  id_papers: state.idPapers,
  economicActivities: state.economicActivities
}
))
@ReactMixin.decorate(History)
class GuarantorFormView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  onChangeCurrentAddress(address){
    var map = {current_province: address.province,current_district: address.district,current_commune: address.commune,current_village: address.village,current_address: address.address };
    this.setState(map);
  }

  onChangeCompanyAddress(address){
    var map = {company_province: address.province,company_district: address.district,company_commune: address.commune,company_village: address.village,company_address: address.address };
    this.setState(map);
  }

  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCurrentAddress = this.onChangeCurrentAddress.bind(this);
    this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeIdPaper = this.onChangeIdPaper.bind(this);
    this.onChangeWorkingForCompany = this.onChangeWorkingForCompany.bind(this);
    this.onChangeEconomicActivity = this.onChangeEconomicActivity.bind(this);
    this.onChangeWorkingYears = this.onChangeWorkingYears.bind(this);

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
    this.setState({working_year: year, working_month: month});
  }

  setDefaultStates(nextProps,nextState){
    var guaranteeAmount = nextState.guarantee_amount || nextProps.location.query.amount;
    var workingForCompany = nextState.working_for_company || YES;

    this.setState({guarantee_amount: guaranteeAmount, working_for_company: workingForCompany});
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.guarantors.isGuarantorUpdated == true && nextProps.location.query && nextProps.location.query.defaultFlow){
      this.props.history.pushState(null, `/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals`, {defaultFlow: true});
    }else if(nextProps.guarantors.isGuarantorUpdated == true){
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null)
    }
    this.setDefaultStates(nextProps,nextState);
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

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null)
  }


  handleSubmit(e) {
    e.preventDefault();
    this.submitForm();
  }

  submitForm(){
    var firstName = this.state.first_name;
    var lastName = this.state.last_name;
    var gender = this.refs.gender.getValue();
    var birthday = this.refs.birthday.getDate();
    birthday = formatDate(birthday);
    var idPaperId = this.refs.id_paper_id.getValue();
    var idNo = this.state.id_no;
    var idDate = this.refs.id_date.getDate();
    idDate = formatDate(idDate);
    var workingForCompany = this.refs.working_for_company.getValue();
    var economicActivityId = this.refs.economic_activity_id.getValue();
    var workingYears = this.refs.working_years.getValue();
    var workingYear = workingYears.working_year;
    var workingMonth = workingYears.working_month;
    var monthlyIncome = this.state.monthly_income;
    var homePhoneNumber = this.state.home_phone_number;
    var personalPhoneNumber = this.state.personal_phone_number;

    var currentProvince = this.state.current_province;
    var currentDistrict = this.state.current_district;
    var currentCommune = this.state.current_commune;
    var currentVillage = this.state.current_village;
    var currentAddress = this.state.current_address;

    var companyProvince = this.state.company_province;
    var companyDistrict = this.state.company_district;
    var companyCommune = this.state.company_commune;
    var companyVillage = this.state.company_village;
    var companyAddress = this.state.company_address;
    var companyName = this.state.company_name;


    var companyPhoneNumber = this.state.company_phone_number;
    var guaranteeAmount = this.state.guarantee_amount;


    let values = {
      firstName:firstName,
      lastName:lastName,
      gender:gender,
      birthday:birthday,
      idPaperId:idPaperId,
      idNo:idNo,
      idDate:idDate,
      workingForCompany:workingForCompany,
      economicActivityId:economicActivityId,
      workingYears:workingYear,
      workingMonths:workingMonth,
      monthlyIncome:monthlyIncome,
      homePhoneNumber:homePhoneNumber,
      personalPhoneNumber:personalPhoneNumber,
      currentAddressProvince:currentProvince,
      currentAddressDistrict:currentDistrict,
      currentAddressCommune:currentCommune,
      currentAddressVillage:currentVillage,
      currentAddressDetail:currentAddress,
      companyName:companyName,
      companyAddressProvince:companyProvince,
      companyAddressDistrict:companyDistrict,
      companyAddressCommune:companyCommune,
      companyAddressVillage:companyVillage,
      companyAddressDetail:companyAddress,
      companyPhoneNumber:companyPhoneNumber,
      guaranteeAmount:guaranteeAmount
    };

    if (!firstName || !lastName || !gender || !birthday || !idPaperId || !idNo || !idDate || !workingForCompany || !economicActivityId || !workingYear || !workingMonth || !monthlyIncome) {
      return;
    }

    const { guarantors, dispatch } = this.props;
    const guarantorActions = bindActionCreators(GuarantorActions, dispatch);
    guarantorActions.createGuarantor(this.props.params.customer_id,this.props.params.loan_contract_id,values);
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      this.submitForm();

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.guarantors.errors);

    let self = this;

    let company = (<div></div>);

    if(this.state.working_for_company == YES ){
      company = (
        <div>
        <h5>Company address</h5>
          <div className="row">
            <div className="input-field col s6">
                <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="company_name"  id="company_name" type="text" className="validate" />
                <label className="" htmlFor="company_name">Company name</label>
            </div>
          </div>

          <AddressHandler ref="company_address" onChange={this.onChangeCompanyAddress} area_master={this.props.area_settings.area_settings} province={this.state.company_province} district={this.state.company_district} commune={this.state.company_commune} village={this.state.company_village} address={this.state.company_address}/>
        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="company_phone_number"  id="company_phone_number" type="text" className="validate" />
              <label className="" htmlFor="company_phone_number">Phone number</label>
          </div>
        </div>
        </div>
      );
    }


    return (


      <div>
        <button onClick={this.handleClose.bind(this)} >
          Back to Loan contract
        </button>

        <h5>Guarantor</h5>
        <h5>Basic</h5>
        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="first_name"  id="first_name" type="text" className="validate" />
              <label className="" htmlFor="first_name">First name</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="last_name"  id="last_name" type="text" className="validate" />
              <label className="" htmlFor="last_name">Last name</label>
          </div>
        </div>

        <GenderSelectView onChange={this.onChangeGender} value={this.state.gender} ref="gender" />

        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="Date of birth"
              mode="landscape"
              formatDate={formatDate}
              ref="birthday"
              />
            <label className="active" htmlFor="birthday">Date of birth</label>
          </div>
        </div>

        <IdPaperSelectView onChange={this.onChangeIdPaper} value={this.state.id_paper_id} ref="id_paper_id" id_papers={this.props.id_papers.idPapers} />

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="id_no"  id="id_no" type="text" className="validate" />
              <label className="" htmlFor="id_no">ID No.</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="ID date"
              mode="landscape"
              formatDate={formatDate}
              ref="id_date"
              />
            <label className="active" htmlFor="id_date">ID date</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input disabled="disabled" onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="id_picture"  id="id_picture" type="text" className="validate" />
              <label className="active" htmlFor="id_picture">ID Picture (You can edit ID Picture after adding Guarantor)</label>
          </div>
        </div>

        <WorkingForCompanySelectView onChange={this.onChangeWorkingForCompany} value={this.state.working_for_company} ref="working_for_company" />

        <EconomicActivitySelectView onChange={this.onChangeEconomicActivity} value={this.state.economic_activity_id} economic_activities={this.props.economicActivities.economicActivities} ref="economic_activity_id" />
        <WorkingYearsSelectView onChange={this.onChangeWorkingYears} year={this.state.working_year} month={this.state.working_month} ref="working_years" />

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="monthly_income"  id="monthly_income" type="text" className="validate" />
              <label className="" htmlFor="monthly_income">Monthly income</label>
          </div>
        </div>


        <h5>Current address</h5>
        <AddressHandler onChange={this.onChangeCurrentAddress} ref="current_address" area_master={this.props.area_settings.area_settings} province={this.state.current_province} district={this.state.current_district} commune={this.state.current_commune} village={this.state.current_village} address={this.state.current_address}/>
        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="home_phone_number"  id="home_phone_number" type="text" className="validate" />
              <label className="" htmlFor="home_phone_number">Home phone number</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="personal_phone_number"  id="personal_phone_number" type="text" className="validate" />
              <label className="" htmlFor="personal_phone_number">Personal phone number</label>
          </div>
        </div>

        {company}

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} defaultValue={this.props.location.query.amount} ref="guarantee_amount"  id="guarantee_amount" type="text" className="validate" />
              <label className="active" htmlFor="guarantee_amount">Guarantee amount</label>
          </div>
        </div>

        <div className="row">
          <button onClick={this.handleSubmit} className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="mdi-content-send right"></i>
          </button>
        </div>

        {errorsNode}
      </div>

    );
  }

}

export default GuarantorFormView;
