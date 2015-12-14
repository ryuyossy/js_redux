import request from 'superagent';
import { ECONOMIC_ACTIVITY_LIST, ECONOMIC_ACTIVITY_CREATE, ECONOMIC_ACTIVITY_DELETE, ECONOMIC_ACTIVITY_ERROR,ECONOMIC_ACTIVITY_UPDATE,ECONOMIC_ACTIVITY_DETAIL } from '../constants/ActionTypes';

  export function getEconomicActivities() {
    return dispatch => {
        getEconomicActivitiesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createEconomicActivity(values){
    return dispatch => {
        createEconomicActivityAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteEconomicActivity(id){
      return dispatch => {
            deleteEconomicActivityAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateEconomicActivity(id,values){
      return dispatch => {
            updateEconomicActivityAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getEconomicActivityDetail(id){
      return dispatch => {
          getEconomicActivityDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getEconomicActivitiesAsync() {
    let response = await request
      .get(`/api/v1/settings/economicActivities`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: ECONOMIC_ACTIVITY_LIST,
      economicActivities: response.body,
    };
  }


  async function createEconomicActivityAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/economicActivities`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = ECONOMIC_ACTIVITY_CREATE;
        return res;
      },function(err){
          type = ECONOMIC_ACTIVITY_ERROR;
          return err.response;
      });

      return {
        type: type,
        economicActivities: response.body,
      };

  }



  async function deleteEconomicActivityAsync(id){
    let response = await request
      .del('/api/v1/settings/economicActivities/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: ECONOMIC_ACTIVITY_DELETE,
        economicActivities: response.body,
        id:id
      };

  }

  async function updateEconomicActivityAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/economicActivities/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = ECONOMIC_ACTIVITY_UPDATE;
        return res;
      },function(err){
        type = ECONOMIC_ACTIVITY_ERROR;
        return err.response;
      });

      return {
        type: type,
        economicActivities: response.body,
        id:id
      };

  }
