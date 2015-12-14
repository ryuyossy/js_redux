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
let RaisedButton = mui.RaisedButton;

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
class GuarantorEditView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
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
    this.handleUploadImage = this.handleUploadImage.bind(this);

  }



  handleUploadImage(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    let self = this;

    let { dispatch } = this.props;
    let guarantorActions = bindActionCreators(GuarantorActions, dispatch);
    guarantorActions.uploadIdPicture(self.props.params.customer_id, self.props.params.loan_contract_id, self.props.params.id, file);

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

  setDefaultStates(nextProps,nextState){

    let self = this;
    let guarantor = nextProps.guarantors.guarantor;

    Object.keys(guarantor).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = guarantor[element]
        self.setState(obj);
      }
    });

  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.guarantors.isGuarantorUpdated == true){
      this.refs.message.show();
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}`,null)
    }
    if(nextProps.guarantors.isGuarantorIdPictureUpdated == true){
      this.refs.message_picture.show();
    }


    this.setDefaultStates(nextProps,nextState);
  }

  componentWillMount(){
    const { dispatch } = this.props;
    const areaSettingActions = bindActionCreators(AreaSettingActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    const guarantorActions = bindActionCreators(GuarantorActions, dispatch);
    economicActivityActions.getEconomicActivities();
    idPaperActions.getIdPapers();
    areaSettingActions.getAreaSettings();
    guarantorActions.getGuarantorDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);

    this.setDefaultStates(this.props,this.state);
 }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}`,null)
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
    var workingYear = this.state.working_years;
    var workingMonth = this.state.working_months;
    var monthlyIncome = this.state.monthly_income;
    var homePhoneNumber = this.state.home_phone_number;
    var personalPhoneNumber = this.state.personal_phone_number;

    var currentProvince = this.state.current_address_province;
    var currentDistrict = this.state.current_address_district;
    var currentCommune = this.state.current_address_commune;
    var currentVillage = this.state.current_address_village;
    var currentAddress = this.state.current_address_detail;

    var companyProvince = this.state.company_address_province;
    var companyDistrict = this.state.company_address_district;
    var companyCommune = this.state.company_address_commune;
    var companyVillage = this.state.company_address_village;
    var companyAddress = this.state.company_address_detail;

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
    guarantorActions.updateGuarantor(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id,values);
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      this.submitForm();

    }else if(e.which == 27){ //esc

    }
  }


  render() {
    let messageView = this.getMessageView("Guarantor updated!","message");
    let messageViewPicture = this.getMessageView("ID picture updated!","message_picture");

    let errorsNode = this.getErrorNodes(this.props.guarantors.errors);
    let guarantor = this.props.guarantors.guarantor;

    let self = this;

    let company = (<div></div>);

    if(this.state.working_for_company == YES ){
      company = (
        <div>
        <h5>Company address</h5>
          <div className="row">
            <div className="input-field col s6">
                <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.company_name}  ref="company_name"  id="company_name" type="text" className="validate" />
                <label className="active" htmlFor="company_name">Company name</label>
            </div>
          </div>

          <AddressHandler ref="company_address" onChange={this.onChangeCompanyAddress} area_master={this.props.area_settings.area_settings} province={this.state.company_address_province} district={this.state.company_address_district} commune={this.state.company_address_commune} village={this.state.company_address_village} address={this.state.company_address_detail}/>
        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.company_phone_number}  ref="company_phone_number"  id="company_phone_number" type="text" className="validate" />
              <label className="active" htmlFor="company_phone_number">Phone number</label>
          </div>
        </div>
        </div>
      );
    }

    let birthday = new Date(this.state.birthday);
    let idDate = new Date(this.state.id_date);


    return (


      <div>
        {messageView}
        {messageViewPicture}
        <button onClick={this.handleClose.bind(this)} >
          Back to Loan contract
        </button>

        <h5>Basic</h5>
        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.first_name}  ref="first_name"  id="first_name" type="text" className="validate" />
              <label className="active" htmlFor="first_name">First name</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.last_name} ref="last_name"  id="last_name" type="text" className="validate" />
              <label className="active" htmlFor="last_name">Last name</label>
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
              value={birthday}
              />
            <label className="active" htmlFor="birthday">Date of birth</label>
          </div>
        </div>

        <IdPaperSelectView onChange={this.onChangeIdPaper} value={this.state.id_paper_id} ref="id_paper_id" id_papers={this.props.id_papers.idPapers} />

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown} value={this.state.id_no}  ref="id_no"  id="id_no" type="text" className="validate" />
              <label className="active" htmlFor="id_no">ID No.</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <DatePicker
              hintText="ID date"
              mode="landscape"
              formatDate={formatDate}
              value={idDate}
              ref="id_date"
              />
            <label className="active" htmlFor="id_date">ID date</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <label className="active" htmlFor="id_picture">ID Picture</label>
              <a target="_blank" href={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}/idPicture/idPicture.jpg?width=2000&height=2000&random=${Math.random() * 200}`}>
                <img src={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}/idPicture/idPicture.jpg?random=${Math.random() * 200}`} />
              </a>
              <input type="file" ref="id_picture"  id="id_picture" onChange={this.handleUploadImage} />
          </div>
        </div>


        <WorkingForCompanySelectView onChange={this.onChangeWorkingForCompany} value={this.state.working_for_company} ref="working_for_company" />

        <EconomicActivitySelectView onChange={this.onChangeEconomicActivity} value={this.state.economic_activity_id} economic_activities={this.props.economicActivities.economicActivities} ref="economic_activity_id" />
        <WorkingYearsSelectView onChange={this.onChangeWorkingYears} year={this.state.working_years} month={this.state.working_months} ref="working_years" />

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} value={this.state.monthly_income} onKeyDown={this.handleKeyDown}  ref="monthly_income"  id="monthly_income" type="text" className="validate" />
              <label className="active" htmlFor="monthly_income">Monthly income</label>
          </div>
        </div>


        <h5>Current address</h5>
        <AddressHandler onChange={this.onChangeCurrentAddress} ref="current_address" area_master={this.props.area_settings.area_settings} province={this.state.current_address_province} district={this.state.current_address_district} commune={this.state.current_address_commune} village={this.state.current_address_village} address={this.state.current_address_detail}/>
        <div className="row">
          <div className="input-field col s6">
              <input value={this.state.home_phone_number} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="home_phone_number"  id="home_phone_number" type="text" className="validate" />
              <label className="active" htmlFor="home_phone_number">Home phone number</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} value={this.state.personal_phone_number} onKeyDown={this.handleKeyDown}  ref="personal_phone_number"  id="personal_phone_number" type="text" className="validate" />
              <label className="active" htmlFor="personal_phone_number">Personal phone number</label>
          </div>
        </div>

        {company}

        <div className="row">
          <div className="input-field col s6">
              <input onChange={this.onChangeValue} value={this.state.guarantee_amount} onKeyDown={this.handleKeyDown} defaultValue={this.props.location.query.amount} ref="guarantee_amount"  id="guarantee_amount" type="text" className="validate" />
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

export default GuarantorEditView;
