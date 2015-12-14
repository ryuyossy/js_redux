import request from 'superagent';
import { LOAN_PRODUCT_LIST, LOAN_PRODUCT_CREATE, LOAN_PRODUCT_DELETE, LOAN_PRODUCT_ERROR,LOAN_PRODUCT_UPDATE,LOAN_PRODUCT_DETAIL,LOAN_PRODUCT_CLEAR_DATA } from '../constants/ActionTypes';


export function clearData(){
  return {type: LOAN_PRODUCT_CLEAR_DATA};
}


  export function getLoanProducts() {
    return dispatch => {
        getLoanProductsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createLoanProduct(values){
    return dispatch => {
        createLoanProductAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteLoanProduct(id){
      return dispatch => {
            deleteLoanProductAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateLoanProduct(id,values){
      return dispatch => {
            updateLoanProductAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getLoanProductDetail(id){
      return dispatch => {
        setTimeout(() => {
          getLoanProductDetailAsync(id).then(result =>{
            return dispatch(result);
          });
        }, 1);
      };
    }


    export function getLoanProductDetail(id){
      return dispatch => {
        setTimeout(() => {
          getLoanProductDetailAsync(id).then(result =>{
            return dispatch(result);
          });
        }, 1);
      };
    }


  async function getLoanProductsAsync() {
    let response = await request
      .get(`/api/v1/settings/loanProducts`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: LOAN_PRODUCT_LIST,
      loanProducts: response.body,
    };
  }


  async function createLoanProductAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/loanProducts`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = LOAN_PRODUCT_CREATE;
        return res;
      },function(err){
          type = LOAN_PRODUCT_ERROR;
          return err.response;
      });

      return {
        type: type,
        loanProducts: response.body,
      };

  }



  async function deleteLoanProductAsync(id){
    let response = await request
      .del('/api/v1/settings/loanProducts/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: LOAN_PRODUCT_DELETE,
        loanProducts: response.body,
        id:id
      };

  }

  async function updateLoanProductAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/loanProducts/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = LOAN_PRODUCT_UPDATE;
        return res;
      },function(err){
        type = LOAN_PRODUCT_ERROR;
        return err.response;
      });

      return {
        type: type,
        loanProducts: response.body,
        id:id
      };

  }



    async function getLoanProductDetailAsync(id){
      let response = await request
        .get('/api/v1/settings/loanProducts/'+id)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: LOAN_PRODUCT_DETAIL,
          loanProduct: response.body,
          id:id
        };

    }
