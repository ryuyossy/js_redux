import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';

import AreaSettingListView from './AreaSettingListView';

import AreaSettingFormView from './AreaSettingFormView';

import * as AreaSettingActions from '../actions/AreaSettingActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


@connect(state => (
{
  area_settings: state.areaSettings
}
))
class AreaSettingHandler extends BaseComponent {

  static async willTransitionTo(transition, params){
    if(await (BaseComponent.isLoggedIn()) == false){
      transition.redirect("login_page");
      return
    }
  }

  async componentDidMount(){
    const { area_settings, dispatch } = this.props;
    const actions = bindActionCreators(AreaSettingActions, dispatch);
    actions.getAreaSettingsCount();
    return;
  }

  constructor(props,context) {
    super(props,context);
  }

  render() {
    const { area_settings, dispatch } = this.props;
    let actions = bindActionCreators(AreaSettingActions, dispatch);
    let count = this.props.area_settings.count;
    if(count == null){
      count = 0;
    }


    return (
      <div className="areaSettingBox">
        <h3>Area Configuration</h3>
        <p>{count} records stored</p>
        <AreaSettingFormView uploadCsvFile={actions.uploadCsvFile}/>
      </div>
    );
  }

}


export default AreaSettingHandler;
