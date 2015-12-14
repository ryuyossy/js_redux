import request from 'superagent';
import { WEEKEND_LIST, WEEKEND_CREATE, WEEKEND_DELETE, WEEKEND_ERROR,WEEKEND_UPDATE,WEEKEND_DETAIL } from '../constants/ActionTypes';

  export function getWeekends() {
    return dispatch => {
        getWeekendsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



    export function updateWeekend(values){
      return dispatch => {
            updateWeekendAsync(values).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getWeekendsAsync() {
    let response = await request
      .get(`/api/v1/settings/weekends`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: WEEKEND_LIST,
      weekends: response.body,
    };
  }


  async function updateWeekendAsync(values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/weekends`)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = WEEKEND_UPDATE;
        return res;
      },function(err){
        type = WEEKEND_ERROR;
        return err.response;
      });

      return {
        type: type,
        weekends: response.body
      };

  }
