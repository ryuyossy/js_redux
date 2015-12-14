import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import CollectionSearchContractListView from './CollectionSearchContractListView';


import { bindActionCreators } from 'redux';
import * as CollectionActions from '../actions/CollectionActions';
import ReactMixin from 'react-mixin';
import { connect } from 'react-redux';

@connect(state => (
{
  collections: state.collections
}
))
@ReactMixin.decorate(History)

class CollectionSearchContractResultHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
  }


  componentWillMount(){
    const { customers, dispatch } = this.props;
    const collectionActions = bindActionCreators(CollectionActions, dispatch);
    collectionActions.searchLoanContract(this.props.location.query);
 }

 render() {
   return (
     <div className="contentPanel">
       <div className="panel-heading">
         <div><i className="material-icons">search</i></div>
         <div><strong>Group search result</strong></div>
       </div>
       <div className="bdc">
         <ol className="breadcrumb">
           <li ref="stepOne" className="current"><a href="#0">Search Group</a></li>
           <li ref="stepTwo"><a href="#0">View Group</a></li>
           <li ref="stepThree"><a href="#0">Edit Group</a></li>
         </ol>
       </div>
       <GroupListView groups={this.props.groups.groups} />
     </div>
   );
 }


  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">search</i></div>
          <div><strong>Search Contract</strong></div>
        </div>
        <div className="bdc">
          <ol className="breadcrumb">
            <li className="current" ref="stepOne"><a href="#0">Search Contract</a></li>
            <li ref="stepOne"><a href="#0">Search Contract</a></li>
          </ol>
        </div>

        <CollectionSearchContractListView collections={this.props.collections.collections} />

      </div>
    );
  }
}

export default CollectionSearchContractResultHandler;
