import React from 'react';
import { State, History } from 'react-router';

class ErrorMessageView {

  constructor(props,context) {
    $('.modal-trigger').leanModal();
  }

  componentDidMount(){
    $('#modal1').openModal();
  }

  render() {
    let errorMessage = this.props.message;

    return (
      <div className="errorMessageWrap">
        <div className="waves-effect waves-light modal-trigger" href="#modal1"></div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{errorMessage}</h4>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorMessageView;
