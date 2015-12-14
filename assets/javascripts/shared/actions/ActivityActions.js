import request from 'superagent';
import { ACTIVITY_LIST, ACTIVITY_CREATE, ACTIVITY_DELETE, ACTIVITY_ERROR,ACTIVITY_UPDATE,ACTIVITY_DETAIL,ACTIVITY_CLEAR,ACTIVITY_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

  export function getActivities(customerId) {
    return dispatch => {
        getActivitiesAsync(customerId).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function createActivity(customerId,values){
    return dispatch => {
        createActivityAsync(customerId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteActivity(customerId,id){
      return dispatch => {
            deleteActivityAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateActivity(customerId,id,values){
      return dispatch => {
            updateActivityAsync(customerId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getActivityDetail(customerId,id){
      return dispatch => {
          getActivityDetailAsync(customerId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getActivitiesAsync(customerId) {
    let response = await request
      .get(`/api/v1/potential_customers/${customerId}/activities`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: ACTIVITY_LIST,
      activities: response.body,
    };
  }


  async function createActivityAsync(customerId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/potential_customers/${customerId}/activities`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = ACTIVITY_CREATE;
        return res;
      },function(err){
          type = ACTIVITY_ERROR;
          return err.response;
      });

      return {
        type: type,
        activities: response.body,
      };

  }



  async function deleteActivityAsync(customerId,id){
    let response = await request
      .del(`/api/v1/potential_customers/${customerId}/activities/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: ACTIVITY_DELETE,
        activities: response.body,
        id:id
      };

  }

  async function updateActivityAsync(customerId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/potential_customers/${customerId}/activities/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = ACTIVITY_UPDATE;
        return res;
      },function(err){
        type = ACTIVITY_ERROR;
        return err.response;
      });

      return {
        type: type,
        activities: response.body,
        id:id
      };

  }


    async function getActivityDetailAsync(customerId,id){
      let response = await request
        .get(`/api/v1/potential_customers/${customerId}/activities/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: ACTIVITY_DETAIL,
          activity: response.body,
          id:id
        };

    }
