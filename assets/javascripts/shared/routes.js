import React from 'react';
import { Route, IndexRoute } from 'react-router';
import UserHandler from './components/UserHandler';
import AppHandler from './components/AppHandler';
import LoginHandler from './components/LoginHandler';
import DashboardHandler from './components/DashboardHandler';
import SettingHandler from './components/SettingHandler';
import AreaSettingHandler from './components/AreaSettingHandler';
import CustomerHandler from './components/CustomerHandler';
import CustomerEditHandler from './components/CustomerEditHandler';
import CustomerDetailView from './components/CustomerDetailView';
import CustomerSearchHandler from './components/CustomerSearchHandler';
import CustomerSearchResultHandler from './components/CustomerSearchResultHandler';

import LoanContractDetailView from './components/LoanContractDetailView';
import LoanContractEditView from './components/LoanContractEditView';
import LoanContractFormView from './components/LoanContractFormView';
import GuarantorFormView from './components/GuarantorFormView';
import GuarantorDetailView from './components/GuarantorDetailView';
import GuarantorEditView from './components/GuarantorEditView';

import LoanContractCollateralFormView from './components/LoanContractCollateralFormView';
import LoanContractCollateralDetailView from './components/LoanContractCollateralDetailView';
import LoanContractCollateralEditView from './components/LoanContractCollateralEditView';

import AlertHandler from './components/AlertHandler';
import TaskHandler from './components/TaskHandler';

import CompanySettingView from './components/CompanySettingView';
import MFSettingView from './components/MFSettingView';
import AdminSettingView from './components/AdminSettingView';
import LoanProductHandler from './components/LoanProductHandler';
import CollateralHandler from './components/CollateralHandler';

import PotentialCustomerSearchHandler from './components/PotentialCustomerSearchHandler';
import PotentialCustomerSearchResultHandler from './components/PotentialCustomerSearchResultHandler';
import PotentialCustomerHandler from './components/PotentialCustomerHandler';
import PotentialCustomerDetailView from './components/PotentialCustomerDetailView';
import PotentialCustomerEditHandler from './components/PotentialCustomerEditHandler';

import LoanProductDetailView from './components/LoanProductDetailView';
import CollateralDetailView from './components/CollateralDetailView';

import CollectionSearchContractHandler from './components/CollectionSearchContractHandler';
import CollectionSearchContractResultHandler from './components/CollectionSearchContractResultHandler';

import BorrowingSituationEditView from './components/BorrowingSituationEditView';

import FamilyEditView from './components/FamilyEditView';

import ActivityEditView from './components/ActivityEditView';

import CustomerAddHandler from './components/CustomerAddHandler';

import GroupAddHandler from './components/GroupAddHandler';
import GroupEditHandler from './components/GroupEditHandler';
import GroupDetailHandler from './components/GroupDetailHandler';
import GroupSearchHandler from './components/GroupSearchHandler';
import GroupSearchResultHandler from './components/GroupSearchResultHandler';

import RepaymentScheduleHandler from './components/RepaymentScheduleHandler';

import CollectionDetailHandler from './components/CollectionDetailHandler';


let scrollToTop = (location, replaceWith) => {window.scrollTo( 0 , 0 )};


