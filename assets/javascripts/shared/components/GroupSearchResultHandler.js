import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import GroupListView from './GroupListView';

import { bindActionCreators } from 'redux';
import * as GroupActions from '../actions/GroupActions';
import ReactMixin from 'react-mixin';
import { connect } from 'react-redux';


@connect(state => (
{
  groups: state.groups
}
))
@ReactMixin.decorate(History)
class GroupSearchResultHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
  }

  componentWillMount(){
    const { customers, dispatch } = this.props;
    const customerActions = bindActionCreators(GroupActions, dispatch);
    customerActions.searchGroups(this.props.location.query);
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
}

export default GroupSearchResultHandler;
