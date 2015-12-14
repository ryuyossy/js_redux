import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import { Link } from 'react-router';

import EconomicActivityHandler from './EconomicActivityHandler';
import IdPaperHandler from './IdPaperHandler';
import LoanUsageHandler from './LoanUsageHandler';
import PotentialResponseHandler from './PotentialResponseHandler';
import PotentialReasonHandler from './PotentialReasonHandler';
import PotentialNextStepHandler from './PotentialNextStepHandler';
import MonitoringHandler from './MonitoringHandler';
import CollateralHandler from './CollateralHandler';

import WeekendsInInstallmentDaysSelectView from './WeekendsInInstallmentDaysSelectView';
import {WEEKENDS_IN_INSTALLMENT_DAYS_MASTER} from "../constants/Constants.js"


import * as MFSettingActions from '../actions/MFSettingActions';
import * as EconomicActivityActions from '../actions/EconomicActivityActions';
import * as IdPaperActions from '../actions/IdPaperActions';
import * as LoanUsageActions from '../actions/LoanUsageActions';
import * as PotentialResponseActions from '../actions/PotentialResponseActions';
import * as PotentialReasonActions from '../actions/PotentialReasonActions';
import * as PotentialNextStepActions from '../actions/PotentialNextStepActions';
import * as MonitoringActions from '../actions/MonitoringActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let Checkbox = mui.Checkbox;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

@connect(state => (
{
  mfSetting: state.mfSettings,
  economicActivities: state.economicActivities,
  idPapers: state.idPapers,
  loanUsages: state.loanUsages,
  potentialResponses: state.potentialResponses,
  potentialReasons: state.potentialReasons,
  potentialNextSteps: state.potentialNextSteps,
  monitorings: state.monitorings

}
))
class MFSettingView extends BaseComponent {


  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  constructor(props,context) {
    super(props,context);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onCheckIsRegistrationFeeRate = this.onCheckIsRegistrationFeeRate.bind(this);
    this.onCheckIsServiceChargeRate = this.onCheckIsServiceChargeRate.bind(this);
    this.onCheckIsloanManagementFeeRate = this.onCheckIsloanManagementFeeRate.bind(this);
    this.onChangeWeekendsInInstallmentDays = this.onChangeWeekendsInInstallmentDays.bind(this);

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  onChangeWeekendsInInstallmentDays(weekendsInInstallmentDays){
    this.setState({weekends_in_installment_days: weekendsInInstallmentDays});
  }

  onCheckIsRegistrationFeeRate(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.refs.isRegistrationFeeRate.setChecked(checked);
    this.setState(obj);
  }

  onCheckIsServiceChargeRate(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.refs.isServiceChargeRate.setChecked(checked);
    this.setState(obj);
  }

  onCheckIsloanManagementFeeRate(e,checked){
    let obj = {};
    obj[e.target.id] = checked;
    this.refs.isLoanManagementFeeRate.setChecked(checked);
    this.setState(obj);
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      var registrationFee = this.state.registrationFee
      var isRegistrationFeeRate = this.state.isRegistrationFeeRate
      var serviceCharge = this.state.serviceCharge;
      var isServiceChargeRate = this.state.isServiceChargeRate;
      var loanManagementFee = this.state.loanManagementFee;
      var isLoanManagementFeeRate = this.state.isLoanManagementFeeRate;
      var weekendsInInstallmentDays = this.refs.weekends_in_installment_days.getValue();
      var moratoriumDays = this.state.moratorium_days;
      let values = {
        registrationFee: registrationFee,
        isRegistrationFeeRate: isRegistrationFeeRate,
        serviceCharge: serviceCharge,
        isServiceChargeRate: isServiceChargeRate,
        loanManagementFee: loanManagementFee,
        isLoanManagementFeeRate: isLoanManagementFeeRate,
        weekendsInInstallmentDays: weekendsInInstallmentDays,
        moratoriumDays, moratoriumDays
      }

      const { mfSetting, dispatch } = this.props;
      const mfSettingActions = bindActionCreators(MFSettingActions, dispatch);
      mfSettingActions.updateMFSetting(values);

    }else if(e.which == 27){ //esc

    }
  }



