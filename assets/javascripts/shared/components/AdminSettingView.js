import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import ProvisioningRoleHandler from './ProvisioningRoleHandler';
import FundingLineHandler from './FundingLineHandler';
import {Link} from 'react-router';

import * as ProvisioningRoleActions from '../actions/ProvisioningRoleActions';
import * as FundingLineActions from '../actions/FundingLineActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => (
{
  provisioningRoles: state.provisioningRoles,
  fundingLines: state.fundingLines
}
))
class AdminSettingView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.state = {text_pressed: false}

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }


  componentWillMount(){
    const { provisioningRoles, dispatch } = this.props;
    const provisioningRoleActions = bindActionCreators(ProvisioningRoleActions, dispatch);
    const fundingLineActions = bindActionCreators(FundingLineActions, dispatch);
    provisioningRoleActions.getProvisioningRoles();
    fundingLineActions.getFundingLines();
    return;
  }

  handleEdit(e){
    this.setState({text_pressed : true});
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      let val = React.findDOMNode(this.refs.setting_value).value.trim();
      this.props.updateSetting(this.props.setting.id,val);
      this.setState({text_pressed : false});
    }else if(e.which == 27){ //esc
      this.setState({text_pressed : false });
    }
  }

  getStyleInputStyle(){
    if(this.state.text_pressed){
      return this.styles().display_style;
    }else{
      return this.styles().hide_style;
    }
  }

  getH2Style(){
    if(this.state.text_pressed){
      return this.styles().hide_style;
    }else{
      return this.styles().display_style;
    }
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    const { provisioningRoles,fundingLines,roles, dispatch } = this.props;
    let provisioningRoleActions = bindActionCreators(ProvisioningRoleActions, dispatch);
    let fundingLineActions = bindActionCreators(FundingLineActions, dispatch);

    return (
      <div className="adminSetting">
        <div className="panel-heading">
          <div><i className="material-icons">settings</i></div>
          <div><strong>admin setting</strong></div>
        </div>
        <div className="adminSetBox">

          <div className="rolesLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Provisioning Roles</strong></div>
            </div>
            <ProvisioningRoleHandler actions={provisioningRoleActions} provisioningRoles={provisioningRoles} />
          </div>

          <div className="fundingLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Funding Lines</strong></div>
            </div>
            <FundingLineHandler actions={fundingLineActions} fundingLines={fundingLines} />
          </div>

          <div className="row">
            <div className="col s6">
              
              <Link to="/users" >
                <button className="btn waves-effect waves-light" type="submit" name="action">
                  User management
                </button>
              </Link>

            </div>
          </div>

        </div>
      </div>
    );
  }


}


export default AdminSettingView;
