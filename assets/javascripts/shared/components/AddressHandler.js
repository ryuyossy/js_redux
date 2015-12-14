import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';


import * as SettingActions from '../actions/SettingActions';
import * as AreaSettingActions from '../actions/AreaSettingActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class AddressHandler extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeCommune = this.onChangeCommune.bind(this);
    this.onChangeVillage = this.onChangeVillage.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getAddressMap = this.getAddressMap.bind(this);
  }

  onChangeAddress(e){
    let states = {...this.state, address: e.target.value};
    let ret = this.getDefaultValues(states.province, states.district, states.commune, states.village, states.address, this.props.area_master);
    this.props.onChange(ret);
  }

  handleEdit(e){

  }


  componentWillMount(){
    let ret = this.getDefaultValues(this.props.province, this.props.district, this.props.commune, this.props.village, this.props.address, this.props.area_master);
    this.setState(ret);
  }

  getAddressMap(){

    let province =  this.state.province;
    let district =  this.state.district;
    let commune =  this.state.commune;
    let village =  this.state.village;
    let address = this.state.address;

    let values = {
      province: province,
      district: district,
      commune: commune,
      village: village,
      address: address,
    };
    return values;
  }


  handleKeyDown(e){
    if(e.which == 13){ //enter
      if(this.props.update){
        this.props.update();
      }
    }else if(e.which == 27){ //esc

    }
  }


  onChangeProvince(e){
    let states = {...this.state, province: e.target.value};
    let ret = this.getDefaultValues(states.province, states.district, states.commune, states.village, states.address, this.props.area_master);
    this.props.onChange(ret);
  }

  onChangeDistrict(e){
    let states = {...this.state, district: e.target.value};
    let ret = this.getDefaultValues(states.province, states.district, states.commune, states.village, states.address, this.props.area_master);
    this.props.onChange(ret);
  }

  onChangeCommune(e){
    let states = {...this.state, commune: e.target.value};
    let ret = this.getDefaultValues(states.province, states.district, states.commune, states.village, states.address, this.props.area_master);
    this.props.onChange(ret);
  }

  onChangeVillage(e){
    let states = {...this.state, village: e.target.value};
    let ret = this.getDefaultValues(states.province, states.district, states.commune, states.village, states.address, this.props.area_master);
    this.props.onChange(ret);
  }

  componentWillReceiveProps(nextProps,nextState){
    let ret = this.getDefaultValues(nextProps.province, nextProps.district, nextProps.commune, nextProps.village, nextProps.address, nextProps.area_master);
    this.setState(ret);
  }

  getDefaultValues(province, district, commune, village,address,area_master){
    let provinceMaster = area_master;
    let districtMaster = [];
    if(province == null && provinceMaster[0]){
      province = provinceMaster[0].id;
      districtMaster = provinceMaster[0].children;
    }else if(province != null){
      var found = false;
      provinceMaster.forEach((v)=>{
        if(v.id == province){
          districtMaster = v.children;
          found = true
        }
      });
      if(!found && provinceMaster[0]){
        province = provinceMaster[0].id;
      }else if(!found){
        province = null;
      }


    }

    let communeMaster = [];
    if(district == null && districtMaster[0]){
      district = districtMaster[0].id;
      communeMaster = districtMaster[0].children;
    }else if(district != null){
      var found = false;
      districtMaster.forEach((v)=>{
        if(v.id == district){
          communeMaster = v.children;
          found = true
        }
      });

      if(!found && districtMaster[0]){
        district = districtMaster[0].id;
      }else if(!found){
        district = null;
      }

    }

    let villageMaster = [];
    if(commune == null && communeMaster[0]){
      commune = communeMaster[0].id;
      villageMaster = communeMaster[0].children;
    }else if(commune != null){
      var found = false;
      communeMaster.forEach((v)=>{
        if(v.id == commune){
          villageMaster = v.children;
          found = true
        }
      });
      if(!found && communeMaster[0]){
        commune = communeMaster[0].id;
      }else if(!found){
        commune = null;
      }
    }

    if(village == null && villageMaster[0]){
      village = villageMaster[0].id;
    }else if(village != null){
      var found = false;
      villageMaster.forEach((v)=>{
        if(v.id == village){
          found = true
        }
      });
      if(!found && villageMaster[0]){
        village = villageMaster[0].id;
      }else if(!found){
        village = null;
      }

    }


    var masters = {
      provinceMaster: provinceMaster,
      districtMaster: districtMaster,
      communeMaster: communeMaster,
      villageMaster: villageMaster
    }

    let states = {
      address:address,
      province:province,
      district:district,
      commune:commune,
      village:village
    }
    return {...masters, ...states};
  }


  render() {

    if(!this.props.area_master){
      return (<div>Empty Address master</div>);
    }


    let optionsProvince = this.state.provinceMaster.map(function(province) {
      return <option value={province.id} key={province.id}>{province.value}</option>;
    });

    let optionsDistrict = this.state.districtMaster.map(function(district) {
      return <option value={district.id} key={district.id}>{district.value}</option>;
    });

    let optionsCommune = this.state.communeMaster.map(function(commune) {
      return <option value={commune.id} key={commune.id}>{commune.value}</option>;
    });

    let optionsVillage = this.state.villageMaster.map(function(village) {
      return <option value={village.id} key={village.id}>{village.value}</option>;
    });




    return (
      <div className="setting">

        <div className="area">
          <div className="item1">Province</div>
          <div className="item2">
            <select onChange={this.onChangeProvince} className="browser-default" value={this.state.province} >
              {optionsProvince}
            </select>
          </div>
        </div>

        <div className="area">
          <div className="item1">District</div>
          <div className="item2">
            <select onChange={this.onChangeDistrict} className="browser-default" value={this.state.district} >
              {optionsDistrict}
            </select>
          </div>
        </div>


        <div className="area">
          <div className="item1">Commune</div>
          <div className="item2">
            <select onChange={this.onChangeCommune} className="browser-default" value={this.state.commune} >
              {optionsCommune}
            </select>
          </div>
        </div>

        <div className="area">
          <div className="item1">Village</div>
          <div className="item2">
            <select onChange={this.onChangeVillage} className="browser-default" value={this.state.village} >
              {optionsVillage}
            </select>
          </div>
        </div>


        <div className="area">
          <div className="item1">Address</div>
          <div className="item2">
            <input ref="address" value={this.state.address} id="address" type="text" onChange={this.onChangeAddress} className="validate fieldsWidth" onKeyDown={this.handleKeyDown}/>
          </div>
        </div>

      </div>
    );
  }


}


export default AddressHandler;
