import { ViewLoantypeChargesComponent } from "./LoanSettings/view-loantype-charges/view-loantype-charges.component";
import { AddLoantypeChargesComponent } from "./LoanSettings/add-loantype-charges/add-loantype-charges.component";
import { CreateAccountListComponent } from "./memberAccounts/create-account-list/create-account-list.component";

import { AddChargesComponent } from "./DepositProduct/Charges/add-charges/add-charges.component";
import { ViewChargesComponent } from "./DepositProduct/Charges/view-charges/view-charges.component";
import { NgModule, ɵINJECTOR_IMPL__POST_R3__ } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BanksComponent } from "./banks/banks.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ChatComponent } from "./chat/chat.component";
import { DefaultComponent } from "./dashboards/default/default.component";
import { FilemanagerComponent } from "./filemanager/filemanager.component";
import { AddNumberingSettingsComponent } from "./MainSettings/NumberingSettings/add-numbering-settings/add-numbering-settings.component";
import { ViewNumberingSettingsComponent } from "./MainSettings/NumberingSettings/view-numbering-settings/view-numbering-settings.component";
import { AddPrefixSettingsComponent } from "./MainSettings/PrefixSettings/add-prefix-settings/add-prefix-settings.component";
import { ViewPrefixSettingsComponent } from "./MainSettings/PrefixSettings/view-prefix-settings/view-prefix-settings.component";
import { AddSetupSettingsComponent } from "./MainSettings/SetupSettings/add-setup-settings/add-setup-settings.component";
import { ViewSetupSettingsComponent } from "./MainSettings/SetupSettings/view-setup-settings/view-setup-settings.component";
import { AddMemberTitleComponent } from "./memberSettings/MemberTitles/add-member-title/add-member-title.component";
import { ViewMemberTitleComponent } from "./memberSettings/MemberTitles/view-member-title/view-member-title.component";
import { AddMaritalStatusComponent } from "./memberSettings/MaritalStatus/add-marital-status/add-marital-status.component";
import { ViewMaritalStatusComponent } from "./memberSettings/MaritalStatus/view-marital-status/view-marital-status.component";
import { AddLevelOfEducationComponent } from "./memberSettings/LevelOfEducation/add-level-of-education/add-level-of-education.component";
import { ViewLevelOfEducationComponent } from "./memberSettings/LevelOfEducation/view-level-of-education/view-level-of-education.component";
import { AddNationalityComponent } from "./memberSettings/Nationalities/add-nationality/add-nationality.component";
import { ViewNationalityComponent } from "./memberSettings/Nationalities/view-nationality/view-nationality.component";
import { AddLoanPurposeComponent } from "./LoanSettings/Loan purpose/add-loan-purpose/add-loan-purpose.component";
import { ViewLoanPurposeComponent } from "./LoanSettings/Loan purpose/view-loan-purpose/view-loan-purpose.component";
import { AddLoanCollateralComponent } from "./LoanSettings/Loan collateral/add-loan-collateral/add-loan-collateral.component";
import { ViewLoanCollateralComponent } from "./LoanSettings/Loan collateral/view-loan-collateral/view-loan-collateral.component";
import { AddLoanDonorComponent } from "./LoanSettings/Loan donor/add-loan-donor/add-loan-donor.component";
import { ViewLoanDonorComponent } from "./LoanSettings/Loan donor/view-loan-donor/view-loan-donor.component";
import { AddLoanStatusComponent } from "./LoanSettings/Loan status/add-loan-status/add-loan-status.component";
import { ViewLoanStatusComponent } from "./LoanSettings/Loan status/view-loan-status/view-loan-status.component";
import { AddSecurityQuestionComponent } from "./memberSettings/SecurityQuestion/add-security-question/add-security-question.component";
import { ViewSecurityQuestionComponent } from "./memberSettings/SecurityQuestion/view-security-question/view-security-question.component";
import { AddBankBranchesComponent } from "./memberSettings/bank-branches/add-bank-branches/add-bank-branches.component";
import { ViewBankBranchesComponent } from "./memberSettings/bank-branches/view-bank-branches/view-bank-branches.component";
import { AddBankComponent } from "./memberSettings/bank/add-bank/add-bank.component";
import { ViewBankComponent } from "./memberSettings/bank/view-bank/view-bank.component";
import { AddCurrencyComponent } from "./memberSettings/currency/add-currency/add-currency.component";
import { ViewCurrencyComponent } from "./memberSettings/currency/view-currency/view-currency.component";
import { AddExchangeRateComponent } from "./memberSettings/exchange-rate/add-exchange-rate/add-exchange-rate.component";
import { ViewExchangeRateComponent } from "./memberSettings/exchange-rate/view-exchange-rate/view-exchange-rate.component";
import { AddMemberStatusComponent } from "./memberSettings/memberStatus/add-member-status/add-member-status.component";
import { ViewMemberStatusComponent } from "./memberSettings/memberStatus/view-member-status/view-member-status.component";
import { AddStructureComponent } from "./memberSettings/structure/add-structure/add-structure.component";
import { ViewStructureComponent } from "./memberSettings/structure/view-structure/view-structure.component";
import { AddDocumenttypeComponent } from "./memberSettings/documenttype/add-documenttype/add-documenttype.component";
import { ViewDocumenttypeComponent } from "./memberSettings/documenttype/view-documenttype/view-documenttype.component";
import { AddMemberComponent } from "./memberRegistration/member/add-member/add-member.component";
import { AddContactsComponent } from "./memberRegistration/contacts/add-contacts/add-contacts.component";
import { ViewContactsComponent } from "./memberRegistration/contacts/view-contacts/view-contacts.component";
import { NextKinComponent } from "./memberRegistration/next-kin-list/next-kin/next-kin.component";
import { InsertNextofKinComponent } from "./memberRegistration/next-kin-list/insert-nextof-kin/insert-nextof-kin.component";
import { NextKinListComponent } from "./memberRegistration/next-kin-list/next-kin-list.component";
import { BeneficiaryListComponent } from "./memberRegistration/beneficiary/beneficiary-list/beneficiary-list.component";
import { BeneficiaryComponent } from "./memberRegistration/beneficiary/beneficiary.component";
import { CreateBeneficiaryComponent } from "./memberRegistration/beneficiary/create-beneficiary/create-beneficiary.component";
import { AddProductChargeComponent } from "./depositProduct/productcharge/add-product-charge/add-product-charge.component";
import { AddProductComponent } from "./depositProduct/product/add-product/add-product.component";
import { UpdateproductchargeComponent } from "./depositProduct/updateproductcharge/updateproductcharge.component";
import { ViewProductComponent } from "./depositProduct/product/view-product/view-product.component";
import { AddTransactionComponent } from "./transaction/add-transaction/add-transaction.component";
import { InsertContactComponent } from "./memberRegistration/contacts/insert-contact/insert-contact.component";
import { ParentStructureValueComponent } from "./memberSettings/structureValue/parent-structure-value/parent-structure-value.component";
import { ViewMemberComponent } from "./memberRegistration/member/view-member/view-member.component";
import { ViewStructureValueComponent } from "./memberSettings/structure/view-structure-value/view-structure-value.component";
import { ViewTransactionComponent } from "./transaction/view-transaction/view-transaction.component";
import { AddWithdrawalComponent } from "./transaction/withdrawal/add-withdrawal/add-withdrawal.component";
import { ViewKinRelationComponent } from "./memberSettings/kin-relation/view-kin-relation/view-kin-relation.component";
import { AddKinRelationComponent } from "./memberSettings/kin-relation/add-kin-relation/add-kin-relation.component";
import { AddLoantypeComponent } from "./LoanSettings/add-loantype/add-loantype.component";
import { ViewLoantypeComponent } from "./LoanSettings/view-loantype/view-loantype.component";
import { ViewCreditOfficerComponent } from "./credit officer/view-credit-officer/view-credit-officer.component";
import { AddCreditOfficerComponent } from "./credit officer/add-credit-officer/add-credit-officer.component"
import { AddLoanDisbursementComponent } from "./Loans/Loan Disbursement/add-loan-disbursement/add-loan-disbursement.component";
import { ViewLoanDisbursementComponent } from "./Loans/Loan Disbursement/view-loan-disbursement/view-loan-disbursement.component";
import { AddLoanAppraisalComponent } from "./Loans/Loan Appraisal/add-loan-appraisal/add-loan-appraisal.component";
import { ViewLoanAppraisalComponent } from "./Loans/Loan Appraisal/view-loan-appraisal/view-loan-appraisal.component";

