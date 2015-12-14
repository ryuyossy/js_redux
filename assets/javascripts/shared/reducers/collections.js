import request from 'superagent';
import { COLLECTION_LIST, COLLECTION_ERROR,COLLECTION_CREATE,COLLECTION_DELETE,COLLECTION_UPDATE,COLLECTION_DETAIL,COLLECTION_CLEAR_DATA,COLLECTION_SEARCH_CONTRACT } from '../constants/ActionTypes';

const initialState = {collections:[], collectionErrors: null, isCollectionUpdated: false,collection: {}};
export default function collections(state = initialState, action) {

  switch (action.type) {
  case COLLECTION_CLEAR_DATA:
    return  {...initialState, ...state, collectionErrors:null,isCollectionUpdated:false }
  case COLLECTION_LIST:
    var collections =  action.collections.data;
    return {...state,collections: collections, collectionErrors:null,isCollectionUpdated:false};
  case COLLECTION_SEARCH_CONTRACT:
    var collections =  action.collections.data;
    return {...state,collections: collections, collectionErrors:null,isCollectionUpdated:false};
  case COLLECTION_ERROR:
    var errors = action.collections.errors;
    var collectionErrors = null;
    var found = false;
    var ary = state.collections.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      collectionErrors = errors;
    }

    return {...state,collections: ary,collectionErrors: collectionErrors,isCollectionUpdated:false};

  case COLLECTION_CREATE:
    var collections = action.collections.data;
    return {...state, collections: [...state.collections, collections], collectionErrors:null,isCollectionUpdated:true, collection:collections};
  case COLLECTION_UPDATE:
    var collections = action.collections.data;
    var ary = state.collections.map(function(v){
      if(v.id == collections.id){
        return collections;
      }
      return v;
    });
    return {...state,collections: ary, collectionErrors:null,isCollectionUpdated:true};

  case COLLECTION_DELETE:
    var collection = action.collections.data;
    var ary = state.collections.filter(function(v){
      if(v.id == collection.id){
        return false;
      }
      return true;
    });
    return {...state,collections: ary, collectionErrors:null,isCollectionUpdated:true};
  case COLLECTION_DETAIL:
      var collection = action.collection.data;
      return {...state ,collection: collection,collectionErrors:null,isCollectionUpdated:false};
  default:
    return  {...initialState, ...state, collectionErrors:null,isCollectionUpdated:false }
  }
}
