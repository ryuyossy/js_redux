import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import Error from './ErrorView';




class ErrorListView {


    render() {
      var err = this.props.errors;
      let self = this;
      if(!err){
        return(<span></span>);
      }

      var errorNodes = err.map(function(error, index) {
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <span key={index}>
            <Error  error={error} />
          </span>
        );
      });



      return (
        <ul className="errorList" refCollection="errorList">
          {errorNodes}
        </ul>
      );
    }

}


export default ErrorListView;