import { AddCompanyBranchesComponent } from "./LoanSettings/CompanyBranches/add-company-branches/add-company-branches.component";
import { ViewCompanyBranchesComponent } from "./LoanSettings/CompanyBranches/view-company-branches/view-company-branches.component";
import { AddLoanChargesComponent } from "./LoanSettings/LoanCharges/add-loan-charges/add-loan-charges.component";
import { ViewLoanChargesComponent } from "./LoanSettings/LoanCharges/view-loan-charges/view-loan-charges.component";
import { AddLoanChargesListTariffComponent } from "./LoanSettings/LoanChargesListTariff/add-loan-charges-list-tariff/add-loan-charges-list-tariff.component";
import { ViewLoanChargesListTariffComponent } from "./LoanSettings/LoanChargesListTariff/view-loan-charges-list-tariff/view-loan-charges-list-tariff.component";
import { AddLoanApplicationComponent } from "./Loans/Loan-Application/add-loan-application/add-loan-application.component";
import { ViewLoanApplicationComponent } from "./Loans/Loan-Application/view-loan-application/view-loan-application.component";
import { SearchComponent } from "./search/search.component";
import { AddMemberDocumentsComponent } from "./memberRegistration/member-documents/add-member-documents/add-member-documents.component";
import { CreateAccountComponent } from "./memberAccounts/create-account/create-account.component";
import { AddStructureValueComponent } from "./memberSettings/structure/add-structure-value/add-structure-value.component";
import { ViewDisbursedLoanComponent } from "./Loans/view-disbursed-loan/view-disbursed-loan.component";
import { AddLoanRepaymentsComponent } from "./Loans/Loan-Repayments/add-loan-repayments/add-loan-repayments.component";
import { RepaymentComponent } from "./Loans/Loan-Repayments/repayment/repayment.component";
import { LoanRecoveryOrderComponent } from "./LoanSettings/loan-recovery-order/loan-recovery-order.component";
import { AddPaymodeComponent } from "./memberSettings/PayModes/add-paymode/add-paymode.component";
import { ViewPaymodesComponent } from "./memberSettings/PayModes/view-paymodes/view-paymodes.component";
import { AddDepositComponent } from "./Transactions/add-deposit/add-deposit.component";
import { AddCompanyBranchComponent } from "./MainSettings/CompanyBranches/add-company-branch/add-company-branch.component";
import { ViewCompanyBranchComponent } from "./MainSettings/CompanyBranches/view-company-branch/view-company-branch.component";
import { ViewSetupInformationComponent } from "./MainSettings/GroupedOptions/view-setup-information/view-setup-information.component";
import { EditSetupInformationComponent } from "./MainSettings/GroupedOptions/edit-setup-information/edit-setup-information/edit-setup-information.component";
import { AddHolidayComponent } from "./MainSettings/Holidays/add-holiday/add-holiday/add-holiday.component";
import { ViewHolidayComponent } from "./MainSettings/Holidays/view-holiday/view-holiday/view-holiday.component";
import { AddFixedDepositsComponent } from "./FixedDeposits/add-fixed-deposits/add-fixed-deposits.component";
import { ViewFixedDepositsComponent } from "./FixedDeposits/view-fixed-deposits/view-fixed-deposits.component";
const routes: Routes = [
  { path: "", redirectTo: "dashboard" },

  { path: "dashboard", component: DefaultComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "chat", component: ChatComponent },
  { path: "filemanager", component: FilemanagerComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
  {
    path: "ecommerce",
    loadChildren: () =>
      import("./ecommerce/ecommerce.module").then((m) => m.EcommerceModule),
  },
  {
    path: "crypto",
    loadChildren: () =>
      import("./crypto/crypto.module").then((m) => m.CryptoModule),
  },
  {
    path: "email",
    loadChildren: () =>
      import("./email/email.module").then((m) => m.EmailModule),
  },
  {
    path: "invoices",
    loadChildren: () =>
      import("./invoices/invoices.module").then((m) => m.InvoicesModule),
  },
  {
    path: "projects",
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "tasks",
    loadChildren: () =>
      import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./utility/utility.module").then((m) => m.UtilityModule),
  },
  {
    path: "ui",
    loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
  },
  {
    path: "form",
    loadChildren: () => import("./form/form.module").then((m) => m.FormModule),
  },
  {
    path: "tables",
    loadChildren: () =>
      import("./tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("./chart/chart.module").then((m) => m.ChartModule),
  },
  {
    path: "maps",
    loadChildren: () => import("./maps/maps.module").then((m) => m.MapsModule),
  },
  { path: "banks", component: BanksComponent },

  { path: "view-prefix-settings", component: ViewPrefixSettingsComponent },

  {
    path: "prefix-settings",
    children: [
      { path: "", component: AddPrefixSettingsComponent },
      { path: "edit/:id", component: AddPrefixSettingsComponent },
    ],
  },
  {
    path: "view-numbering-settings",
    component: ViewNumberingSettingsComponent,
  },

  {
    path: "numbering-settings",
    children: [
      { path: "", component: AddNumberingSettingsComponent },
      { path: "edit/:id", component: AddNumberingSettingsComponent },
    ],
  },
  {
    path: "view-setup-settings",
    component: ViewSetupSettingsComponent,
  },

  {
    path: "setup-settings",
    children: [
      { path: "", component: AddSetupSettingsComponent },
      { path: "edit/:id", component: AddSetupSettingsComponent },
    ],
  },
  { path: "ViewCompanyBranches", component: ViewCompanyBranchComponent },
  {
    path: "CompanyBranches",
    children: [
      { path: "", component: AddCompanyBranchComponent },
      { path: "edit/:id", component: AddCompanyBranchComponent },
    ],
  },
  {
    path: "SetupInformation",
    children: [
      { path: "", component: ViewSetupInformationComponent },
      {path: "edit/:id", component: EditSetupInformationComponent },
    ],
  },
  { path: "ViewSetupInformation", component: ViewSetupInformationComponent },

  { path: "view-charges", component: ViewChargesComponent },

  {
    path: "Holidays",
    children: [
      { path: "", component: AddHolidayComponent },
      {path: "edit/:id", component: AddHolidayComponent },
    ],
  },
  { path: "ViewHolidays", component: ViewHolidayComponent },

  { path: "view-charges", component: ViewChargesComponent },
  {
    path: "charges",
    children: [
      { path: "", component: AddChargesComponent },
      { path: "edit/:id", component: AddChargesComponent },
    ],
  },

  { path: "view-member-titles", component: ViewMemberTitleComponent },

  {
    path: "member-titles",
    children: [
      { path: "", component: AddMemberTitleComponent },
      { path: "edit/:id", component: AddMemberTitleComponent },
    ],
  },
  { path: "view-marital-status", component: ViewMaritalStatusComponent },

  {
    path: "marital-status",
    children: [
      { path: "", component: AddMaritalStatusComponent },
      { path: "edit/:id", component: AddMaritalStatusComponent },
    ],
  },
  { path: "view-level-of-education", component: ViewLevelOfEducationComponent },

  {
    path: "level-of-education",
    children: [
      { path: "", component: AddLevelOfEducationComponent },
      { path: "edit/:id", component: AddLevelOfEducationComponent },
    ],
  },
  { path: "view-nationality", component: ViewNationalityComponent },

  {
    path: "nationality",
    children: [
      { path: "", component: AddNationalityComponent },
      { path: "edit/:id", component: AddNationalityComponent },
    ],
  },
  //loan setting routes
  { path: "view-loan-purpose", component: ViewLoanPurposeComponent },

  {
    path: "loan-purpose",
    children: [
      { path: "", component: AddLoanPurposeComponent },
      { path: "edit/:id", component: AddLoanPurposeComponent },
    ],
  },
  { path: "view-loan-collateral", component: ViewLoanCollateralComponent },

  {
    path: "loan-collateral",
    children: [
      { path: "", component: AddLoanCollateralComponent },
      { path: "edit/:id", component: AddLoanCollateralComponent },
    ],
  },

  { path: "view-loan-donor", component: ViewLoanDonorComponent },

  {
    path: "loan-donor",
    children: [
      { path: "", component: AddLoanDonorComponent },
      { path: "edit/:id", component: AddLoanDonorComponent },
    ],
  },
  { path: "view-loan-status", component: ViewLoanStatusComponent },

  {
    path: "loan-status",
    children: [
      { path: "", component: AddLoanStatusComponent },
      { path: "edit/:id", component: AddLoanStatusComponent },
    ],
  },

  { path: "view-security-question", component: ViewSecurityQuestionComponent },

  {
    path: "security-question",
    children: [
      { path: "", component: AddSecurityQuestionComponent },
      { path: "edit/:id", component: AddSecurityQuestionComponent },
    ],
  },

  {
    path: "bank",
    children: [
      { path: "", component: AddBankComponent },
      { path: "edit/:id", component: AddBankComponent },
    ],
  },
  { path: "view-bank", component: ViewBankComponent },

  {
    path: "bank-branches",
    children: [
      { path: "", component: AddBankBranchesComponent },
      { path: "edit/:id", component: AddBankBranchesComponent },
    ],
  },
  { path: "view-bank-branches", component: ViewBankBranchesComponent },

  {
    path: "currency",
    children: [
      { path: "", component: AddCurrencyComponent },
      { path: "edit/:id", component: AddCurrencyComponent },
    ],
  },
  { path: "view-currency", component: ViewCurrencyComponent },

  {
    path: "exchange-rate",
    children: [
      { path: "", component: AddExchangeRateComponent },
      { path: "edit/:id", component: AddExchangeRateComponent },
    ],
  },
  { path: "view-exchange-rate", component: ViewExchangeRateComponent },
  { path: "view-member-status", component: ViewMemberStatusComponent },
  {
    path: "member-status",
    children: [
      { path: "", component: AddMemberStatusComponent },
      { path: "edit/:id", component: AddMemberStatusComponent },
    ],
  },
  {
    path: "Paymodes",
    children: [
      {path: "",component: AddPaymodeComponent},
      {path: "edit/:id",component: AddPaymodeComponent},
    ],    
  },
  {path: "viewPaymodes",component: ViewPaymodesComponent},
  { path: "view-structure", component: ViewStructureComponent },
  {
    path: "structure",
    children: [
      { path: "", component: AddStructureComponent },
      { path: "edit/:id", component: AddStructureComponent },
    ],
  },
  {
    path: "document-type",
    children: [
      { path: "", component: AddDocumenttypeComponent },
      { path: "edit/:id", component: AddDocumenttypeComponent },
    ],
  },
  { path: "view-document-type", component: ViewDocumenttypeComponent },

  {
    path: "member",
    children: [
      { path: "", component: AddMemberComponent },
      { path: "edit/:id", component: AddMemberComponent },
    ],
  },
  { path: "view-member", component: ViewMemberComponent },

  {
    path: "contacts",
    children: [
      { path: "", component: AddContactsComponent },
      { path: "edit/:id", component: AddContactsComponent },
    ],
  },
  {
    path: "view-contacts",
    children: [
      { path: "", component: ViewContactsComponent },
      { path: "edit/:id", component: ViewContactsComponent },
    ],
  },

  {
    path: "next-kin",
    children: [
      { path: "", component: NextKinComponent },
      { path: "edit/:id", component: NextKinComponent },
    ],
  },
  {
    path: "insert-next-kin",
    children: [
      { path: "", component: InsertNextofKinComponent },
      { path: "get/:id", component: InsertNextofKinComponent },
    ],
  },
  {
    path: "next-kin-list",
    children: [
      { path: "", component: NextKinListComponent },
      { path: "get/:id", component: NextKinListComponent },
    ],
  },
  {
    path: "beneficiary-list",
    children: [
      { path: "", component: BeneficiaryListComponent },
      { path: "get/:id", component: BeneficiaryListComponent },
    ],
  },
  {
    path: "beneficiary",
    children: [
      { path: "", component: BeneficiaryComponent },
      { path: "edit/:id", component: BeneficiaryComponent },
    ],
  },
  {
    path: "Create-beneficiary",
    children: [
      { path: "", component: CreateBeneficiaryComponent },
      { path: "edit/:id", component: CreateBeneficiaryComponent },
    ],
  },
  {
    path: "create-account",
    children: [
      { path: "", component: CreateAccountComponent },
      { path: "edit/:id", component: CreateAccountComponent },
    ],
  },
  { path: "create-account-list", component: CreateAccountListComponent },
  {
    path: "products",
    children: [
      { path: "", component: AddProductComponent },
      { path: "edit/:id", component: AddProductComponent },
    ],
  },
  { path: "view-products", component: ViewProductComponent },
  {
    path: "FixedDeposit",
    children: [
      { path: "", component: AddFixedDepositsComponent },
      { path: "edit/:id", component: AddFixedDepositsComponent },
    ],
  },
  { path: "ViewFixedDeposit", component: ViewFixedDepositsComponent },
  {
    path: "insert-charge",
    children: [
      { path: "", component: AddProductChargeComponent },
      { path: "edit/:id", component: AddProductChargeComponent },
    ],
  },
  {
    path: "add-transaction",
    children: [
      { path: "", component: AddTransactionComponent },
      { path: "edit/:id", component: AddTransactionComponent },
    ],
  },
  {
    path: "insert-contact",
    children: [
      { path: "", component: InsertContactComponent },
      { path: "edit/:id", component: InsertContactComponent },
    ],
  },
  {
    path: "update-charge",
    children: [
      { path: "", component: UpdateproductchargeComponent },
      { path: "edit/:id", component: UpdateproductchargeComponent },
    ],
  },
  {
    path: "deposit-transaction",
    children: [
      { path: "", component: AddDepositComponent },//AddTransactionComponent
      { path: "edit/:id", component: AddDepositComponent },//AddTransactionComponent
    ],
  },
  { path: "view-transaction", component: ViewTransactionComponent },

  {
    path: "update-charge",
    children: [
      { path: "", component: UpdateproductchargeComponent },
      { path: "edit/:id", component: UpdateproductchargeComponent },
    ],
  },
  //credit officer routes
  { path: "view-credit-officer", component: ViewCreditOfficerComponent },
  {
    path: "credit-officer",
    children: [
      { path: "", component: AddCreditOfficerComponent },
      { path: "edit/:id", component: AddCreditOfficerComponent },
    ],
  },

  { path: "Parent-structure-value", component: ParentStructureValueComponent },
  { path: "structurevalue-list", component: ViewStructureValueComponent },

  {
    path: "structure",
    children: [
      { path: "", component: AddStructureComponent },
      { path: "insert/:id", component: AddStructureComponent },
    ],
  },
  { path: "structure-list", component: ViewStructureComponent },

  {
    path: "withdrawal",
    children: [
      { path: "", component: AddWithdrawalComponent },
      { path: "edit/:id", component: AddWithdrawalComponent },
    ],
  },
  { path: "Parent-structure-value", component: ParentStructureValueComponent },
  { path: "structurevalue-list", component: ViewStructureValueComponent },
  {
    path: "loan-type",
    children: [
      { path: "", component: AddLoantypeComponent },
      { path: "edit/:id", component: AddLoantypeComponent },
    ],
  },
  { path: "loan-type-list", component: ViewLoantypeComponent },

  {
    path: "loan-typecharges",
    children: [
      { path: "", component: AddLoantypeChargesComponent },
      { path: "edit/:id", component: AddLoantypeChargesComponent },
    ],
  },
  { path: "loan-typecharges-list", component: ViewLoantypeChargesComponent },

  {
    path: "kin-relation",
    children: [
      { path: "", component: AddKinRelationComponent },
      { path: "edit/:id", component: AddKinRelationComponent },
    ],
  },
  { path: "view-kin-relation", component: ViewKinRelationComponent },
  //Loans routing
  { path: "view-loan-appraisal", component: ViewLoanAppraisalComponent },
  {
    path: "loan-appraisal",
    children: [
      { path: "", component: AddLoanAppraisalComponent },
      { path: "edit/:id", component: AddLoanAppraisalComponent },
    ],
  },
  { path: "view-loan-disbursement", component: ViewLoanDisbursementComponent },
  {
    path: "loan-disbursement",
    children: [
      { path: "", component: AddLoanDisbursementComponent },
      { path: "edit/:id", component: AddLoanDisbursementComponent },
    ],
  },

  {path:"view-company-branches",component:ViewCompanyBranchesComponent},
  {
    path: "company-branches",
    children: [
      { path: "", component: AddCompanyBranchesComponent },
      { path: "edit/:id", component: AddCompanyBranchesComponent },
    ],
  },

  {
    path:'Loan-Charges', children:[
      {path:'', component:AddLoanChargesComponent},
      {path:'edit/:id', component:  AddLoanChargesComponent}
            ]
  },
  {path:'View-Loan-Charges',component:ViewLoanChargesComponent},

  {
    path:'Loan-Charges-Tariff', children:[
      {path:'', component:AddLoanChargesListTariffComponent},
      {path:'edit/:id', component:  AddLoanChargesListTariffComponent}
            ]
  },
  {path:'View-Loan-Charges-Tariff',component:ViewLoanChargesListTariffComponent},

  {
    path:'loan-application', children:[
      {path:'', component:AddLoanApplicationComponent },
      {path:'edit/:id', component:AddLoanApplicationComponent}
  
    ]
  },
  {path:'loan-application-list',component:ViewLoanApplicationComponent},
  {path:'search',component:SearchComponent},

   {
    path:'document',children:[
   { path:'',component:AddMemberDocumentsComponent},
   {path:'edit/:id',component:AddMemberDocumentsComponent},
    
    ]
  },
  {
    path:'structure-value', children:[
      {path:'', component:AddStructureValueComponent},
      {path:'edit/:id', component:  AddStructureValueComponent},
    ]
  },
  {
    path:'loan-appraised', children:[
      {path:'', component:AddLoanAppraisalComponent },
      {path:'edit/:id', component:AddLoanAppraisalComponent}
  
    ]
  },
  {path:'loan-Appraisals-list',component:ViewLoanAppraisalComponent},
  {path:'loan-disbersement-list',component:ViewLoanDisbursementComponent},

  {
    path:'disbersement', children:[
      {path:'', component:AddLoanDisbursementComponent},
      {path:'edit/:id', component:  AddLoanDisbursementComponent}
            ]
  },
  {
    path:'repayment', children:[
      {path:'', component:RepaymentComponent},
      {path:'edit/:id', component: RepaymentComponent}
  ]
  },  
   {path:'loan-repayment',component:AddLoanRepaymentsComponent} ,
   {
    path:'loan-recovery', children:[
      {path:'', component:LoanRecoveryOrderComponent},
      {path:'edit/:id', component:LoanRecoveryOrderComponent }
  ]
  },
  {path:'loan-recovery-order',component:LoanRecoveryOrderComponent}   
]; 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

  providers: [],
})
export class PagesRoutingModule {}
