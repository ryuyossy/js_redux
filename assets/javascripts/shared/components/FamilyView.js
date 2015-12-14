import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import LoanContractHandler from './LoanContractHandler';

import * as CustomerActions from '../actions/CustomerActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';
import {formatDate} from '../utils/utils'

import {FAMILY_TYPE_MAP_FOR_LABEL,DEPENDENT_MAP_FOR_LABEL, YES_OR_NO_MAP_FOR_LABEL, YES} from "../constants/Constants.js"


@connect(state => (
{

}
))
@ReactMixin.decorate(History)
class FamilyView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
  }






  render() {
    let family = this.props.family;
    if(family == null){
      return (<span></span>)
    }
    let economicActivity = family.economic_activity || {}



    return (
        <div className="customer">

          <div className="grey lighten-5">
            <h5>Family #{this.props.index}</h5>

            <div className="row">
                  <div className="col s3">Type</div>
                  <div className="col s5">{FAMILY_TYPE_MAP_FOR_LABEL[family.family_type]}</div>
            </div>

            <div className="row">
                <div className="col s3">Age</div>
                <div className="col s5">{family.age}</div>
            </div>

            <div className="row">
                <div className="col s3">Economic Activity</div>
                <div className="col s5">{economicActivity.value}</div>
            </div>


            <div className="row">
                <div className="col s3">Dependent</div>
                <div className="col s5">{DEPENDENT_MAP_FOR_LABEL[family.dependent]}</div>
            </div>



          </div>

        </div>
    );
  }

}


export default FamilyView;
