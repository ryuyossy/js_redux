import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';
import CollateralTypeHandler from './CollateralTypeHandler';

import * as CollateralActions from '../actions/CollateralActions';
import * as FundingLineActions from '../actions/FundingLineActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMixin from 'react-mixin';


@connect(state => (
{
  collateral: state.collaterals,

}
))
@ReactMixin.decorate(History)
class CollateralDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleKeyDown(e){
    let key = e.which | e.keyCode;



    if(key == 13){ //enter

      var id = this.props.collateral.collateral.id;
      var name = this.state.name


      if (!name) {
        return;
      }
      let values = {
        name: name
      };

      const { collateral, dispatch } = this.props;
      const actions = bindActionCreators(CollateralActions, dispatch);

      actions.updateCollateral(id,values);

    }else if(key == 27){ //esc
    }
  }


  handleClose(e){
    const { collateral, dispatch } = this.props;
    const actions = bindActionCreators(CollateralActions, dispatch);
    actions.clearData();
    this.props.history.replaceState(null, `/settings/mf`, null);
  }


   componentWillMount(){
     const { collateral, dispatch } = this.props;
     const actions = bindActionCreators(CollateralActions, dispatch);
     actions.getCollateralDetail(this.props.params.id);

  }

  componentWillReceiveProps(nextProps){
    let collateral = nextProps.collateral.collateral;
    let self = this;
    Object.keys(collateral).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = collateral[element]
        self.setState(obj);
      }
    });

    if(nextProps.collateral.isCollateralUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { collateral, dispatch } = this.props;
    collateral = collateral.collateral;
    let errorsNode = this.getErrorNodes(this.props.collateral.collateralErrors);
    let messageView = this.getMessageView("Collaterals updated!","message");




    return (


      <div>
        <button onClick={this.handleClose} >
          Back to MF Settings
        </button>

        <div className="row">
           <div className="input-field col s10">
             <input onKeyDown={this.handleKeyDown} value={this.state.name} onChange={this.onChangeText}  ref="name"  id="name" type="text" className="validate" />
             <label className="active" htmlFor="name">Type Name</label>
           </div>
        </div>

        <div className="row">
           <div className="input-field col s5">
             <input onKeyDown={this.handleKeyDown} value="Description" onChange={this.onChangeText} disabled="disabled"   type="text" className="validate" />
             <label className="active" >name</label>
           </div>
         <div className="input-field col s5">
           <input onKeyDown={this.handleKeyDown} value="String" onChange={this.onChangeText} disabled="disabled"   type="text" className="validate" />
           <label className="active" >Data type</label>
         </div>
      </div>

      <div className="row">
         <div className="input-field col s5">
           <input onKeyDown={this.handleKeyDown} value="Price" onChange={this.onChangeText} disabled="disabled"   type="text" className="validate" />
           <label className="active" >name</label>
         </div>
       <div className="input-field col s5">
         <input onKeyDown={this.handleKeyDown} value="Number" onChange={this.onChangeText} disabled="disabled"   type="text" className="validate" />
         <label className="active" >Data type</label>
       </div>
    </div>

    <CollateralTypeHandler collateralId={this.props.params.id} />




        {messageView}

        {errorsNode}
      </div>

    );



  }

}


export default CollateralDetailView;
