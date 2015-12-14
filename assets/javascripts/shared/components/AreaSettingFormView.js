import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';



class AreaSettingFormView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    let reader = new FileReader();
    let self = this;

    reader.onload = function(e) {
              self.props.uploadCsvFile(e.target.result);
              React.findDOMNode(self.refs.val).value = '';
          };
    reader.readAsText(file, "utf-8");
  }

  render() {

    return (
      <div className="row">
        <form action="#" >
           <div className="file-field input-field">
             <div className="btn" style={{position:"relative"}}>
               <span>UPLOAD CSV file</span>
                <input type="file" ref="val" onChange={this.handleSubmit} />
             </div>
           </div>
         </form>
     </div>
    );
  }

}

export default AreaSettingFormView;
