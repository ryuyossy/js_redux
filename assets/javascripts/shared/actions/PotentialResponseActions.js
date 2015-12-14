import request from 'superagent';
import { POTENTIAL_RESPONSE_LIST, POTENTIAL_RESPONSE_CREATE, POTENTIAL_RESPONSE_DELETE, POTENTIAL_RESPONSE_ERROR,POTENTIAL_RESPONSE_UPDATE,POTENTIAL_RESPONSE_DETAIL } from '../constants/ActionTypes';

  export function getPotentialResponses() {
    return dispatch => {
        getPotentialResponsesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createPotentialResponse(values){
    return dispatch => {
        createPotentialResponseAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deletePotentialResponse(id){
      return dispatch => {
            deletePotentialResponseAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updatePotentialResponse(id,values){
      return dispatch => {
            updatePotentialResponseAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getPotentialResponseDetail(id){
      return dispatch => {
          getPotentialResponseDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getPotentialResponsesAsync() {
    let response = await request
      .get(`/api/v1/settings/potentialResponses`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: POTENTIAL_RESPONSE_LIST,
      potentialResponses: response.body,
    };
  }


  async function createPotentialResponseAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/potentialResponses`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_RESPONSE_CREATE;
        return res;
      },function(err){
          type = POTENTIAL_RESPONSE_ERROR;
          return err.response;
      });

      return {
        type: type,
        potentialResponses: response.body,
      };

  }



  async function deletePotentialResponseAsync(id){
    let response = await request
      .del('/api/v1/settings/potentialResponses/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: POTENTIAL_RESPONSE_DELETE,
        potentialResponses: response.body,
        id:id
      };

  }

  async function updatePotentialResponseAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/potentialResponses/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_RESPONSE_UPDATE;
        return res;
      },function(err){
        type = POTENTIAL_RESPONSE_ERROR;
        return err.response;
      });

      return {
        type: type,
        potentialResponses: response.body,
        id:id
      };

  }
