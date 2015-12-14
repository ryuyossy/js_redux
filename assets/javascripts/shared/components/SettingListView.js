import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Setting from './SettingView';
import BaseComponent from './BaseComponent';

class SettingListView extends BaseComponent {
  render() {


    if(!this.props.settings.length  || this.props.settings.length == 0 ){
      return (<span></span>);
    }
    let self = this;

    var settingNodes = this.props.settings.map(function(setting, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <Setting updateSetting={self.props.updateSetting} key={setting.id} setting={setting} id={self.props.settings.id}  />
      );
    });


    return (
      <div className="settingList">
        {settingNodes}
      </div>
    );
  }


}

export default SettingListView;
