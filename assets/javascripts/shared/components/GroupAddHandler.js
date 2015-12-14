import React from 'react';
import { State, History } from 'react-router';
import BaseComponent from './BaseComponent';
import CustomerListView from './CustomerListView';
import GroupFormView from './GroupFormView';

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
class GroupAddHandler extends BaseComponent {

  constructor(props,context) {
    super(props,context);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.groups.isGroupUpdated == true){
      this.props.history.pushState(null, `/groups/${nextProps.groups.group.id}/edit`, null);
    }
  }



  componentWillMount(){
    const { customers, dispatch } = this.props;
 }

   handleSubmit(values){
     const { customers, dispatch } = this.props;
     const groupActions = bindActionCreators(GroupActions, dispatch);
     groupActions.createGroup(values);
   }


  render() {
    return (
      <div className="contentPanel">
        <div className="panel-heading">
          <div><i className="material-icons">note_add</i></div>
          <div><strong>Add Group</strong></div>
        </div>
        <GroupFormView handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default GroupAddHandler;
