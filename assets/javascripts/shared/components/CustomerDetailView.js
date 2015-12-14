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
class CustomerDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
  }



  handleClose(e){
    this.props.history.replaceState(null, `/customers_search`, null);
  }

   componentWillMount(){
     const { customer, dispatch } = this.props;
     const actions = bindActionCreators(CustomerActions, dispatch);
     actions.getCustomerDetail(this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    // this.customer = this.customersStore.getCustomerById(this.props.params.id);
  }

  render() {
    let customer = this.props.customer.customer;
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

    let families = customer.families || [];

    let familyNodes = families.map(function(family, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <FamilyView key={family.id} family={family} id={family.id} index={index+1}  />
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

          <div className="row">
             <div className="col s3">Company Province</div>
             <div className="col s5">{customer.company_address_province_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Company District</div>
             <div className="col s5">{customer.company_address_district_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Company Commune</div>
             <div className="col s5">{customer.company_address_commune_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Company Village</div>
             <div className="col s5">{customer.company_address_village_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Company Address detail</div>
             <div className="col s5">{customer.company_address_detail}</div>
          </div>


          <div className="row">
             <div className="col s3">Company phone number</div>
             <div className="col s5">{customer.company_phone_number}</div>
          </div>


        </div>
      );
    }










    return (
        <div className="customer">
          <button onClick={this.handleClose} >
            Close
          </button>
          <LoanContractHandler customer_id={this.props.params.id} />

          <div className="grey lighten-5">
            <h5>Client Info</h5>

              <Link className="waves-effect waves-light btn" to={`/customers/${this.props.params.id}/edit`} >
                Edit Customer
              </Link>


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
                <div className="col s3">Date of birth</div>
                <div className="col s5">{birthday}</div>
            </div>

            <div className="row">
                <div className="col s3">ID paper</div>
                <div className="col s5">{idPaper.value}</div>
            </div>

            <div className="row">
                <div className="col s3">ID No.</div>
                <div className="col s5">{customer.id_no}</div>
            </div>


            <div className="row">
                <div className="col s3">ID Date</div>
                <div className="col s5">{idDate}</div>
            </div>

            <div className="row">
                <div className="col s3">ID Picture</div>
                <div className="col s5"></div>
            </div>

            <div className="row">
                <div className="col s3">Working for company?</div>
                <div className="col s5">{YES_OR_NO_MAP_FOR_LABEL[customer.working_for_company]}</div>
            </div>

            <div className="row">
                <div className="col s3">Economic activity</div>
                <div className="col s5">{economicActivity.value}</div>
            </div>

            <div className="row">
                <div className="col s3">Working years</div>
                <div className="col s5">{customer.working_years} years {customer.working_months} months</div>
            </div>

            <div className="row">
                <div className="col s3">Loan cycle</div>
                <div className="col s5"></div>
            </div>

            <div className="row">
                <div className="col s3">Face picture</div>
                <div className="col s5"></div>
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



          <div className="row">
             <div className="col s3">Birth Province</div>
             <div className="col s5">{customer.birth_address_province_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Birth District</div>
             <div className="col s5">{customer.birth_address_district_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Birth Commune</div>
             <div className="col s5">{customer.birth_address_commune_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Birth Village</div>
             <div className="col s5">{customer.birth_address_village_label}</div>
          </div>


          <div className="row">
             <div className="col s3">Birth Address detail</div>
             <div className="col s5">{customer.birth_address_detail}</div>
          </div>

          {borrowingSituationNodes}

          {familyNodes}



          </div>

        </div>
    );
  }

}


export default CustomerDetailView;
