import request from 'superagent';
import { CUSTOMER_LIST, CUSTOMER_CREATE, CUSTOMER_DELETE, CUSTOMER_ERROR,CUSTOMER_UPDATE,CUSTOMER_DETAIL,POTENTIAL_CUSTOMER_LIST,POTENTIAL_CUSTOMER_CREATE,POTENTIAL_CUSTOMER_DETAIL,CUSTOMER_SEARCH,POTENTIAL_CUSTOMER_SEARCH,POTENTIAL_CUSTOMER_UPDATE,POTENTIAL_CUSTOMER_UPGRADE,POTENTIAL_CUSTOMER_ERROR } from '../constants/ActionTypes';


  export function getCustomers() {
    return dispatch => {
        getCustomersAsync().then(result =>{
          return dispatch(result);
        });
    };
  }


  export function getPotentialCustomers() {
    return dispatch => {
        getPotentialCustomersAsync().then(result =>{
          return dispatch(result);
        });
    };
  }

  export function createCustomer(values){
    return dispatch => {
        createCustomerAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createPotentialCustomer(params){
    return dispatch => {
        createPotentialCustomerAsync(params).then(result =>{
          return dispatch(result);
        });
    };
  }

  export function updatePotentialCustomer(id,values){
    return dispatch => {
          updatePotentialCustomerAsync(id,values).then(result =>{
          return dispatch(result);
        });
    };
  }


  export function upgradeToCustomer(id){
    return dispatch => {
          upgradeToCustomerAsync(id).then(result =>{
          return dispatch(result);
        });
    };
  }







    export function deleteCustomer(id){
      return dispatch => {
            deleteCustomerAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateCustomer(id,values){
      return dispatch => {
            updateCustomerAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getCustomerDetail(id){
      return dispatch => {
          getCustomerDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function getPotentialCustomerDetail(id){
      return dispatch => {
          getPotentialCustomerDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function searchCustomers(values) {
      return dispatch => {
          searchCustomersAsync(values).then(result =>{
            return dispatch(result);
          });
      };
    }

    export function searchPotentialCustomers(values) {
      return dispatch => {
          searchPotentialCustomersAsync(values).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getCustomersAsync() {
    let response = await request
      .get(`/api/v1/customers`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: CUSTOMER_LIST,
      customers: response.body,
    };
  }


  async function getPotentialCustomersAsync() {
    let response = await request
      .get(`/api/v1/potential_customers`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: POTENTIAL_CUSTOMER_LIST,
      potentialCustomer: response.body,
    };
  }

  async function createCustomerAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/customers`)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = CUSTOMER_CREATE;
        return res;
      },function(err){
          type = CUSTOMER_ERROR;
          return err.response;
      });

      return {
        type: type,
        customers: response.body,
      };

  }


  async function createPotentialCustomerAsync(params){
    let type = null;
    let response = await request
      .post(`/api/v1/potential_customers`)
      .type('form')
      .send({
        ...params
      })
      .exec().then(function(res){
        type =  POTENTIAL_CUSTOMER_CREATE;
        return res;
      },function(err){
          type = POTENTIAL_CUSTOMER_ERROR;
          return err.response;
      });

      return {
        type: type,
        potentialCustomers: response.body,
      };
  }


  async function deleteCustomerAsync(id){
    let response = await request
      .del('/api/v1/customers/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: CUSTOMER_DELETE,
        customers: response.body,
        id:id
      };

  }


  async function getCustomerDetailAsync(id){
    let response = await request
      .get('/api/v1/customers/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: CUSTOMER_DETAIL,
        customers: response.body,
        id:id
      };

  }



    async function getPotentialCustomerDetailAsync(id){
      let response = await request
        .get('/api/v1/potential_customers/'+id)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: POTENTIAL_CUSTOMER_DETAIL,
          potentialCustomer: response.body,
          id:id
        };

    }


  async function updateCustomerAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/`+id)
      .type('form')
      .send(values)
      .exec().then(function(res){
        type = CUSTOMER_UPDATE;
        return res;
      },function(err){
        type = CUSTOMER_ERROR;
        return err.response;
      });

      return {
        type: type,
        customers: response.body,
        id:id
      };

  }



    async function upgradeToCustomerAsync(id){
      let type = null;
      let response = await request
        .put(`/api/v1/potential_customers/`+id+`/upgrade`)
        .type('form')
        .exec().then(function(res){
          type = POTENTIAL_CUSTOMER_UPGRADE;
          return res;
        },function(err){
          type = POTENTIAL_CUSTOMER_ERROR;
          return err.response;
        });

        return {
          type: type,
          potentialCustomers: response.body,
          id:id
        };

    }


    async function updatePotentialCustomerAsync(id,values){
      let type = null;
      let response = await request
        .put(`/api/v1/potential_customers/`+id)
        .type('form')
        .send(values)
        .exec().then(function(res){
          type = POTENTIAL_CUSTOMER_UPDATE;
          return res;
        },function(err){
          type = POTENTIAL_CUSTOMER_ERROR;
          return err.response;
        });

        return {
          type: type,
          potentialCustomers: response.body,
          id:id
        };

    }


    async function searchCustomersAsync(values) {
      let response = await request
        .get(`/api/v1/customers_search`)
        .query({
          per_page: 50,
          ...values
        })
        .exec();

      return {
        type: CUSTOMER_SEARCH,
        customers: response.body,
      };
    }


    async function searchPotentialCustomersAsync(values) {
      let response = await request
        .get(`/api/v1/potential_customers_search`)
        .query({
          per_page: 50,
          ...values
        })
        .exec();

      return {
        type: POTENTIAL_CUSTOMER_SEARCH,
        potentialCustomers: response.body,
      };
    }
