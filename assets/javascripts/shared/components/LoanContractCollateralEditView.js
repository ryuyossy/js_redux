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
let RaisedButton = mui.RaisedButton;

import {formatDate} from '../utils/utils'

import {OWNER_OTHERS,OWNER_BORROWER,YES,NO,GENDER_MALE} from "../constants/Constants.js"
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanContractCollaterals: state.loanContractCollaterals,
  area_settings: state.areaSettings,
  id_papers: state.idPapers,
  collaterals: state.collaterals
}
))
@ReactMixin.decorate(History)
class LoanContractCollateralEditView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  onChangeCurrentAddress(address){
    var map = {address_province: address.province, address_district: address.district, address_commune: address.commune,address_village: address.village,address_detail: address.address };
    this.setState(map);
  }


  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCurrentAddress = this.onChangeCurrentAddress.bind(this);

    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeIdPaper = this.onChangeIdPaper.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.onChangeCollateral = this.onChangeCollateral.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);

  }


  onChangeOwner(owner){
    this.setState({owner: owner});
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


  handleUploadImage(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    let self = this;

    let { dispatch } = this.props;
    let loanContractCollateralActions = bindActionCreators(LoanContractCollateralActions, dispatch);
    loanContractCollateralActions.uploadIdPicture(self.props.params.customer_id, self.props.params.loan_contract_id, self.props.params.id, file);

  }



  onChangeGender(gender){
    this.setState({gender: gender});
  }

  onChangeIdPaper(idPaperId){
    this.setState({id_paper_id: idPaperId});
  }


  setDefaultStates(nextProps,nextState){

    let self = this;
    let loanContractCollateral = nextProps.loanContractCollaterals.loanContractCollateral;
    let collateralValues = [];
    if(loanContractCollateral.collateral && loanContractCollateral.collateral.collateral_types){
      loanContractCollateral.collateral.collateral_types.forEach(function(element,index){
        let v = element.loan_contract_collateral_value;
        let obj = {id: v.collateral_type_id, value: v.value, collateral_value_id: v.id};
        collateralValues.push(obj);
      });
      self.setState({collateral_values: collateralValues});
    }

    Object.keys(loanContractCollateral).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = loanContractCollateral[element]
        self.setState(obj);
      }
    });
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.loanContractCollaterals.isLoanContractCollateralUpdated == true){
      this.refs.message.show();
      this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}`,null)
    }
    if(nextProps.loanContractCollaterals.isLoanContractCollateralIdPictureUpdated == true){
      this.refs.message_picture.show();
    }

    this.setDefaultStates(nextProps,nextState);
  }

  componentWillMount(){
    const { dispatch } = this.props;
    const areaSettingActions = bindActionCreators(AreaSettingActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const loanContractCollateralActions = bindActionCreators(LoanContractCollateralActions, dispatch);
    const collateralActions = bindActionCreators(CollateralActions, dispatch);

    idPaperActions.getIdPapers();
    areaSettingActions.getAreaSettings();
    loanContractCollateralActions.getLoanContractCollateralDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);
    collateralActions.getCollaterals();

    this.setDefaultStates(this.props,this.state);
 }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }



  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}`,null)
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

    var province = this.state.address_province;
    var district = this.state.address_district;
    var commune = this.state.address_commune;
    var village = this.state.address_village;
    var addressDetail = this.state.address_detail;
    let collateralTypeIds = [];
    let collateralValues = [];
    let collateralValueIds = [];
    if(this.state.collateral_values){
      this.state.collateral_values.forEach(function(element, index){
        collateralTypeIds.push(element.id);
        collateralValues.push(element.value);
        collateralValueIds.push(element.collateral_value_id);
      });
    }


    let values = {
      owner: owner,
      price: price,
      collateralId: collateralId,
      "collateralTypeIds":collateralTypeIds,
      "collateralValues":collateralValues,
      "collateralValueIds":collateralValueIds,
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
    loanContractCollateralActions.updateLoanContractCollateral(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id,values);
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

      let errorsNode = this.getErrorNodes(this.props.loanContractCollaterals.errors);

      let self = this;

      let ownerInformation = (<div></div>);

      if(this.state.owner == OWNER_OTHERS ){
        let birthday = new Date(this.state.birthday);
        let idDate = new Date(this.state.id_date);

        ownerInformation = (
          <div>

            <h5>Owner basic information</h5>

            <div className="row">
               <div className="input-field col s6" >
                 <label className="active" htmlFor="type">Relationship with borrower</label>
                 <input ref="name" value={this.state.relationship_with_borrower} onChange={this.onChangeValue} id="relationship_with_borrower" type="text" className="validate" />
               </div>
            </div>


            <div className="row">
              <div className="input-field col s6">
                  <input value={this.state.first_name} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="first_name"  id="first_name" type="text" className="validate" />
                  <label className="active" htmlFor="first_name">First name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                  <input value={this.state.last_name} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="last_name"  id="last_name" type="text" className="validate" />
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
                  <input value={this.state.id_no} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="id_no"  id="id_no" type="text" className="validate" />
                  <label className="active" htmlFor="id_no">ID No.</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <DatePicker
                  hintText="ID date"
                  mode="landscape"
                  formatDate={formatDate}
                  ref="id_date"
                  value={idDate}
                  />
                <label className="active" htmlFor="id_date">ID date</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                  <label className="active" htmlFor="id_picture">ID Picture</label>
                  <a target="_blank" href={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}/idPicture/idPicture.jpg?width=2000&height=2000&random=${Math.random() * 200}`}>
                    <img src={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}/idPicture/idPicture.jpg?random=${Math.random() * 200}`} />
                  </a>
                  <input type="file" ref="id_picture"  id="id_picture" onChange={this.handleUploadImage} />
              </div>
            </div>

          <h5>Owner address</h5>
          <AddressHandler onChange={this.onChangeCurrentAddress} ref="address" area_master={this.props.area_settings.area_settings} province={this.state.address_province} district={this.state.address_district} commune={this.state.address_commune} village={this.state.address_village} address={this.state.address_detail}/>
          <div className="row">
            <div className="input-field col s6">
                <input value={this.state.home_phone_number} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="home_phone_number"  id="home_phone_number" type="text" className="validate" />
                <label className="active" htmlFor="home_phone_number">Home phone number</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
                <input value={this.state.personal_phone_number} onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="personal_phone_number"  id="personal_phone_number" type="text" className="validate" />
                <label className="active" htmlFor="personal_phone_number">Personal phone number</label>
            </div>
          </div>

          </div>
        );
      }


      return (
        <div>
          {messageView}
          {messageViewPicture}

          <button onClick={this.handleClose.bind(this)} >
            Back to Loan contract
          </button>

          <LoanContractCollateralInputView onChange={this.onChangeCollateral} collateral_id={this.state.collateral_id} collaterals={this.props.collaterals.collaterals} collateral_values={this.state.collateral_values} ref="collateral" />

          <div className="row">
             <div className="input-field col s10" >
               <label className="active" htmlFor="type">Price</label>
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

export default LoanContractCollateralEditView;
