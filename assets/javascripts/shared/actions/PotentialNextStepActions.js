import request from 'superagent';
import { POTENTIAL_NEXT_STEP_LIST, POTENTIAL_NEXT_STEP_CREATE, POTENTIAL_NEXT_STEP_DELETE, POTENTIAL_NEXT_STEP_ERROR,POTENTIAL_NEXT_STEP_UPDATE,POTENTIAL_NEXT_STEP_DETAIL } from '../constants/ActionTypes';

  export function getPotentialNextSteps() {
    return dispatch => {
        getPotentialNextStepsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createPotentialNextStep(values){
    return dispatch => {
        createPotentialNextStepAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deletePotentialNextStep(id){
      return dispatch => {
            deletePotentialNextStepAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updatePotentialNextStep(id,values){
      return dispatch => {
            updatePotentialNextStepAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getPotentialNextStepDetail(id){
      return dispatch => {
          getPotentialNextStepDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getPotentialNextStepsAsync() {
    let response = await request
      .get(`/api/v1/settings/potentialNextSteps`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: POTENTIAL_NEXT_STEP_LIST,
      potentialNextSteps: response.body,
    };
  }


  async function createPotentialNextStepAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/potentialNextSteps`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_NEXT_STEP_CREATE;
        return res;
      },function(err){
          type = POTENTIAL_NEXT_STEP_ERROR;
          return err.response;
      });

      return {
        type: type,
        potentialNextSteps: response.body,
      };

  }



  async function deletePotentialNextStepAsync(id){
    let response = await request
      .del('/api/v1/settings/potentialNextSteps/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: POTENTIAL_NEXT_STEP_DELETE,
        potentialNextSteps: response.body,
        id:id
      };

  }

  async function updatePotentialNextStepAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/potentialNextSteps/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = POTENTIAL_NEXT_STEP_UPDATE;
        return res;
      },function(err){
        type = POTENTIAL_NEXT_STEP_ERROR;
        return err.response;
      });

      return {
        type: type,
        potentialNextSteps: response.body,
        id:id
      };

  }
