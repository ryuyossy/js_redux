import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Group from './GroupView';
import BaseComponent from './BaseComponent';

class GroupListView extends BaseComponent {
  render() {
    if(this.props.groups == null || !this.props.groups.length){
      return (<span></span>);
    }
    let self = this;
    let handleToDetail = self.props.handleToDetail;

    var groupNodes = this.props.groups.map(function(group, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Group editable={self.props.editable} handleToDetail={handleToDetail} key={group.id} group={group} id={group.id}  />
      );
    });



    return (
      <div className="searchClientResult">
        <div className="table">
          <div className="table-head">
            <div className="column" data-label="Group No">Group No</div>
            <div className="column" data-label="Group Name">Group Name</div>
            <div className="column" data-label="Establishment Date">Establishment Date</div>
          </div>
          {groupNodes}
        </div>
      </div>
    );
  }


}

export default GroupListView;
