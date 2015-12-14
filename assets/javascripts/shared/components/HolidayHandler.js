import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import HolidayFormView from './HolidayFormView';
import HolidayListView from './HolidayListView';
import BaseComponent from './BaseComponent';

import * as HolidayActions from '../actions/HolidayActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




@connect(state => (
{
  holidays: state.holidays
}
))
class HolidayHandler extends BaseComponent {


  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentWillMount(){
    const { holidays, dispatch } = this.props;
    const actions = bindActionCreators(HolidayActions, dispatch);
    actions.getHolidays();
    return;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.holidays.is_holiday_updated == true){
      this.refs.message.show();
    }
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { holidays, dispatch } = this.props;
    let actions = bindActionCreators(HolidayActions, dispatch);
    let messageView = this.getMessageView("Holidays updated!","message");

    return (
      <div className="holdiaysBox">
        <HolidayListView holidays={holidays.holidays} {...actions} holiday_errors={holidays.holiday_errors} />
        {messageView}
      </div>
    );
  }
}



export default HolidayHandler;
