import { CreateAccountListComponent } from "./memberAccounts/create-account-list/create-account-list.component";

import { ChatComponent } from "./chat/chat.component";
import { MapsModule } from "./maps/maps.module";
import { ChartModule } from "./chart/chart.module";
import { IconsModule } from "./icons/icons.module";
import { TablesModule } from "./tables/tables.module";
import { UiModule } from "./ui/ui.module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { FullCalendarModule } from "@fullcalendar/angular";
import { SimplebarAngularModule } from "simplebar-angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction"; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from "ngx-lightbox";
import { WidgetModule } from "../shared/widget/widget.module";
import { UIModule } from "../shared/ui/ui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardsModule } from "./dashboards/dashboards.module";
import { EcommerceModule } from "./ecommerce/ecommerce.module";
import { CryptoModule } from "./crypto/crypto.module";
import { EmailModule } from "./email/email.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { ProjectsModule } from "./projects/projects.module";
import { TasksModule } from "./tasks/tasks.module";
import { ContactsModule } from "./contacts/contacts.module";
import { BlogModule } from "./blog/blog.module";
import { FilemanagerComponent } from "./filemanager/filemanager.component";
import { BanksComponent } from "./banks/banks.component";
import { MemberTitlesComponent } from "./member-titles/member-titles.component";
import { MaritalstatusComponent } from "./maritalstatus/maritalstatus.component";
import { DataTablesModule } from "angular-datatables";
import { AddSecurityQuestionComponent } from "./memberSettings/SecurityQuestion/add-security-question/add-security-question.component";
import { ViewSecurityQuestionComponent } from "./memberSettings/SecurityQuestion/view-security-question/view-security-question.component";
import { ViewBankComponent } from "./memberSettings/bank/view-bank/view-bank.component";
import { AddBankComponent } from "./memberSettings/bank/add-bank/add-bank.component";
import { ViewBankBranchesComponent } from "./memberSettings/bank-branches/view-bank-branches/view-bank-branches.component";
import { AddBankBranchesComponent } from "./memberSettings/bank-branches/add-bank-branches/add-bank-branches.component";
import { AddCurrencyComponent } from "./memberSettings/currency/add-currency/add-currency.component";
import { ViewCurrencyComponent } from "./memberSettings/currency/view-currency/view-currency.component";
import { AddExchangeRateComponent } from "./memberSettings/exchange-rate/add-exchange-rate/add-exchange-rate.component";
import { ViewExchangeRateComponent } from "./memberSettings/exchange-rate/view-exchange-rate/view-exchange-rate.component";
import { AddMemberStatusComponent } from "./memberSettings/memberStatus/add-member-status/add-member-status.component";
import { ViewMemberStatusComponent } from "./memberSettings/memberStatus/view-member-status/view-member-status.component";
import { AddStructureComponent } from "./memberSettings/structure/add-structure/add-structure.component";
import { ViewStructureComponent } from "./memberSettings/structure/view-structure/view-structure.component";
import { ViewStructureValueComponent } from "./memberSettings/structure/view-structure-value/view-structure-value.component";
import { AddMemberTitleComponent } from "./memberSettings/MemberTitles/add-member-title/add-member-title.component";
import { ViewMemberTitleComponent } from "./memberSettings/MemberTitles/view-member-title/view-member-title.component";
import { AddMaritalStatusComponent } from "./memberSettings/MaritalStatus/add-marital-status/add-marital-status.component";
import { ViewMaritalStatusComponent } from "./memberSettings/MaritalStatus/view-marital-status/view-marital-status.component";
import { AddLevelOfEducationComponent } from "./memberSettings/LevelOfEducation/add-level-of-education/add-level-of-education.component";
import { ViewLevelOfEducationComponent } from "./memberSettings/LevelOfEducation/view-level-of-education/view-level-of-education.component";
import { AddNationalityComponent } from "./memberSettings/Nationalities/add-nationality/add-nationality.component";
import { ViewNationalityComponent } from "./memberSettings/Nationalities/view-nationality/view-nationality.component";
import { UtilityModule } from "./utility/utility.module";
import { CalendarComponent } from "./calendar/calendar.component";
import { AddDocumenttypeComponent } from "./memberSettings/documenttype/add-documenttype/add-documenttype.component";
import { ViewDocumenttypeComponent } from "./memberSettings/documenttype/view-documenttype/view-documenttype.component";
import { AddNumberingSettingsComponent } from "./MainSettings/NumberingSettings/add-numbering-settings/add-numbering-settings.component";
import { ViewNumberingSettingsComponent } from "./MainSettings/NumberingSettings/view-numbering-settings/view-numbering-settings.component";
import { AddPrefixSettingsComponent } from "./MainSettings/PrefixSettings/add-prefix-settings/add-prefix-settings.component";
import { ViewPrefixSettingsComponent } from "./MainSettings/PrefixSettings/view-prefix-settings/view-prefix-settings.component";
import { AddSetupSettingsComponent } from "./MainSettings/SetupSettings/add-setup-settings/add-setup-settings.component";
import { ViewSetupSettingsComponent } from "./MainSettings/SetupSettings/view-setup-settings/view-setup-settings.component";
import { AddMemberComponent } from "./memberRegistration/member/add-member/add-member.component";
import { ViewMemberComponent } from "./memberRegistration/member/view-member/view-member.component";
import { ViewContactsComponent } from "./memberRegistration/contacts/view-contacts/view-contacts.component";
import { AddContactsComponent } from "./memberRegistration/contacts/add-contacts/add-contacts.component";
import { AddChargesComponent } from "./DepositProduct/Charges/add-charges/add-charges.component";
import { ViewChargesComponent } from "./DepositProduct/Charges/view-charges/view-charges.component";
import { NextKinListComponent } from "./memberRegistration/next-kin-list/next-kin-list.component";
import { InsertNextofKinComponent } from "./memberRegistration/next-kin-list/insert-nextof-kin/insert-nextof-kin.component";
import { NextKinComponent } from "./memberRegistration/next-kin-list/next-kin/next-kin.component";
import { BeneficiaryComponent } from "./memberRegistration/beneficiary/beneficiary.component";
import { BeneficiaryListComponent } from "./memberRegistration/beneficiary/beneficiary-list/beneficiary-list.component";
import { CreateBeneficiaryComponent } from "./memberRegistration/beneficiary/create-beneficiary/create-beneficiary.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AccountTransactionService } from "../shared/service/account-transaction.service";
import { LoanApplicationService } from "../shared/service/loan-application.service";
import { PowerFinancialService } from "../shared/service/power-financial.service";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { AddProductChargeComponent } from "./depositProduct/productcharge/add-product-charge/add-product-charge.component";
import { AddProductComponent } from "./depositProduct/product/add-product/add-product.component";
import { ViewProductComponent } from "./depositProduct/product/view-product/view-product.component";
import { UpdateproductchargeComponent } from "./depositProduct/updateproductcharge/updateproductcharge.component";
import { AddLoanCollateralComponent } from "./LoanSettings/Loan collateral/add-loan-collateral/add-loan-collateral.component";
import { ViewLoanCollateralComponent } from "./LoanSettings/Loan collateral/view-loan-collateral/view-loan-collateral.component";
import { AddLoanDonorComponent } from "./LoanSettings/Loan donor/add-loan-donor/add-loan-donor.component";
import { ViewLoanDonorComponent } from "./LoanSettings/Loan donor/view-loan-donor/view-loan-donor.component";
import { AddLoanPurposeComponent } from "./LoanSettings/Loan purpose/add-loan-purpose/add-loan-purpose.component";
import { ViewLoanPurposeComponent } from "./LoanSettings/Loan purpose/view-loan-purpose/view-loan-purpose.component";
import { AddLoanStatusComponent } from "./LoanSettings/Loan status/add-loan-status/add-loan-status.component";
import { ViewLoanStatusComponent } from "./LoanSettings/Loan status/view-loan-status/view-loan-status.component";
import { AddTransactionChargesComponent } from "./transaction/transaction-charges/add-transaction-charges/add-transaction-charges.component";
import { ViewTransactionChargesComponent } from "./transaction/transaction-charges/view-transaction-charges/view-transaction-charges.component";
import { AddWithdrawalComponent } from "./transaction/withdrawal/add-withdrawal/add-withdrawal.component";
import { ViewKinRelationComponent } from "./memberSettings/kin-relation/view-kin-relation/view-kin-relation.component";
import { AddKinRelationComponent } from "./memberSettings/kin-relation/add-kin-relation/add-kin-relation.component";
import { AddTransactionComponent } from "./transaction/add-transaction/add-transaction.component";
import { ViewTransactionComponent } from "./transaction/view-transaction/view-transaction.component";
import { InsertContactComponent } from "./memberRegistration/contacts/insert-contact/insert-contact.component";
import { ParentStructureValueComponent } from "./memberSettings/structureValue/parent-structure-value/parent-structure-value.component";
import { AddLoantypeChargesComponent } from "./LoanSettings/add-loantype-charges/add-loantype-charges.component";
import { AddLoantypeComponent } from "./LoanSettings/add-loantype/add-loantype.component";
import { ViewLoantypeChargesComponent } from "./LoanSettings/view-loantype-charges/view-loantype-charges.component";
import { ViewLoantypeComponent } from "./LoanSettings/view-loantype/view-loantype.component";
import { AddLoanAppraisalComponent } from "./Loans/Loan Appraisal/add-loan-appraisal/add-loan-appraisal.component";
import { ViewLoanAppraisalComponent } from "./Loans/Loan Appraisal/view-loan-appraisal/view-loan-appraisal.component";
import { AddLoanDisbursementComponent } from "./Loans/Loan Disbursement/add-loan-disbursement/add-loan-disbursement.component";
import { ViewLoanDisbursementComponent } from "./Loans/Loan Disbursement/view-loan-disbursement/view-loan-disbursement.component";

