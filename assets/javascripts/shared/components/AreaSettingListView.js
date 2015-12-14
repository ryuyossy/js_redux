import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import AreaSetting from './AreaSettingView';
import BaseComponent from './BaseComponent';
import AreaSettingFormView from './AreaSettingFormView';
import AreaSettingSubListView from './AreaSettingSubListView';


class AreaSettingListView extends BaseComponent {


  render() {


    if(!this.props.area_settings.length || this.props.area_settings.length == 0 ){
      return (
        <AreaSettingFormView uploadCsvFile={this.props.uploadCsvFile} parent_id={this.props.parent_id}/>
       );
    }
    let self = this;


    var areaSettingNodes = this.props.area_settings.map(function(areaSettings, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <div key={areaSettings.id} >
          <AreaSetting  area_setting={areaSettings} offset={0}/>
          <AreaSettingSubListView area_settings={areaSettings.children} parent_id={areaSettings.id} offset={1}/>
        </div>
      );
    });

    let jsx = (
      <div className="userList row">
        <AreaSettingFormView uploadCsvFile={this.props.uploadCsvFile} parent_id={this.props.parent_id}/>
        <table>
          <thead>
            <tr>
                <th data-field="id">id</th>
                <th data-field="province">province</th>
                <th data-field="district">district</th>
                <th data-field="commune">commune</th>
                <th data-field="village">village</th>
            </tr>
          </thead>
          <tbody>
            {areaSettingNodes}
          </tbody>
        </table>
      </div>)

    return (
      jsx
    );
  }


}

export default AreaSettingListView;
