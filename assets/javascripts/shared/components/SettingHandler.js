import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';
import CompanySettingView from './CompanySettingView';
import AdminSettingView from './AdminSettingView';
import MFSettingView from './MFSettingView';

// import * as SettingActions from '../actions/SettingActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class SettingHandler extends BaseComponent {

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentDidMount(){
    return;
  }



  constructor(props,context) {
    super(props,context);
  }

  render() {
    return (
      <div className="systemBox">
        <h1>System Configuration</h1>
        <CompanySettingView />
        <AdminSettingView />
        <MFSettingView />
      </div>
    );
  }
}


export default SettingHandler;
