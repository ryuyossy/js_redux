import React from 'react';
import {Link} from 'react-router';
import BaseComponent from './BaseComponent';

class MenuHandler extends BaseComponent {
  constructor(props,context) {
    super(props,context);
    this.showMarketing = this.showMarketing.bind(this);
    this.showLending = this.showLending.bind(this);
    this.showCollect = this.showCollect.bind(this);
    this.showMonitor = this.showMonitor.bind(this);
    this.showReport = this.showReport.bind(this);
    this.showSetting = this.showSetting.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
  }

  showMarketing() {
    $('.markeMenu').toggleClass("showMenu");
  }
  showLending() {
    $('.lendingMenu').toggleClass("showMenu");
  }
  showCollect() {
    $('.collectMenu').toggleClass("showMenu");
  }
  showMonitor() {
    $('.monitorMenu').toggleClass("showMenu");
  }
  showReport() {
    $('.reportMenu').toggleClass("showMenu");
  }
  showSetting() {
    $('.settingMenu').toggleClass("showMenu");
  }
  selectMenu(e) {
    $('.dropBack').removeClass('selectMenu');
    var chkClass = $(e.target).hasClass('selectMenu');
    if (!chkClass) {
      $(e.target).addClass("selectMenu");
    }
  }

  render() {
    return (
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header"><i className="material-icons">dashboard</i>
            <Link className="dashb" to="/dashboard">Dashboard</Link>
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showMarketing}><i className="material-icons">filter_drama</i>Marketing</div>
          <div className="collapsible-body markeMenu">
            <Link className="dropBack" onClick={this.selectMenu}　to="/potential_customers_search">Potential Client Search</Link>
            <Link className="dropBack" onClick={this.selectMenu}　to="/potential_customers/new">Potential clients</Link>
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showLending}><i className="material-icons">import_export</i>Lending</div>
          <div className="collapsible-body lendingMenu">
            <Link className="dropBack" onClick={this.selectMenu}　to="/customers_search">Search Individual</Link>
            <Link className="dropBack" onClick={this.selectMenu}　to="/customers/new">Add Individual</Link>
            <Link className="dropBack" onClick={this.selectMenu} to="/groups_search" >Search Group</Link>
            <Link className="dropBack" onClick={this.selectMenu}　to="/groups/new">Add Group</Link>
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showCollect}><i className="material-icons">subject</i>Collection</div>
          <div className="collapsible-body collectMenu">
            <Link className="dropBack" onClick={this.selectMenu} to="/collection_search_contract">Collection</Link>
            <Link className="dropBack">Management</Link>
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showMonitor}><i className="material-icons">visibility</i>Monitoring</div>
          <div className="collapsible-body monitorMenu">Monitoring</div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showReport}><i className="material-icons">perm_data_setting</i>Data & Report</div>
          <div className="collapsible-body reportMenu">
            Data
            Reports
            Log
          </div>
        </li>
        <li>
          <div className="collapsible-header" onClick={this.showSetting}><i className="material-icons">settings_overscan</i>Settings</div>
          <div className="collapsible-body settingMenu">
            <Link className="dropBack" onClick={this.selectMenu}　to="/settings/company" >Company Settings</Link>
            <Link className="dropBack" onClick={this.selectMenu}　to="/settings/admin" >Admin Settings</Link>
            <Link className="dropBack" onClick={this.selectMenu}　to="/settings/mf" >MF Settings</Link>
          </div>
        </li>
      </ul>
    );
  }
}

export default MenuHandler;
