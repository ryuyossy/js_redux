import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import HolidayHandler from './HolidayHandler';
import WeekendView from './WeekendView';

import OrganizationHandler from './OrganizationHandler';
import AddressHandler from './AddressHandler';
import {Link} from 'react-router';


import * as SettingActions from '../actions/SettingActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let TextField = mui.TextField;



@connect(state => (
{
  company: state.settings
}
))
class CompanySettingView extends BaseComponent {


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
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeCuntryName = this.onChangeCuntryName.bind(this);
    this.onChangeCurrencyName = this.onChangeCurrencyName.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);

    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeExchangeRate = this.onChangeExchangeRate.bind(this);
    this.onChangeVatRate = this.onChangeVatRate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updateCompanySettings = this.updateCompanySettings.bind(this);
  }


  handleEdit(e){
    this.setState({text_pressed : true});
  }


  componentWillMount(){
    const { settings, dispatch } = this.props;
    const settingActions = bindActionCreators(SettingActions, dispatch);
    settingActions.getCompanySettings();

    return;
  }


  onChangeCompanyName(e){
    this.setState({companyName: e.target.value});
  }

  onChangeExchangeRate(e){
    this.setState({exchangeRate: e.target.value});
  }

  onChangeVatRate(e){
    this.setState({vatRate: e.target.value});
  }

  onChangeDescription(e){
    this.setState({description: e.target.value});
  }

  updateCompanySettings(){
    let selectedCountry =  this.state.country;
    let selectedCurrency =  this.state.currency;
    let companyName = this.state.companyName;
    let exchangeRate = this.state.exchangeRate;
    let vatRate = this.state.vatRate;
    let description = this.state.description;
    const { settings, dispatch } = this.props;
    const settingActions = bindActionCreators(SettingActions, dispatch);
    let values = {
      country: selectedCountry,
      currency: selectedCurrency,
      companyName: companyName,
      exchangeRate: exchangeRate,
      vatRate: vatRate,
      description: description,
    };
    settingActions.updateCompanySetting(values);
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      this.updateCompanySettings();
    }else if(e.which == 27){ //esc

    }
  }


  onChangeCuntryName(e){
    this.setState({country: e.target.value});
  }

  onChangeCurrencyName(e){
    this.setState({currency: e.target.value});
  }


  componentWillReceiveProps(nextProps){
    let country = nextProps.company.company.country;
    let currency = nextProps.company.company.currency;
    let companyName = nextProps.company.company.name;
    let exchangeRate = nextProps.company.company.exchange_rate;
    let vatRate = nextProps.company.company.vat_rate;
    let description = nextProps.company.company.description;
    let states = {
      country:country,
      currency:currency,
      companyName:companyName,
      exchangeRate:exchangeRate,
      vatRate:vatRate,
      description:description
    };


    this.setState(states);

    if(nextProps.company.is_company_updated == true){
      this.refs.message.show();
    }

  }

  render() {
    const { company,area_settings, dispatch } = this.props;
    const settingActions = bindActionCreators(SettingActions, dispatch);

    let optionsCountry = this.props.company.country_list.map(function(country) {
      return <option value={country.payload} key={country.payload}>{country.text}</option>;
    });

    let optionsCurrency = this.props.company.currency_list.map(function(currency) {
      return <option value={currency.payload} key={currency.payload}>{currency.text}</option>;
    });


    let selectedCountry =  this.state.country || this.props.company.company.country;
    let selectedCurrency =  this.state.currency || this.props.company.company.currency;
    let companyName = this.state.companyName || this.props.company.company.name;
    let exchangeRate = this.state.exchangeRate || this.props.company.company.exchange_rate;
    let vatRate = this.state.vatRate || this.props.company.company.vat_rate;
    let description = this.state.description || this.props.company.company.description;

    let messageView = this.getMessageView("Company settings updated!","message");

    let errorsNode = this.getErrorNodes(this.props.company.company_errors);


    return (
      <div className="companySetting">
        {messageView}
        <div className="panel-heading">
          <div><i className="material-icons">settings</i></div>
          <div><strong>company setting</strong></div>
        </div>
        {errorsNode}

        <div className="setBox">

          <div className="row">
            <h6>Company Name</h6>
            <div className="input-field col s6 fn">
              <input ref="companyName"  value={companyName}  placeholder="Company Name" id="companyName" type="text" className="validate" onChange={this.onChangeCompanyName}  onKeyDown={this.handleKeyDown}/>
            </div>
          </div>

          <div className="row">
            <h6 className="cnM">Country Name</h6>
            <select onChange={this.onChangeCuntryName} className="browser-default selectWidth" value={selectedCountry} >
              {optionsCountry}
            </select>
          </div>

          <div className="row">
            <h6 className="cnM">Currency Name</h6>
            <select onChange={this.onChangeCurrencyName} className="browser-default selectWidth" value={selectedCurrency} >
              {optionsCurrency}
            </select>
          </div>

          <div className="row">
            <h6>Exchange rate</h6>
             <div className="input-field col s6 fn">
               <input ref="exchangeRate" value={exchangeRate} placeholder="Exchange rate" onChange={this.onChangeExchangeRate} id="exchange_rate" type="text" className="validate" onKeyDown={this.handleKeyDown}/>
             </div>
          </div>


          <div className="row">
            <h6>Vat Rate</h6>
             <div className="input-field col s6 fn">
               <input ref="vatRate" value={vatRate} placeholder="Vat Rate" onChange={this.onChangeVatRate} id="vateRate" type="text" className="validate" onKeyDown={this.handleKeyDown} />
             </div>
          </div>


          <div className="row">
            <h6>Description</h6>
             <div className="input-field col s6 fn">
               <input ref="description" value={description} placeholder="Description" onChange={this.onChangeDescription} id="description" type="text" className="validate" onKeyDown={this.handleKeyDown}/>
             </div>
          </div>


          <div className="weekendsLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Weekend</strong></div>
            </div>
            <WeekendView />
          </div>


          <div className="holidaysLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>Holiday</strong></div>
            </div>
            <HolidayHandler />
          </div>

          <div className="organizationLayout">
            <div className="panel-heading">
              <div><i className="material-icons">settings</i></div>
              <div><strong>organization</strong></div>
            </div>
            <OrganizationHandler />
          </div>

          <div className="row">
            <div className="col s6">
              <Link to="/area_settings" >
                <button className="btn waves-effect waves-light" type="submit" name="action">
                  Area Settings
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    );
  }


}


export default CompanySettingView;