import { AddCreditOfficerComponent } from './credit officer/add-credit-officer/add-credit-officer.component';
import { ViewCreditOfficerComponent } from './credit officer/view-credit-officer/view-credit-officer.component';
import { AddCompanyBranchesComponent } from './LoanSettings/CompanyBranches/add-company-branches/add-company-branches.component';
import { ViewCompanyBranchesComponent } from './LoanSettings/CompanyBranches/view-company-branches/view-company-branches.component';
import { AddLoanChargesComponent } from './LoanSettings/LoanCharges/add-loan-charges/add-loan-charges.component';
import { ViewLoanChargesComponent } from './LoanSettings/LoanCharges/view-loan-charges/view-loan-charges.component';
import { AddLoanChargesListTariffComponent } from "./LoanSettings/LoanChargesListTariff/add-loan-charges-list-tariff/add-loan-charges-list-tariff.component";
import { ViewLoanChargesListTariffComponent } from "./LoanSettings/LoanChargesListTariff/view-loan-charges-list-tariff/view-loan-charges-list-tariff.component";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AddLoanApplicationComponent } from './Loans/Loan-Application/add-loan-application/add-loan-application.component';
import { ViewLoanApplicationComponent } from './Loans/Loan-Application/view-loan-application/view-loan-application.component';
import { AddLoanGuarantorComponent } from './LoanSettings/Loan-Guarantor/add-loan-guarantor/add-loan-guarantor.component';
import { ViewLoanGuarantorComponent } from './LoanSettings/Loan-Guarantor/view-loan-guarantor/view-loan-guarantor.component';
import { PipesModule } from 'w-ng5';
import { CollateralComponent } from './LoanSettings/collateral/collateral.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { SearchComponent } from './search/search.component';
import { AddMemberDocumentsComponent } from './memberRegistration/member-documents/add-member-documents/add-member-documents.component';
import { CreateAccountComponent } from './memberAccounts/create-account/create-account.component';
import { SearchMemberComponent } from "./memberAccounts/search-member/search-member.component";
import { AddStructureValueComponent } from './memberSettings/structure/add-structure-value/add-structure-value.component';
import { DisburseChargesComponent } from './Loans/disburse-charges/disburse-charges.component';
import { ViewDisbursedLoanComponent } from './loans/view-disbursed-loan/view-disbursed-loan.component';
import { AddLoanRepaymentsComponent } from './Loans/Loan-Repayments/add-loan-repayments/add-loan-repayments.component';
import { RepaymentComponent } from './Loans/Loan-Repayments/repayment/repayment.component';
import { BalancesComponent } from './Loans/Loan-Repayments/balances/balances.component';
import { LoanRecoveryOrderComponent } from './LoanSettings/loan-recovery-order/loan-recovery-order.component';
import { AddPaymodeComponent } from './memberSettings/PayModes/add-paymode/add-paymode.component';
import { ViewPaymodesComponent } from './memberSettings/PayModes/view-paymodes/view-paymodes.component';
import { AddDepositComponent } from './Transactions/add-deposit/add-deposit.component';