  componentWillReceiveProps(nextProps){
    if(nextProps.mfSetting.isMfSettingUpdated == true){
      this.refs.message.show();
    }
    let mfSetting = nextProps.mfSetting.mfSettings.data;
    let self = this;
    if(mfSetting == null){
      return;
    }
    Object.keys(mfSetting).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = mfSetting[element]
        self.setState(obj);
      }
    });

  }



  componentWillMount(){
    const { mfSetting, dispatch } = this.props;
    const mfSettingActions = bindActionCreators(MFSettingActions, dispatch);
    const economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    const idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    const loanUsageActions = bindActionCreators(LoanUsageActions, dispatch);
    const potentialResponseActions = bindActionCreators(PotentialResponseActions, dispatch);
    const potentialReasonActions = bindActionCreators(PotentialReasonActions, dispatch);
    const monitoringActions = bindActionCreators(MonitoringActions, dispatch);
    const potentialNextStepActions = bindActionCreators(PotentialNextStepActions, dispatch);

    mfSettingActions.getMFSettings();
    economicActivityActions.getEconomicActivities();
    idPaperActions.getIdPapers();
    loanUsageActions.getLoanUsages();
    potentialResponseActions.getPotentialResponses();
    potentialReasonActions.getPotentialReasons();
    monitoringActions.getMonitorings();
    potentialNextStepActions.getPotentialNextSteps();

    return;
  }



  render() {


    let messageView = this.getMessageView("MF Settings updated!","message");
    let errorsNode = this.getErrorNodes(this.props.mfSetting.mfSettingErrors);

    const { economicActivities,idPapers,loanUsages, potentialResponses,potentialReasons,potentialNextSteps,monitorings, dispatch } = this.props;
    let economicActivityActions = bindActionCreators(EconomicActivityActions, dispatch);
    let idPaperActions = bindActionCreators(IdPaperActions, dispatch);
    let loanUsageActions = bindActionCreators(LoanUsageActions, dispatch);
    let potentialResponseActions = bindActionCreators(PotentialResponseActions, dispatch);
    let potentialReasonActions = bindActionCreators(PotentialReasonActions, dispatch);
    let potentialNextStepActions = bindActionCreators(PotentialNextStepActions, dispatch);
    let monitoringActions = bindActionCreators(MonitoringActions, dispatch);


    // let skipWeekendsInInstallmentDayOptions = this.props.mfSetting.skipWeekendsInInstallmentDays.map(function(skipWeekendsInInstallmentDay,index) {
    //   return <option value={skipWeekendsInInstallmentDay.value} key={index}>{skipWeekendsInInstallmentDay.label}</option>;
    // });


    return (
      <div className="mfSetting">
        {messageView}
        {errorsNode}
        <div className="panel-heading">
          <div><i className="material-icons">settings</i></div>
          <div><strong>mf setting</strong></div>
        </div>

        <div className="mfsetBox">

          <div className="loanPolicyLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Loan Policy</strong></div>
            </div>

            <div className="innerBox">

              <div className="row">
                <div className="col s6">
                  <Link className="linkTxt" to="/settings/loanProducts">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                      Loan Products
                    </button>
                  </Link>
                </div>
              </div>

              <div className="area">
                <div className="item1">Weekends in installment days</div>
                <div className="item2">
                  <WeekendsInInstallmentDaysSelectView list={WEEKENDS_IN_INSTALLMENT_DAYS_MASTER} ref="weekends_in_installment_days" onChange={this.onChangeFamilyType} value={this.state.weekends_in_installment_days}  id="weekends_in_installment_days" label_key="label" value_key="value" />
                </div>
              </div>
              <div className="row mBox">
                 <div className="input-field col s6 fn">
                   <input onKeyDown={this.handleKeyDown} placeholder="Moratorium days" value={this.state.moratorium_days} onChange={this.onChangeText}  ref="moratorium_days"  id="moratorium_days" type="text" className="validate" />
                 </div>
              </div>

            </div>
          </div>

          <div className="feePolicyLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Fee Policy</strong></div>
            </div>

            <div className="innerBox">

              <div className="row mBox">
                 <div className="input-field col s6 fn">
                   <input onKeyDown={this.handleKeyDown} placeholder="Registration fee" value={this.state.registrationFee} onChange={this.onChangeText}  ref="registrationFee"  id="registrationFee" type="text" className="validate" />
                 </div>

                 <div className="col s2">
                   <Checkbox
                     onCheck={this.onCheckIsRegistrationFeeRate}
                     ref="isRegistrationFeeRate"
                     name="isRegistrationFeeRate"
                     value="true"
                     label="Rate?"
                     id="isRegistrationFeeRate"
                     defaultChecked={this.state.isRegistrationFeeRate}
                     />
                 </div>
              </div>

              <div className="row mBox">
                <div className="input-field col s6 fn">
                  <input onKeyDown={this.handleKeyDown} placeholder="Service Charge" value={this.state.serviceCharge} onChange={this.onChangeText}  ref="serviceCharge"  id="serviceCharge" type="text" className="validate" />
                </div>

                <div className="col s2">
                  <Checkbox
                    onCheck={this.onCheckIsServiceChargeRate}
                    ref="isServiceChargeRate"
                    name="isServiceChargeRate"
                    value="true"
                    label="Rate?"
                    id="isServiceChargeRate"
                    defaultChecked={this.state.isServiceChargeRate}
                  />
                </div>
              </div>

              <div className="row mBox">
                <div className="input-field col s6 fn">
                  <input onKeyDown={this.handleKeyDown} placeholder="Loan Management Fee" value={this.state.loanManagementFee} onChange={this.onChangeText}  ref="loanManagementFee"  id="loanManagementFee" type="text" className="validate" />
                </div>

                <div className="col s2">
                  <Checkbox
                    onCheck={this.onCheckIsloanManagementFeeRate}
                    ref="isLoanManagementFeeRate"
                    name="isLoanManagementFeeRate"
                    value="true"
                    label="Rate?"
                    id="isLoanManagementFeeRate"
                    defaultChecked={this.state.isLoanManagementFeeRate}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="clientsLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Client</strong></div>
            </div>

            <div className="innerBox">
              <EconomicActivityHandler actions={economicActivityActions} economicActivities={economicActivities} />
              <IdPaperHandler actions={idPaperActions} idPapers={idPapers} />
              <LoanUsageHandler actions={loanUsageActions} loanUsages={loanUsages} />
              <PotentialResponseHandler actions={potentialResponseActions} potentialResponses={potentialResponses} />
              <PotentialReasonHandler actions={potentialReasonActions} potentialReasons={potentialReasons} />
              <PotentialNextStepHandler actions={potentialNextStepActions} potentialNextSteps={potentialNextSteps} />
              <MonitoringHandler actions={monitoringActions} monitorings={monitorings} />
            </div>
          </div>

          <div className="collateralLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Collateral</strong></div>
            </div>
            <div className="innerBox">
              <CollateralHandler />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default MFSettingView;
