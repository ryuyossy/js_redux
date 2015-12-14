import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoanContractCollateralActions from '../actions/LoanContractCollateralActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';
import * as IdPaperActions from '../actions/IdPaperActions';
import * as CollateralActions from '../actions/CollateralActions';

import AddressHandler from './AddressHandler';
import GenderSelectView from './GenderSelectView';
import IdPaperSelectView from './IdPaperSelectView';
import OwnerSelectView from './OwnerSelectView';
import LoanContractCollateralInputView from './LoanContractCollateralInputView';


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'

import {OWNER_OTHERS,OWNER_BORROWER,YES,NO,GENDER_MALE} from "../constants/Constants.js"
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanContractCollaterals: state.loanContractCollaterals,
  area_settings: state.areaSettings,
  id_papers: state.idPapers,
  collaterals: state.collaterals,
  economicActivities: state.economicActivities
}
))
@ReactMixin.decorate(History)
class LoanContractCollateralFormView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  onChangeCurrentAddress(address){
    var map = {province: address.province,district: address.district,commune: address.commune,village: address.village,address_detail: address.address };
    this.setState(map);
  }

  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCurrentAddress = this.onChangeCurrentAddress.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeIdPaper = this.onChangeIdPaper.bind(this);
    this.onChangeCollateral = this.onChangeCollateral.bind(this);

  }

  onChangeGender(gender){
    this.setState({gender: gender});
  }

  onChangeCollateral(collateralId,values){

    if(values == null){
      this.setState({collateral_id: collateralId, collateral_values: null});
    }else{
      if(this.state.collateral_values != null){
        let tmpValues = this.state.collateral_values;
        let found = false;
        this.state.collateral_values.forEach(function(element,index){
          if(element.id == values.id){
            found = true;
            tmpValues[index].value = values.value;
          }
        });
        if(found == false){
          tmpValues.push(values);
        }
        this.setState({collateral_id: collateralId,collateral_values: tmpValues});
      }else{
        this.setState({collateral_id: collateralId, collateral_values: [values] });
      }
    }
  }

  onChangeOwner(owner){
    this.setState({owner: owner});
  }

  onChangeIdPaper(idPaperId){
    this.setState({id_paper_id: idPaperId});
  }



  setDefaultStates(nextProps,nextState){
    this.setState({owner: OWNER_BORROWER, gender: GENDER_MALE})
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.loanContractCollaterals.isLoanContractCollateralUpdated == true){
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null)
    }
    this.setDefaultStates(nextProps,nextState);
  }

  componentWillMount(){
    const { dispatch } = this.props;
    const areaSettingActions = bindActionCreators(AreaSettingActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const collateralActions = bindActionCreators(CollateralActions, dispatch);
    idPaperActions.getIdPapers();
    areaSettingActions.getAreaSettings();
    collateralActions.getCollaterals();
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

    var owner = this.state.owner;
    var price = this.state.price;
    var collateralId = this.state.collateral_id;
    var relationshipWithBorrower = this.state.relationship_with_borrower;
    var firstName = this.state.first_name;
    var lastName = this.state.last_name;
    var gender = null;
    if(this.refs.gender){
      gender = this.refs.gender.getValue();
    }

    var birthday = null
    if(this.refs.birthday){
      birthday = this.refs.birthday.getDate();
      birthday = formatDate(birthday);
    }

    var idPaperId = null;
    if(this.refs.id_paper_id){
      idPaperId = this.refs.id_paper_id.getValue();
    }

    var idNo = this.state.id_no;
    var idDate = null;
    if(this.refs.id_date){
      idDate = this.refs.id_date.getDate();
      idDate = formatDate(idDate);
    }


    var homePhoneNumber = this.state.home_phone_number;
    var personalPhoneNumber = this.state.personal_phone_number;

    var province = this.state.province;
    var district = this.state.district;
    var commune = this.state.commune;
    var village = this.state.village;
    var addressDetail = this.state.address_detail;
    let collateralTypeIds = [];
    let collateralValues = [];
    let obj = {}
    if(this.state.collateral_values){
      this.state.collateral_values.forEach(function(element, index){
        obj[`collateralTypeIds[${index}]`] = element.id;
        obj[`collateralValues[${index}]`] = element.value;
        collateralTypeIds.push(element.id);
        collateralValues.push(element.value);
      });
    }


    let values = {
      owner: owner,
      price: price,
      collateralId: collateralId,
      "collateralTypeIds":collateralTypeIds,
      "collateralValues":collateralValues,
      relationshipWithBorrower: relationshipWithBorrower,
      firstName:firstName,
      lastName:lastName,
      gender:gender,
      birthday:birthday,
      idPaperId:idPaperId,
      idNo:idNo,
      idDate:idDate,
      homePhoneNumber:homePhoneNumber,
      personalPhoneNumber:personalPhoneNumber,
      addressProvince:province,
      addressDistrict:district,
      addressCommune:commune,
      addressVillage:village,
      addressDetail:addressDetail
    };

    if(!owner || !price){
      return
    }

    const { loanContractCollaterals, dispatch } = this.props;
    const loanContractCollateralActions = bindActionCreators(LoanContractCollateralActions, dispatch);
    loanContractCollateralActions.createLoanContractCollateral(this.props.params.customer_id,this.props.params.loan_contract_id,values);
  }

  handleKeyDown(e){
    if(e.which == 13){ //enter

      this.submitForm();

    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.loanContractCollaterals.errors);

    let self = this;

    let ownerInformation = (<div></div>);

    if(this.state.owner == OWNER_OTHERS ){
      ownerInformation = (
        <div>
          <h5>Owner basic information</h5>

          <div className="row">
             <div className="input-field col s6" >
               <label className="" htmlFor="type">Relationship with borrower</label>
               <input ref="name" value={this.state.relationship_with_borrower} onChange={this.onChangeValue} id="relationship_with_borrower" type="text" className="validate" />
             </div>
          </div>


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
                <label className="active" htmlFor="id_picture">ID Picture (You can edit ID Picture after adding LoanContractCollateral)</label>
            </div>
          </div>

        <h5>Owner address</h5>
        <AddressHandler onChange={this.onChangeCurrentAddress} ref="address" area_master={this.props.area_settings.area_settings} province={this.state.province} district={this.state.district} commune={this.state.commune} village={this.state.village} address={this.state.address_detail}/>
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

        </div>
      );
    }


    return (


      <div>
        <button onClick={this.handleClose.bind(this)} >
          Back to Loan contract
        </button>

        <LoanContractCollateralInputView onChange={this.onChangeCollateral} collateral_id={this.state.collateral_id} collaterals={this.props.collaterals.collaterals} ref="collateral" />

        <div className="row">
           <div className="input-field col s10" >
             <label className="" htmlFor="type">Price</label>
             <input ref="name" value={this.state.price} onChange={this.onChangeValue} id="price" type="text" className="validate" />
           </div>
        </div>

        <OwnerSelectView onChange={this.onChangeOwner} value={this.state.owner} ref="owner" />

        {ownerInformation}

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

export default LoanContractCollateralFormView;
