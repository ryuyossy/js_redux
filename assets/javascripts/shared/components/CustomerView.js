import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';

import {STATUS_CUSTOMER, STATUS_POTENTIAL_CUSTOMER} from "../constants/Constants.js"


class CustomerView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleAddToGroup = this.handleAddToGroup.bind(this);
    this.handleRemoveFromGroup = this.handleRemoveFromGroup.bind(this);
  }

  handleAddToGroup(e){
    this.props.handleAddToGroup(this.props.customer.id)
  }

  handleRemoveFromGroup(e){
    this.props.handleRemoveFromGroup(this.props.customer.group_member_id)
  }


  componentWillReceiveProps(nextProps){

  }

  render() {

    let user = this.props.customer.user || {};
    let organization = this.props.customer.organization || {};
    let customer = this.props.customer
    let url = "";
    if(customer.status == STATUS_CUSTOMER){
      url = `/customers/${this.props.customer.id}`;
    }else{
      url = `/potential_customers/${this.props.customer.id}`;
    }
    let node = (
      <div className="row">
        <div className="column" data-label="Client No">
          <Link to={url}  >
            {this.props.customer.client_no}
          </Link>
        </div>
        <div className="column" data-label="First name">
          <Link to={url}  >
            {this.props.customer.first_name}
          </Link>
        </div>
        <div className="column" data-label="Last name">
          <Link to={url}  >
            {this.props.customer.last_name}
          </Link>
        </div>
        <div className="column" data-label="CO Responsible">
          {`${user.first_name} ${user.last_name}`}
        </div>
        <div className="column" data-label="Branch">
          {organization.name}
        </div>
      </div>
    );

    if(this.props.search_for_group){
      node = (
        <div className="row">
          <div className="column" data-label="Client No">
              {this.props.customer.client_no}
          </div>
          <div className="column" data-label="First name">
              {this.props.customer.first_name}
          </div>
          <div className="column" data-label="Last name">
              {this.props.customer.last_name}
          </div>
          <div className="column" data-label="CO Responsible">
            {`${user.first_name} ${user.last_name}`}
          </div>
          <div className="column" data-label="Branch">
            {organization.name}
          </div>
          <div>
            <button className="btn waves-effect waves-light margin-top-20" type="button" name="action" onClick={this.handleAddToGroup}>Add</button>
          </div>
        </div>
        );
    }


    if(this.props.for_group_member){
      let extraColumn = (<div></div>)
      if(this.props.editable){
        extraColumn = (<div>
                    <button className="btn waves-effect waves-light margin-top-20" type="button" name="action" onClick={this.handleRemoveFromGroup}>Remove</button>
                  </div>)
      }
      node = (
        <div className="row">
          <div className="column" data-label="Client No">
              {this.props.customer.client_no}
          </div>
          <div className="column" data-label="First name">
              {this.props.customer.first_name}
          </div>
          <div className="column" data-label="Last name">
              {this.props.customer.last_name}
          </div>
          <div className="column" data-label="CO Responsible">
            {`${user.first_name} ${user.last_name}`}
          </div>
          <div className="column" data-label="Branch">
            {organization.name}
          </div>
          {extraColumn}
        </div>
        );
    }

    return node;
  }


}


export default CustomerView;
