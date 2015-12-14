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

class CollateralTypeView extends BaseComponent {



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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }




  handleDelete(e) {
    this.props.actions.deleteCollateralType(this.props.collateralId, this.props.collateralType.id)
  }


  componentWillMount(){
    this.updateStates(this.props,this.state);
  }

  componentWillReceiveProps(nextProps, nextState){
    this.updateStates(nextProps,nextState);
  }

  updateStates(props,state){
    let self = this;
    let collateralType = props.collateralType;
    if(collateralType.type == null && state.type == null){
      this.setState({type: 1});
    }
    Object.keys(collateralType).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = collateralType[element]
        self.setState(obj);
      }
    });

  }



  handleKeyDown(e){
    let key = e.which | e.keyCode;
    if(key == 13){ //enter
      var name = this.state.name;
      var type = this.state.type;;

      if (!name || !type) {
        return;
      }
      let values = {
        name: name,
        type: type
      };

      this.props.actions.updateCollateralType(this.props.collateralId, this.props.id,values);

    }else if(key == 27){ //esc
    }
  }


  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let collateralType = this.props.collateralType;

    let options = this.props.dataTypes.map(function(dataType,index) {
      return <option value={dataType.payload} key={index}>{dataType.text}</option>;
    });

      return (
        <div>
          <div className="row">
             <div className="input-field col s5">
               <input onKeyDown={this.handleKeyDown} defaultValue={collateralType.name}  ref="name" value={this.state.name} onChange={this.onChangeValue} id="name" type="text" className="validate" />
               <label className="active" htmlFor="name">Name</label>
             </div>
             <div className="input-field col s5">
               <select id="type" onChange={this.onChangeValue} className="browser-default" defaultValue={collateralType.type} value={this.state.type} >
                 {options}
               </select>
               <label className="active" htmlFor="type">Data type</label>
             </div>
             <div className="input-field col s2" onClick={this.handleDelete}>
               Delete
             </div>
          </div>
          {errorsNode}
        </div>
      );

  }


}


export default CollateralTypeView;