let Routes = (
  <Route name="app" path="/" component={AppHandler}>
    <IndexRoute component={LoginHandler}/>
    <Route name="login_page" path="/session" component={LoginHandler} />
    <Route name="dashboard" path="/dashboard" component={DashboardHandler} />

    <Route name="users" path="/users" component={UserHandler} />

    <Route name="customers" path="/customers" component={CustomerHandler} />
    <Route name="customers_search" path="/customers_search" component={CustomerSearchHandler} />
    <Route name="customers_search_result" path="/customers_search_result" component={CustomerSearchResultHandler} />
    <Route name="customers_new" path="/customers/new" component={CustomerAddHandler} />
    <Route name="customer_detail" path="/customers/:id" component={CustomerDetailView} />
    <Route name="customer_edit" path="/customers/:id/edit" component={CustomerEditHandler} />
    <Route name="customers_borrowing_situation_edit" path="/customers/:id/borrowing_situations/edit" component={BorrowingSituationEditView} />
    <Route name="customers_borrowing_situation_detail" path="/customers/:id/borrowing_situations" component={BorrowingSituationEditView} />


    <Route name="alerts"  component={AlertHandler} />

    <Route name="tasks"  component={TaskHandler} />

    <Route name="company_setting" path="/settings/company" component={CompanySettingView} />
    <Route name="area_setting" path="/area_settings" component={AreaSettingHandler} />
    <Route name="mf_setting" path="/settings/mf" component={MFSettingView} />
    <Route name="loan_products" path="/settings/loanProducts" component={LoanProductHandler} />
    <Route name="loan_product_detail" path="/settings/loanProducts/:id" component={LoanProductDetailView} />

    <Route name="loan_contract_new" path="/customers/:customer_id/loanContracts" component={LoanContractFormView} />
    <Route name="loan_contract_detail" path="/customers/:customer_id/loanContracts/:loan_contract_id" component={LoanContractDetailView} />
    <Route name="loan_contract_edit" path="/customers/:customer_id/loanContracts/:loan_contract_id/edit" component={LoanContractEditView} />

    <Route name="repayment_schedules" path="/customers/:customer_id/loanContracts/:loan_contract_id/repayment_schedules" component={RepaymentScheduleHandler} />


    <Route name="guarantor_new" onEnter={scrollToTop} path="/customers/:customer_id/loanContracts/:loan_contract_id/guarantors" component={GuarantorFormView} />
    <Route name="guarantor_detail" path="/customers/:customer_id/loanContracts/:loan_contract_id/guarantors/:id" component={GuarantorDetailView} />
    <Route name="guarantor_edit" path="/customers/:customer_id/loanContracts/:loan_contract_id/guarantors/:id/edit" component={GuarantorEditView} />

    <Route name="loan_contract_collateral_new" onEnter={scrollToTop} path="/customers/:customer_id/loanContracts/:loan_contract_id/collaterals" component={LoanContractCollateralFormView} />
    <Route name="loan_contract_collateral_detail" path="/customers/:customer_id/loanContracts/:loan_contract_id/collaterals/:id" component={LoanContractCollateralDetailView} />
    <Route name="loan_contract_collateral_edit" path="/customers/:customer_id/loanContracts/:loan_contract_id/collaterals/:id/edit" component={LoanContractCollateralEditView} />

    <Route name="collaterals" path="/settings/collaterals" component={CollateralHandler} />
    <Route name="collateral_detail" path="/settings/collaterals/:id" component={CollateralDetailView} />

    <Route name="admin_setting" path="/settings/admin" component={AdminSettingView} />

    <Route name="potential_customers_search" path="/potential_customers_search" component={PotentialCustomerSearchHandler} />
    <Route name="potential_customers_search_result" path="/potential_customers_search_result" component={PotentialCustomerSearchResultHandler} />

    <Route name="potential_customers_new" path="/potential_customers/new" component={PotentialCustomerHandler} />
    <Route name="potential_customer_detail" path="/potential_customers/:id" component={PotentialCustomerDetailView} />
    <Route name="potential_customer_edit" path="/potential_customers/:id/edit" component={PotentialCustomerEditHandler} />
    <Route name="potential_customers" path="/potential_customers" component={CustomerHandler} />

    <Route name="potential_customers_borrowing_situation_edit" path="/potential_customers/:id/borrowing_situations/edit" component={BorrowingSituationEditView} />
    <Route name="potential_customers_borrowing_situation_detail" path="/potential_customers/:id/borrowing_situations" component={BorrowingSituationEditView} />


    <Route name="potential_customers_activity_edit" path="/potential_customers/:id/activities/edit" component={ActivityEditView} />
    <Route name="potential_customers_activity_detail" path="/potential_customers/:id/activities" component={ActivityEditView} />

    <Route name="customers_family_edit" path="/potential_customers/:id/families/edit" component={FamilyEditView} />
    <Route name="customers_family_detail" path="/customers/:id/families" component={FamilyEditView} />



    <Route name="collection_search_contract" path="/collection_search_contract" component={CollectionSearchContractHandler} />
    <Route name="collection_search_contract_result" path="/collection_search_contract_result" component={CollectionSearchContractResultHandler} />
    <Route name="collection_detail" path="/customers/:customer_id/loanContracts/:loan_contract_id/collections" component={CollectionDetailHandler} />


    <Route name="group_new" path="/groups/new" component={GroupAddHandler} />
    <Route name="group_edit" path="/groups/:id/edit" component={GroupEditHandler} />
    <Route name="group_detail" path="/groups/:id" component={GroupDetailHandler} />
    <Route name="groups_search" path="/groups_search" component={GroupSearchHandler} />
    <Route name="groups_search_result" path="/groups_search_result" component={GroupSearchResultHandler} />

  </Route>
);



export default Routes;
