import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';


class CollateralTypeFormView extends BaseComponent {



  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }




  componentWillMount(){
    this.setState({type: "1"});
 }


   onChangeValue(e){
     let obj = {};
     obj[e.target.id] = e.target.value;
     this.setState(obj);
   }




  handleKeyDown(e){
    if(e.which == 13){ //enter

      var name = this.state.name
      var type = this.state.type;
      var collateralId = this.props.collateralId;

      if (!name || !type) {
        return;
      }
      let values = {
        name: name,
        type: type
      };

      this.props.actions.createCollateralType(collateralId,values);

      React.findDOMNode(this.refs.name).value = '';
      this.setState({type: "1"})


    }else if(e.which == 27){ //esc

    }
  }


  render() {

    let errorsNode = this.getErrorNodes(this.props.errors);

    let options = this.props.dataTypes.map(function(dataType,index) {
      return <option value={dataType.payload} key={index}>{dataType.text}</option>;
    });


    return (


      <div>
        <div className="row">
           <div className="input-field col s5">
             <input onChange={this.onChangeValue} onKeyDown={this.handleKeyDown}  ref="name"  id="name" type="text" className="validate" />
             <label className="" htmlFor="name">Name</label>
           </div>

           <div className="input-field col s5">
             <select id="type" onChange={this.onChangeValue} className="browser-default" value={this.state.type} >
               {options}
             </select>
             <label className="active" htmlFor="type">Data type</label>
           </div>

        </div>


        {errorsNode}
      </div>

    );
  }

}

export default CollateralTypeFormView;
