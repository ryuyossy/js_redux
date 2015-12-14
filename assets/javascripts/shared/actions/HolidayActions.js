import request from 'superagent';
import { HOLIDAY_LIST, HOLIDAY_CREATE, HOLIDAY_DELETE, HOLIDAY_ERROR,HOLIDAY_UPDATE,HOLIDAY_DETAIL } from '../constants/ActionTypes';


  export function getHolidays() {
    return dispatch => {
        getHolidaysAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createHoliday(date,description){
    return dispatch => {
        createHolidayAsync(date,description).then(result =>{
          return dispatch(result);
        });
    };
  }




    export function deleteHoliday(id){
      return dispatch => {
            deleteHolidayAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateHoliday(id,date,description){
      return dispatch => {
            updateHolidayAsync(id,date,description).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getHolidayDetail(id){
      return dispatch => {
          getHolidayDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getHolidaysAsync() {
    let response = await request
      .get(`/api/v1/settings/holidays`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: HOLIDAY_LIST,
      holidays: response.body,
    };
  }


  async function createHolidayAsync(date,description){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/holidays`)
      .type('form')
      .send({
        date: date,
        description: description,
      })
      .exec().then(function(res){
        type = HOLIDAY_CREATE;
        return res;
      },function(err){
          type = HOLIDAY_ERROR;
          return err.response;
      });

      return {
        type: type,
        holidays: response.body,
      };

  }



  async function deleteHolidayAsync(id){
    let response = await request
      .del('/api/v1/settings/holidays/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: HOLIDAY_DELETE,
        holidays: response.body,
        id:id
      };

  }

  async function updateHolidayAsync(id,date,description){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/holidays/`+id)
      .type('form')
      .send({
        date: date,
        description: description,
      })
      .exec().then(function(res){
        type = HOLIDAY_UPDATE;
        return res;
      },function(err){
        type = HOLIDAY_ERROR;
        return err.response;
      });

      return {
        type: type,
        holidays: response.body,
        id:id
      };

  }
