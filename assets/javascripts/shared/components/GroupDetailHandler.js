import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import GroupFormView from './GroupFormView';
import BaseComponent from './BaseComponent';

import * as GroupActions from '../actions/GroupActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  groups: state.groups
}
))
@ReactMixin.decorate(History)
class GroupDetailHandler extends BaseComponent {


  static get contextTypes(){
  }

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { groups, dispatch } = this.props;
    const actions = bindActionCreators(GroupActions, dispatch);
    actions.getGroupDetail(this.props.params.id);
    return;
  }

  componentWillReceiveProps(nextProps,nextState){
    // if(nextProps.groups.isGroupUpdated == true){
    //   this.props.history.pushState(null, `/groups/${nextProps.groups.group.id}/borrowing_situations/edit`, {defaultFlow: true, potential: false});
    // }
  }

  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToEdit = this.handleToEdit.bind(this);
  }

  handleToEdit(id){
    this.props.history.pushState(null, `/groups/${id}/edit`, null);
  }

  handleSubmit(values){
    const { groups, dispatch } = this.props;
    const groupActions = bindActionCreators(GroupActions, dispatch);
    groupActions.updateGroup(this.props.params.id,values);
  }

  render() {
    const { groups, dispatch } = this.props;
    let group = groups.group;

    return (

      <div className="contentPanel">
        <div className="panel-heading">
          <div><strong>Group</strong></div>
          <GroupFormView handleToEdit={this.handleToEdit} editable={false} handleSubmit={this.handleSubmit} group={group}/>
        </div>
      </div>

    );
  }
}



export default GroupDetailHandler;
