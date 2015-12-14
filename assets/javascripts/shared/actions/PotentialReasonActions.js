import request from 'superagent';
import { POTENTIAL_REASON_LIST, POTENTIAL_REASON_CREATE, POTENTIAL_REASON_DELETE, POTENTIAL_REASON_ERROR,POTENTIAL_REASON_UPDATE,POTENTIAL_REASON_DETAIL } from '../constants/ActionTypes';

  export function getPotentialReasons() {
    return dispatch => {
        getPotentialReasonsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createPotentialReason(values){
    return dispatch => {
        createPotentialReasonAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deletePotentialReason(id){
      return dispatch => {
            deletePotentialReasonAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updatePotentialReason(id,values){
      return dispatch => {
            updatePotentialReasonAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getPotentialReasonDetail(id){
      return dispatch => {
          getPotentialReasonDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getPotentialReasonsAsync() {
    let response = await request
      .get(`/api/v1/settings/potentialReasons`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: POTENTIAL_REASON_LIST,
      potentialReasons: response.body,
    };
  }


  async function createPotentialReasonAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/potentialReasons`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_REASON_CREATE;
        return res;
      },function(err){
          type = POTENTIAL_REASON_ERROR;
          return err.response;
      });

      return {
        type: type,
        potentialReasons: response.body,
      };

  }



  async function deletePotentialReasonAsync(id){
    let response = await request
      .del('/api/v1/settings/potentialReasons/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: POTENTIAL_REASON_DELETE,
        potentialReasons: response.body,
        id:id
      };

  }

  async function updatePotentialReasonAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/potentialReasons/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_REASON_UPDATE;
        return res;
      },function(err){
        type = POTENTIAL_REASON_ERROR;
        return err.response;
      });

      return {
        type: type,
        potentialReasons: response.body,
        id:id
      };

  }
