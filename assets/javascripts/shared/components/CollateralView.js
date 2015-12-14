import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

class CollateralView extends BaseComponent {



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
    this.state = { collateralManagerUserId: null };
    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete(e) {
    this.props.actions.deleteCollateral(this.props.collateral.id)
  }





  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let collateral = this.props.collateral;

    result = (<div className={border}>
      <div className="col s2" >
        {this.props.collateral.name}
      </div>
      <div className="col s2" onClick={this.handleDelete}>Delete</div>
      <div className="col s2">
        <Link to={`/settings/collaterals/${this.props.collateral.id}`} >
          Edit
        </Link>
      </div>

    </div>);

    return result
  }


}


export default CollateralView;
