import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';

import {formatDate} from '../utils/utils'



class GroupView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleToDetail = this.handleToDetail.bind(this);
  }

  handleToDetail(e){
    this.props.handleToDetail(this.props.group.id)
  }


  componentWillReceiveProps(nextProps){

  }

  render() {


    let user = this.props.group.user || {};
    let organization = this.props.group.organization || {};
    let group = this.props.group
    let url = `/groups/${this.props.group.id}`;
    let establishmentDate = new Date(this.props.group.establishment_date);
    establishmentDate =  formatDate(establishmentDate)
    let node = (
      <div className="row">
        <div className="column" data-label="Client No">
          <Link to={url}  >
            {this.props.group.group_no}
          </Link>
        </div>
        <div className="column" data-label="Group Name">
          <Link to={url}  >
            {this.props.group.group_name}
          </Link>
        </div>
        <div className="column" data-label="Establishment Date">
          <Link to={url}  >
            {establishmentDate}
          </Link>
        </div>
      </div>
    );


    return node;
  }


}


export default GroupView;
