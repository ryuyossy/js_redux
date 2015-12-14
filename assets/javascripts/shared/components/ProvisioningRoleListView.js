import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import ProvisioningRole from './ProvisioningRoleView';
import BaseComponent from './BaseComponent';
import ProvisioningRoleFormView from './ProvisioningRoleFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class ProvisioningRoleListView extends BaseComponent {
  render() {
    let self = this;


    if(this.props.provisioningRoles == null || !this.props.provisioningRoles.length){
      return (
        <div className="provRole">
          <ProvisioningRoleFormView actions={this.props.actions}  errors={this.props.provisioningRoleErrors} createProvisioningRole={this.props.createProvisioningRole} />
        </div>

      );
    }

    var provisioningRoleNodes = this.props.provisioningRoles.map(function(provisioningRole, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <ProvisioningRole index={index+1}  errors={provisioningRole.errors} key={provisioningRole.id} provisioningRole={provisioningRole} id={provisioningRole.id} actions={self.props.actions}  />
      );
    });


    return (
    <div>
      <ReactCSSTransitionGroup transitionName="items">
          {provisioningRoleNodes}
      </ReactCSSTransitionGroup>
      <ProvisioningRoleFormView actions={this.props.actions} errors={this.props.provisioningRoleErrors} createProvisioningRole={this.props.createProvisioningRole} />
    </div>

    );
  }


}

export default ProvisioningRoleListView;
