import request from 'superagent';
import { GROUP_LIST, GROUP_CREATE, GROUP_DELETE, GROUP_ERROR,GROUP_UPDATE,GROUP_DETAIL,GROUP_SEARCH, GROUP_MEMBER_ADDED,GROUP_MEMBER_DELETED } from '../constants/ActionTypes';


  export function getGroups() {
    return dispatch => {
        getGroupsAsync().then(result =>{
          return dispatch(result);
        });
    };
  }




  export function createGroup(values){
    return dispatch => {
        createGroupAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }




    export function deleteGroup(id){
      return dispatch => {
            deleteGroupAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateGroup(id,values){
      return dispatch => {
            updateGroupAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getGroupDetail(id){
      return dispatch => {
          getGroupDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function searchGroups(values) {
      return dispatch => {
          searchGroupsAsync(values).then(result =>{
            return dispatch(result);
          });
      };
    }

    export function addMemberToGroup(groupId,values) {
      return dispatch => {
          addMemberToGroupAsync(groupId,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function removeGroupMemberFromGroup(groupId,groupMemberId){
      return dispatch => {
            removeGroupMemberFromGroupAsync(groupId,groupMemberId).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getGroupsAsync() {
    let response = await request
      .get(`/api/v1/groups`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: GROUP_LIST,
      groups: response.body,
    };
  }



  async function addMemberToGroupAsync(groupId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/groups/${groupId}/members`)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = GROUP_MEMBER_ADDED;
        return res;
      },function(err){
          type = GROUP_ERROR;
          return err.response;
      });

      return {
        type: type,
        groups: response.body,
      };

  }


  async function createGroupAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/groups`)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = GROUP_CREATE;
        return res;
      },function(err){
          type = GROUP_ERROR;
          return err.response;
      });

      return {
        type: type,
        groups: response.body,
      };

  }

  async function deleteGroupAsync(id){
    let response = await request
      .del('/api/v1/groups/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: GROUP_DELETE,
        groups: response.body,
        id:id
      };

  }



  async function removeGroupMemberFromGroupAsync(groupId,groupMemberId){
    let response = await request
      .del('/api/v1/groups/'+groupId+'/members/'+groupMemberId)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: GROUP_MEMBER_DELETED,
        groups: response.body
      };

  }




  async function getGroupDetailAsync(id){
    let response = await request
      .get('/api/v1/groups/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: GROUP_DETAIL,
        groups: response.body,
        id:id
      };

  }





  async function updateGroupAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/groups/`+id)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = GROUP_UPDATE;
        return res;
      },function(err){
        type = GROUP_ERROR;
        return err.response;
      });

      return {
        type: type,
        groups: response.body,
        id:id
      };

  }




    async function searchGroupsAsync(values) {
      let response = await request
        .get(`/api/v1/groups_search`)
        .query({
          per_page: 50,
          ...values
        })
        .exec();

      return {
        type: GROUP_SEARCH,
        groups: response.body,
      };
    }
