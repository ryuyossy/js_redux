import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as RepaymentActions from '../actions/RepaymentActions';
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
  repayments: state.repayments,
  area_settings: state.areaSettings,
  id_papers: state.idPapers,
  economicActivities: state.economicActivities
}
))
@ReactMixin.decorate(History)
class RepaymentEditView extends BaseComponent {


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
    let repaymentActions = bindActionCreators(RepaymentActions, dispatch);
    repaymentActions.uploadIdPicture(self.props.params.customer_id, self.props.params.loan_contract_id, self.props.params.id, file);

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
    let repayment = nextProps.repayments.repayment;

    Object.keys(repayment).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = repayment[element]
        self.setState(obj);
      }
    });

  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.repayments.isRepaymentUpdated == true){
      this.refs.message.show();
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/repayments/${this.props.params.id}`,null)
    }
    if(nextProps.repayments.isRepaymentIdPictureUpdated == true){
      this.refs.message_picture.show();
    }


    this.setDefaultStates(nextProps,nextState);
  }

  componentWillMount(){
    const { dispatch } = this.props;
    const areaSettingActions = bindActionCreators(AreaSettingActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    const repaymentActions = bindActionCreators(RepaymentActions, dispatch);
    economicActivityActions.getEconomicActivities();
    idPaperActions.getIdPapers();
    areaSettingActions.getAreaSettings();
    repaymentActions.getRepaymentDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);

    this.setDefaultStates(this.props,this.state);
 }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/repayments/${this.props.params.id}`,null)
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

    const { repayments, dispatch } = this.props;
    const repaymentActions = bindActionCreators(RepaymentActions, dispatch);
    repaymentActions.updateRepayment(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id,values);
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      this.submitForm();

    }else if(e.which == 27){ //esc

    }
  }


  render() {
    let messageView = this.getMessageView("Repayment updated!","message");

    let errorsNode = this.getErrorNodes(this.props.repayments.errors);
    let repayment = this.props.repayments.repayment;

    let self = this;


    return (


      <div>
        {messageView}
        <button onClick={this.handleClose.bind(this)} >
          Back to Loan contract
        </button>

        {errorsNode}
      </div>

    );
  }

}

export default RepaymentEditView;
