import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import * as GuarantorActions from '../actions/GuarantorActions';
import * as FundingLineActions from '../actions/FundingLineActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {formatDate} from '../utils/utils'
import { Link } from 'react-router';

import ReactMixin from 'react-mixin';

import {GENDER_MAP_FOR_LABEL, YES_OR_NO_MAP_FOR_LABEL, YES} from "../constants/Constants.js"


@connect(state => (
{
  guarantor: state.guarantors,
  loanProduct: state.loanProducts
}
))
@ReactMixin.decorate(History)
class GuarantorDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleKeyDown(e){
    let key = e.which | e.keyCode;



    if(key == 13){ //enter

      var id = this.props.guarantor.guarantor.id;
      var name = this.state.name


      if (!name) {
        return;
      }
      let values = {
        name: name
      };

      const { guarantor, dispatch } = this.props;
      const actions = bindActionCreators(GuarantorActions, dispatch);

      actions.updateGuarantor(id,values);

    }else if(key == 27){ //esc
    }
  }


  handleClose(e){
    this.props.history.replaceState(null, `/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`, null);
  }
  handleEdit(e){
    this.props.history.replaceState(null, `/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}/edit`, null);
  }


   componentWillMount(){
     const { guarantor, dispatch } = this.props;
     const guarantorActions = bindActionCreators(GuarantorActions, dispatch);
     guarantorActions.getGuarantorDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    let guarantor = nextProps.guarantor.guarantor;
    let self = this;
    Object.keys(guarantor).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = guarantor[element]
        self.setState(obj);
      }
    });

    if(nextProps.guarantor.isGuarantorUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { guarantor,loanProduct, dispatch } = this.props;
    let guarantorDetail = guarantor.guarantor;
    let errorsNode = this.getErrorNodes(this.props.guarantor.guarantorErrors);
    let messageView = this.getMessageView("Guarantors updated!","message");


    let birthday = new Date(guarantorDetail.birthday);
    birthday = formatDate(birthday);

    let idDate = new Date(guarantorDetail.id_date);
    idDate = formatDate(idDate);

    if(Object.keys(guarantorDetail).length == 0){
      return <div></div>
    }

    let company = <div></div>;

    if(guarantorDetail.working_for_company == YES){
      company = (
        <div>
          <div className="row">
             <div className="col s10">
               <h5>Company Province</h5>
               <p>{guarantorDetail.company_address_province_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Company District</h5>
               <p>{guarantorDetail.company_address_district_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Company Commune</h5>
               <p>{guarantorDetail.company_address_commune_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Company Village</h5>
               <p>{guarantorDetail.company_address_village_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Company Address detail</h5>
               <p>{guarantorDetail.company_address_detail}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Company phone number</h5>
               <p>{guarantorDetail.company_phone_number}</p>
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

        <h4>Guarantor</h4>

        <div className="row">
           <div className="col s10">
             <h5>First name</h5>
             <p>{guarantorDetail.first_name}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Last name</h5>
             <p>{guarantorDetail.first_name}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Gender</h5>
             <p>{GENDER_MAP_FOR_LABEL[guarantorDetail.gender]}</p>
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
             <p>{guarantorDetail.id_paper.value}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>ID No.</h5>
             <p>{guarantorDetail.id_no}</p>
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
            <a target="_blank" href={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}/idPicture/idPicture.jpg?width=2000&height=2000&random=${Math.random() * 200}`}>
             <img src={`/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/guarantors/${this.props.params.id}/idPicture/idPicture.jpg?random=${Math.random() * 200}`} />
            </a>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>ID paper</h5>
             <p>{guarantorDetail.id_paper.value}</p>
           </div>
        </div>



        <div className="row">
           <div className="col s10">
             <h5>Working for company</h5>
             <p>{YES_OR_NO_MAP_FOR_LABEL[guarantorDetail.working_for_company]}</p>
           </div>
        </div>


        <div className="row">
           <div className="col s10">
             <h5>Economic Activityy</h5>
             <p>{guarantorDetail.economic_activity.value}</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Working Years</h5>
             <p>{guarantorDetail.working_years} years {guarantorDetail.working_months} months</p>
           </div>
        </div>

        <div className="row">
           <div className="col s10">
             <h5>Monthly income</h5>
             <p>{guarantorDetail.monthly_income}</p>
           </div>
        </div>


          <div className="row">
             <div className="col s10">
               <h5>Current Province</h5>
               <p>{guarantorDetail.current_address_province_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Current District</h5>
               <p>{guarantorDetail.current_address_district_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Current Commune</h5>
               <p>{guarantorDetail.current_address_commune_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Current Village</h5>
               <p>{guarantorDetail.current_address_village_label}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Current Address detail</h5>
               <p>{guarantorDetail.current_address_detail}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Home phone number</h5>
               <p>{guarantorDetail.home_phone_number}</p>
             </div>
          </div>

          <div className="row">
             <div className="col s10">
               <h5>Personal phone number</h5>
               <p>{guarantorDetail.personal_phone_number}</p>
             </div>
          </div>

          {company}


            <div className="row">
               <div className="col s10">
                 <h5>Guarantee amount</h5>
                 <p>{guarantorDetail.guarantee_amount}</p>
               </div>
            </div>


        {messageView}

        {errorsNode}


      </div>

    );



  }

}


export default GuarantorDetailView;
