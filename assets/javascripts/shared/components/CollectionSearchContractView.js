import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';

import {formatDate} from '../utils/utils'



class CollectionSearchContractView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleToDetail = this.handleToDetail.bind(this);
  }

  handleToDetail(e){
    this.props.handleToDetail(this.props.group.id)
  }


  componentWillReceiveProps(nextProps){

  }

  render() {

    let collection = this.props.collection || {}
    let url = `/customers/${this.props.customer_id}/loanContracts/${this.props.loan_contract_id}/collections`;
    let disbursementDate = new Date(collection.disbursement_date);
    disbursementDate =  formatDate(disbursementDate)
    let node = (
      <div className="row">
        <div className="column" data-label="Loan Contract No">
          <Link to={url}  >
            {collection.loan_contract_no}
          </Link>
        </div>

        <div className="column" data-label="Status">
          <Link to={url}  >
            {collection.status}
          </Link>
        </div>
        <div className="column" data-label="Disbursement Date">
          <Link to={url}  >
            {disbursementDate}
          </Link>
        </div>
        <div className="column" data-label="Loan amount">
          <Link to={url}  >
            {collection.loan_amount}
          </Link>
        </div>

        <div className="column" data-label="First Name">
          <Link to={url}  >
            {collection.first_name}
          </Link>
        </div>

        <div className="column" data-label="Last Name">
          <Link to={url}  >
            {collection.last_name}
          </Link>
        </div>

        <div className="column" data-label="CO responsible">
          <Link to={url}  >
            {collection.co_responsible}
          </Link>
        </div>

        <div className="column" data-label="Branch">
          <Link to={url}  >
            {collection.organization_name}
          </Link>
        </div>

      </div>
    );


    return node;
  }


}


export default CollectionSearchContractView;