import { AddCompanyBranchComponent } from './MainSettings/CompanyBranches/add-company-branch/add-company-branch.component';
import { ViewCompanyBranchComponent } from './MainSettings/CompanyBranches/view-company-branch/view-company-branch.component';
import { ViewSetupInformationComponent } from './MainSettings/GroupedOptions/view-setup-information/view-setup-information.component';
import { EditSetupInformationComponent } from './MainSettings/GroupedOptions/edit-setup-information/edit-setup-information/edit-setup-information.component';
import { AddHolidayComponent } from './MainSettings/Holidays/add-holiday/add-holiday/add-holiday.component';
import { ViewHolidayComponent } from './MainSettings/Holidays/view-holiday/view-holiday/view-holiday.component';
import { AddFixedDepositsComponent } from './FixedDeposits/add-fixed-deposits/add-fixed-deposits.component';
import { ViewFixedDepositsComponent } from './FixedDeposits/view-fixed-deposits/view-fixed-deposits.component';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
]);

@NgModule({
  declarations: [
    CalendarComponent,
    ChatComponent,
    BanksComponent,
    ViewBankComponent,
    AddBankComponent,
    ViewBankBranchesComponent,
    AddBankBranchesComponent,
    AddCurrencyComponent,
    ViewCurrencyComponent,
    AddExchangeRateComponent,
    ViewExchangeRateComponent,
    ViewSecurityQuestionComponent,
    AddMemberStatusComponent,
    ViewMemberStatusComponent,
    AddStructureComponent,
    ViewStructureComponent,
    ViewStructureValueComponent,
    FilemanagerComponent,
    MemberTitlesComponent,
    MaritalstatusComponent,
    AddMemberTitleComponent,
    ViewMemberTitleComponent,
    AddMaritalStatusComponent,
    ViewMaritalStatusComponent,
    AddLevelOfEducationComponent,
    ViewLevelOfEducationComponent,
    AddNationalityComponent,
    ViewNationalityComponent,
    AddSecurityQuestionComponent,
    AddDocumenttypeComponent,
    ViewDocumenttypeComponent,
    AddNumberingSettingsComponent,
    ViewNumberingSettingsComponent,
    AddPrefixSettingsComponent,
    ViewPrefixSettingsComponent,
    AddSetupSettingsComponent,
    ViewSetupSettingsComponent,
    AddMemberComponent,
    ViewContactsComponent,
    AddContactsComponent,
    AddChargesComponent,
    ViewChargesComponent,
    NextKinListComponent,
    InsertNextofKinComponent,
    NextKinListComponent,
    InsertNextofKinComponent,
    NextKinComponent,
    AddKinRelationComponent,
    BeneficiaryComponent,
    BeneficiaryListComponent,
    CreateBeneficiaryComponent,
    ViewMemberComponent,     
    CreateAccountListComponent,
    AddProductChargeComponent,
    AddProductComponent,
    ViewProductComponent,
    UpdateproductchargeComponent,
    AddLoanCollateralComponent,
    ViewLoanCollateralComponent,
    AddLoanDonorComponent,
    ViewLoanDonorComponent,
    AddLoanPurposeComponent,
    ViewLoanPurposeComponent,
    AddLoanStatusComponent,
    ViewLoanStatusComponent,
    AddTransactionComponent,
    ViewTransactionComponent,
    InsertContactComponent,
    ParentStructureValueComponent,
    AddLoantypeComponent,
    ViewLoantypeComponent,
    AddLoantypeChargesComponent,
    ViewLoantypeChargesComponent,
    AddTransactionChargesComponent,
    ViewTransactionChargesComponent,
    AddWithdrawalComponent,
    ViewKinRelationComponent,
    AddCreditOfficerComponent,
    ViewCreditOfficerComponent,
    AddLoanAppraisalComponent,
    ViewLoanAppraisalComponent,
    AddLoanDisbursementComponent,
    ViewLoanDisbursementComponent,
    AddCompanyBranchesComponent,
    ViewCompanyBranchesComponent,
    AddLoanChargesComponent,
    ViewLoanChargesComponent,
    AddLoanChargesListTariffComponent,
    ViewLoanChargesListTariffComponent,
    AddLoanApplicationComponent,
    ViewLoanApplicationComponent,
    AddLoanGuarantorComponent,
    ViewLoanGuarantorComponent,
    CollateralComponent,
    FilterPipe,
    SearchComponent,
    AddMemberDocumentsComponent,
    CreateAccountComponent,
    SearchMemberComponent,
    AddStructureValueComponent,
    DisburseChargesComponent,
    ViewDisbursedLoanComponent,
    AddLoanRepaymentsComponent,
    RepaymentComponent,
    BalancesComponent,
    LoanRecoveryOrderComponent,
    AddPaymodeComponent,
    ViewPaymodesComponent,
    AddDepositComponent,    
    AddCompanyBranchComponent,
    ViewCompanyBranchComponent,
    ViewSetupInformationComponent,
    EditSetupInformationComponent,
    AddHolidayComponent,
    ViewHolidayComponent,
    AddFixedDepositsComponent,
    ViewFixedDepositsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    CryptoModule,
    EcommerceModule,
    EmailModule,
    InvoicesModule,
    HttpClientModule,
    ProjectsModule,
    UIModule,
    TasksModule,
    ContactsModule,
    BlogModule,
    UtilityModule,
    UiModule,
    TablesModule,
    IconsModule,
    ChartModule,
    WidgetModule,
    MapsModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    DataTablesModule,
    SimplebarAngularModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatDialogModule,
    MatAutocompleteModule,
    PipesModule
    
  ],

  providers: [
    CurrencyPipe,
    PowerFinancialService,
    CurrencyPipe,
    AccountTransactionService,
    LoanApplicationService,
    MatDialogModule,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class PagesModule {}
