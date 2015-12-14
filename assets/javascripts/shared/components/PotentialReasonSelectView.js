import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import MasterSelectView from './MasterSelectView'

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
import {formatDate} from '../utils/utils'


class PotentialReasonSelectView extends MasterSelectView {


}

export default PotentialReasonSelectView;
