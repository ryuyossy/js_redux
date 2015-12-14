import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import AreaSetting from './AreaSettingView';
import BaseComponent from './BaseComponent';
import AreaSettingFormView from './AreaSettingFormView';


class AreaSettingSubListView extends BaseComponent {


  render() {

    if(!this.props.area_settings.length || this.props.area_settings.length == 0 ){
      return (<span></span> );
    }
    let self = this;

    var areaSettingNodes = this.props.area_settings.map(function(areaSettings, index) {

      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <div  key={areaSettings.id}>
          <AreaSetting area_setting={areaSettings} offset={self.props.offset}/>
          <AreaSettingSubListView area_settings={areaSettings.children} parent_id={areaSettings.id} offset={self.props.offset+1}/>
        </div>
      );
    });

    return (
      <div>{areaSettingNodes}</div>
    );
  }


}

export default AreaSettingSubListView;
