import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import LoanContractHandler from './LoanContractHandler';
import BorrowingSituationView from './BorrowingSituationView';
import FamilyView from './FamilyView';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';
import {formatDate} from '../utils/utils'

import {GENDER_MAP_FOR_LABEL, YES_OR_NO_MAP_FOR_LABEL, YES} from "../constants/Constants.js"
import { Link } from 'react-router';


@connect(state => (
{
  customer: state.customers
}
))
@ReactMixin.decorate(History)
class PotentialCustomerDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.onClickUpgrade = this.onClickUpgrade.bind(this);
  }

  onClickUpgrade(e){
    const { customer, dispatch } = this.props;
    const actions = bindActionCreators(CustomerActions, dispatch);
    actions.upgradeToCustomer(this.props.params.id);
  }

  handleClose(e){
    this.props.history.replaceState(null, `/potential_customers_search`, null);
  }

   componentWillMount(){
     const { customer, dispatch } = this.props;
     const actions = bindActionCreators(CustomerActions, dispatch);
     actions.getPotentialCustomerDetail(this.props.params.id);
  }

  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.customer.isPotentialCustomerUpgraded == true){
      this.props.history.pushState(null, `/customers/${nextProps.customer.potentialCustomer.id}/edit`, null);
    }
  }

  render() {
    let customer = this.props.customer.potentialCustomer;
    if(customer == null){
      return (<span></span>)
    }
    let user = customer.user || {}
    let organization = customer.organization || {}
    let economicActivity = customer.economic_activity || {}

    let idPaper = customer.id_paper || {}

    let birthday = new Date(customer.birthday);
    birthday = formatDate(birthday);

    let idDate = new Date(customer.id_date);
    idDate = formatDate(idDate);


    let borrowingSituations = customer.borrowing_situations || [];

    var borrowingSituationNodes = borrowingSituations.map(function(borrowingSituation, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <BorrowingSituationView key={borrowingSituation.id} borrowing_situation={borrowingSituation} id={borrowingSituation.id} index={index+1}  />
      );
    }) || (<div></div>);



    let company = <div></div>;

    if(customer.working_for_company == YES){
      company = (
        <div>

          <div className="row">
             <div className="col s3">Company name</div>
             <div className="col s5">{customer.company_name}</div>
          </div>

        </div>
      );
    }



    return (
        <div className="customer">
          <button onClick={this.handleClose} >
            Close
          </button>

          <div className="grey lighten-5">
            <h5>Potential client Info</h5>

              <Link className="waves-effect waves-light btn" to={`/potential_customers/${this.props.params.id}/edit`} >
                Edit Potential Customer
              </Link>

              <button onClick={this.onClickUpgrade} className="btn waves-effect waves-light" type="button" name="action">Upgrade to Client
                  <i className="mdi-content-send right"></i>
              </button>



            <div className="row">
                  <div className="col s3">Client No</div>
                  <div className="col s5">{customer.client_no}</div>
            </div>

            <div className="row">
                  <div className="col s3">Co Name</div>
                  <div className="col s5">{`${user.first_name} ${user.last_name}`}</div>
            </div>
            <div className="row">
                  <div className="col s3">Branch</div>
                  <div className="col s5">{`${organization.name}`}</div>
            </div>

            <div className="row">
                <div className="col s3">First Name</div>
                <div className="col s5">{customer.first_name}</div>
            </div>

            <div className="row">
                <div className="col s3">Last Name</div>
                <div className="col s5">{customer.last_name}</div>
            </div>

            <div className="row">
                <div className="col s3">Gender</div>
                <div className="col s5">{GENDER_MAP_FOR_LABEL[customer.gender]}</div>
            </div>


            <div className="row">
                <div className="col s3">Working for company?</div>
                <div className="col s5">{YES_OR_NO_MAP_FOR_LABEL[customer.working_for_company]}</div>
            </div>

            <div className="row">
                <div className="col s3">Economic activity</div>
                <div className="col s5">{economicActivity.value}</div>
            </div>



          {company}


          <div className="row">
             <div className="col s3">Current Province</div>
             <div className="col s5">{customer.current_address_province_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Current District</div>
             <div className="col s5">{customer.current_address_district_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Current Commune</div>
             <div className="col s5">{customer.current_address_commune_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Current Village</div>
             <div className="col s5">{customer.current_address_village_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Current Address detail</div>
             <div className="col s5">{customer.current_address_detail}</div>
          </div>

          <div className="row">
             <div className="col s3">Home Phone No</div>
             <div className="col s5">{customer.home_phone_number}</div>
          </div>


          <div className="row">
             <div className="col s3">Personal Phone No</div>
             <div className="col s5">{customer.personal_phone_number}</div>
          </div>





          {borrowingSituationNodes}



          </div>

        </div>
    );
  }

}


export default PotentialCustomerDetailView;
