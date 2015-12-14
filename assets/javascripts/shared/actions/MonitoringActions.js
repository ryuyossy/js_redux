import request from 'superagent';
import { MONITORING_LIST, MONITORING_CREATE, MONITORING_DELETE, MONITORING_ERROR,MONITORING_UPDATE,MONITORING_DETAIL } from '../constants/ActionTypes';

  export function getMonitorings() {
    return dispatch => {
        getMonitoringsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createMonitoring(values){
    return dispatch => {
        createMonitoringAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteMonitoring(id){
      return dispatch => {
            deleteMonitoringAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateMonitoring(id,values){
      return dispatch => {
            updateMonitoringAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getMonitoringDetail(id){
      return dispatch => {
          getMonitoringDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getMonitoringsAsync() {
    let response = await request
      .get(`/api/v1/settings/monitorings`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: MONITORING_LIST,
      monitorings: response.body,
    };
  }


  async function createMonitoringAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/monitorings`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = MONITORING_CREATE;
        return res;
      },function(err){
          type = MONITORING_ERROR;
          return err.response;
      });

      return {
        type: type,
        monitorings: response.body,
      };

  }



  async function deleteMonitoringAsync(id){
    let response = await request
      .del('/api/v1/settings/monitorings/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: MONITORING_DELETE,
        monitorings: response.body,
        id:id
      };

  }

  async function updateMonitoringAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/monitorings/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = MONITORING_UPDATE;
        return res;
      },function(err){
        type = MONITORING_ERROR;
        return err.response;
      });

      return {
        type: type,
        monitorings: response.body,
        id:id
      };

  }
