import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import * as LoanContractCollateralActions from '../actions/LoanContractCollateralActions';
import * as FundingLineActions from '../actions/FundingLineActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {formatDate} from '../utils/utils'
import { Link } from 'react-router';

import {OWNER_OTHERS,OWNER_BORROWER,YES,NO,GENDER_MALE,GENDER_MAP_FOR_LABEL,OWNER_MAP_FOR_LABEL} from "../constants/Constants.js"
import ReactMixin from 'react-mixin';


@connect(state => (
{
  loanContractCollateral: state.loanContractCollaterals,
  loanProduct: state.loanProducts
}
))
@ReactMixin.decorate(History)
class LoanContractCollateralDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }




  handleClose(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`,null);
  }

  handleEdit(e){
    this.props.history.replaceState(null,`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}/edit`,null);
  }


   componentWillMount(){
     const { loanContractCollateral, dispatch } = this.props;
     const loanContractCollateralActions = bindActionCreators(LoanContractCollateralActions, dispatch);
     loanContractCollateralActions.getLoanContractCollateralDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    let loanContractCollateral = nextProps.loanContractCollateral.loanContractCollateral;
    let self = this;
    Object.keys(loanContractCollateral).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = loanContractCollateral[element]
        self.setState(obj);
      }
    });

    if(nextProps.loanContractCollateral.isLoanContractCollateralUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { loanContractCollateral,loanProduct, dispatch } = this.props;
    let loanContractCollateralDetail = loanContractCollateral.loanContractCollateral;
    let errorsNode = this.getErrorNodes(this.props.loanContractCollateral.loanContractCollateralErrors);
    let messageView = this.getMessageView("Collaterals updated!","message");


    let birthday = new Date(loanContractCollateralDetail.birthday);
    birthday = formatDate(birthday);

    let idDate = new Date(loanContractCollateralDetail.id_date);
    idDate = formatDate(idDate);

    if(Object.keys(loanContractCollateralDetail).length == 0){
      return <div></div>
    }

    var collateralValues = loanContractCollateralDetail.collateral.collateral_types.map(function(collateralType, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <div className="row" key={index}>
          <div className="col s10" >
          <h5>{collateralType.name}</h5>
          <p>{collateralType.loan_contract_collateral_value.value}</p>
          </div>
       </div>
      );
    });



    let ownerInformation = <div></div>;

    if(loanContractCollateralDetail.owner == OWNER_OTHERS){
      ownerInformation = (
        <div>

          <div className="row">
             <div className="col s10" >
               <h5>Relationship with borrower</h5>
               <p>
                 {loanContractCollateralDetail.relationship_with_borrower}
               </p>
             </div>
          </div>


          <div className="row">
             <div className="col s10" >
               <h5>First name</h5>
               <p>
                 {loanContractCollateralDetail.first_name}
               </p>
             </div>
          </div>


          <div className="row">
             <div className="col s10" >
               <h5>Last name</h5>
               <p>
                 {loanContractCollateralDetail.last_name}
               </p>
             </div>
          </div>


          <div className="row">
             <div className="col s10" >
               <h5>Gender</h5>
                 <p>{GENDER_MAP_FOR_LABEL[loanContractCollateralDetail.gender]}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Date of birth</h5>
               <p>{birthday}</p>
             </div>
          </div>


          <div className="row">
             <div className="col s10">
               <h5>ID Paper</h5>
               <p>{loanContractCollateralDetail.id_paper.value}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>ID No.</h5>
               <p>{loanContractCollateralDetail.id_no}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>ID date</h5>
               <p>{idDate}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>ID Picture</h5>
              <a target="_blank" href={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}/idPicture/idPicture.jpg?width=2000&height=2000&random=${Math.random() * 200}`}>
               <img src={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/collaterals/${this.props.params.id}/idPicture/idPicture.jpg?random=${Math.random() * 200}`} />
              </a>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>ID paper</h5>
               <p>{loanContractCollateralDetail.id_paper.value}</p>
             </div>
          </div>


          <h5>Owner address</h5>

          <div className="row">
             <div className="col s10">
               <h5>Province</h5>
               <p>{loanContractCollateralDetail.address_province_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>District</h5>
               <p>{loanContractCollateralDetail.address_district_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Commune</h5>
               <p>{loanContractCollateralDetail.address_commune_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Village</h5>
               <p>{loanContractCollateralDetail.address_village_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Address detail</h5>
               <p>{loanContractCollateralDetail.address_detail}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Home phone number</h5>
               <p>{loanContractCollateralDetail.home_phone_number}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Personal phone number</h5>
               <p>{loanContractCollateralDetail.personal_phone_number}</p>
             </div>
          </div>

        </div>
      );
    }

    return (


      <div>
        <button onClick={this.handleClose} >
          Back to Loan contract detail
        </button>

        <button onClick={this.handleEdit} >
          Edit
        </button>

        <h4>Collateral Detail</h4>

        <div className="row">
           <div className="col s10">
             <h5>Collateral Name</h5>
             <p>{loanContractCollateralDetail.collateral.name}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Price</h5>
             <p>{loanContractCollateralDetail.price}</p>
           </div>
        </div>
        {collateralValues}
        <div className="row">
           <div className="col s10">
             <h5>Owner</h5>
             <p>{OWNER_MAP_FOR_LABEL[loanContractCollateralDetail.owner]}</p>
           </div>
        </div>


        {ownerInformation}



        {messageView}

        {errorsNode}


      </div>

    );



  }

}


export default LoanContractCollateralDetailView;
