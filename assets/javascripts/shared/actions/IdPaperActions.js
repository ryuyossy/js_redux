import request from 'superagent';
import { ID_PAPER_LIST, ID_PAPER_CREATE, ID_PAPER_DELETE, ID_PAPER_ERROR,ID_PAPER_UPDATE,ID_PAPER_DETAIL } from '../constants/ActionTypes';

  export function getIdPapers() {
    return dispatch => {
        getIdPapersAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createIdPaper(values){
    return dispatch => {
        createIdPaperAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteIdPaper(id){
      return dispatch => {
            deleteIdPaperAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateIdPaper(id,values){
      return dispatch => {
            updateIdPaperAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getIdPaperDetail(id){
      return dispatch => {
          getIdPaperDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getIdPapersAsync() {
    let response = await request
      .get(`/api/v1/settings/idPapers`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: ID_PAPER_LIST,
      idPapers: response.body,
    };
  }


  async function createIdPaperAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/idPapers`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = ID_PAPER_CREATE;
        return res;
      },function(err){
          type = ID_PAPER_ERROR;
          return err.response;
      });

      return {
        type: type,
        idPapers: response.body,
      };

  }



  async function deleteIdPaperAsync(id){
    let response = await request
      .del('/api/v1/settings/idPapers/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: ID_PAPER_DELETE,
        idPapers: response.body,
        id:id
      };

  }

  async function updateIdPaperAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/idPapers/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = ID_PAPER_UPDATE;
        return res;
      },function(err){
        type = ID_PAPER_ERROR;
        return err.response;
      });

      return {
        type: type,
        idPapers: response.body,
        id:id
      };

  }
