import request from 'superagent';
import { BORROWING_SITUATION_LIST, BORROWING_SITUATION_CREATE, BORROWING_SITUATION_DELETE, BORROWING_SITUATION_ERROR,BORROWING_SITUATION_UPDATE,BORROWING_SITUATION_DETAIL,BORROWING_SITUATION_CLEAR,BORROWING_SITUATION_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

  export function getBorrowingSituations(customerId) {
    return dispatch => {
        getBorrowingSituationsAsync(customerId).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function createBorrowingSituation(customerId,values){
    return dispatch => {
        createBorrowingSituationAsync(customerId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteBorrowingSituation(customerId,id){
      return dispatch => {
            deleteBorrowingSituationAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateBorrowingSituation(customerId,id,values){
      return dispatch => {
            updateBorrowingSituationAsync(customerId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getBorrowingSituationDetail(customerId,id){
      return dispatch => {
          getBorrowingSituationDetailAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getBorrowingSituationsAsync(customerId) {
    let response = await request
      .get(`/api/v1/potential_customers/${customerId}/borrowing_situations`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: BORROWING_SITUATION_LIST,
      borrowingSituations: response.body,
    };
  }


  async function createBorrowingSituationAsync(customerId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/potential_customers/${customerId}/borrowing_situations`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = BORROWING_SITUATION_CREATE;
        return res;
      },function(err){
          type = BORROWING_SITUATION_ERROR;
          return err.response;
      });

      return {
        type: type,
        borrowingSituations: response.body,
      };

  }



  async function deleteBorrowingSituationAsync(customerId,id){
    let response = await request
      .del(`/api/v1/potential_customers/${customerId}/borrowing_situations/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: BORROWING_SITUATION_DELETE,
        borrowingSituations: response.body,
        id:id
      };

  }

  async function updateBorrowingSituationAsync(customerId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/potential_customers/${customerId}/borrowing_situations/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = BORROWING_SITUATION_UPDATE;
        return res;
      },function(err){
        type = BORROWING_SITUATION_ERROR;
        return err.response;
      });

      return {
        type: type,
        borrowingSituations: response.body,
        id:id
      };

  }


    async function getBorrowingSituationDetailAsync(customerId,id){
      let response = await request
        .get(`/api/v1/potential_customers/${customerId}/borrowing_situations/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: BORROWING_SITUATION_DETAIL,
          borrowingSituation: response.body,
          id:id
        };

    }
