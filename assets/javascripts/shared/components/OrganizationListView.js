import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Organization from './OrganizationView';
import BaseComponent from './BaseComponent';
import OrganizationFormView from './OrganizationFormView';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class OrganizationListView extends BaseComponent {
  render() {
    let self = this;

    if(this.props.organizations == null || !this.props.organizations.length){
      return (
        <OrganizationFormView users={self.props.users} errors={this.props.organization_errors} createOrganization={this.props.createOrganization} />
      );
    }

    var organizationNodes = this.props.organizations.map(function(organization, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Organization users={self.props.users} index={index+1} deleteOrganization={self.props.deleteOrganization} errors={organization.errors} key={organization.id} organization={organization} id={organization.id} updateOrganization={self.props.updateOrganization}  />
      );
    });


    return (
    <div>
      <div className="row">
        <div className="col s2"><b>Name</b></div>
        <div className="col s2"><b>Code</b></div>
        <div className="col s2"><b>Address</b></div>
        <div className="col s2"><b>Branch Manager</b></div>
        <div className="col s2"><b>Description</b></div>
        <div className="col s2"><b>Is HQ?</b></div>
      </div>
      <ReactCSSTransitionGroup transitionName="items">
          {organizationNodes}
      </ReactCSSTransitionGroup>
      <OrganizationFormView users={self.props.users} errors={this.props.organization_errors} createOrganization={this.props.createOrganization} />
    </div>

    );
  }


}

export default OrganizationListView;
