import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoanTypes } from "./loan-types.model";

@Injectable({
  providedIn: "root",
})
export class LoansService {
  constructor(private http: HttpClient) {}
  //readonly baseURL='http://localhost:51288/';
  formData: LoanTypes = new LoanTypes();

  AddLoanType() {
    return this.http.post("http://localhost:51288/Loan/New", this.formData);
  }
  /*GetLoanTypes(){
    return this.http.get('http://localhost:51288/Loan/GetLoanTypes')
  }*/

  AddCollateral(CollateralName, HasTimeLimit, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Collateral/AddCollateral?CollateralName=" +
        CollateralName +
        "&&HasTimeLimit=" +
        HasTimeLimit +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  getAllCollateral() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Collateral/getAllCollateral"
    );
  }

  getCollateral(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Collateral/getCollateral?id=" + id + ""
    );
  }
  UpdateCollateral(CollateralId, CollateralName, HasTimeLimit, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Collateral/UpdateCollateral?CollateralId=" +
        CollateralId +
        "&&CollateralName=" +
        CollateralName +
        "&&HasTimeLimit=" +
        HasTimeLimit +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  DeleteCollateral(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Collateral/DeleteCollateral?id=" +
        id +
        ""
    );
  }
  AddLoanPurpose(Name, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AddLoanPurpose?Name=" +
        Name +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  getAllLoanPurposes() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanPurposes"
    );
  }
  getLoanPurpose(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoanPurpose?id=" + id + ""
    );
  }
  UpdateLoanPurpose(LoanPurposeId, Name, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/UpdateLoanPurpose?LoanPurposeId=" +
        LoanPurposeId +
        "&&Name=" +
        Name +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  DeleteLoanPurpose(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanPurpose?id=" + id + ""
    );
  }

  AddLoanApplication(
    LoanTypeId,
    MemberId,
    Code,
    ManualRef,
    LoanAmount,
    InterestRate,
    ApplicationDate,
    PeriodFrequency,
    RepayPeriod,
    IsMarkUpBased,
    MarkupAmount,
    InterestType,
    Status,
    StatusDate,
    PurposeId,
    GrossPay,
    NetPay,
    LoanSeries,
    TotalShares,
    FreeShares,
    IsMigrated,
    CreditOfficerId,
    DonorId,
    CurrencyId,
    BranchId,
    Delete
  ) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AddLoanApplication?LoanTypeId=" +
        LoanTypeId +
        "&&MemberId=" +
        MemberId +
        " &&Code=" +
        Code +
        "&&ManualRef=" +
        ManualRef +
        "&&LoanAmount=" +
        LoanAmount +
        "&&InterestRate=" +
        InterestRate +
        "&&ApplicationDate=" +
        ApplicationDate +
        "&&PeriodFrequency=" +
        PeriodFrequency +
        "&&RepayPeriod=" +
        RepayPeriod +
        "&&IsMarkUpBased=" +
        IsMarkUpBased +
        "&&MarkupAmount=" +
        MarkupAmount +
        "&&Interest=" +
        InterestType +
        "&&Status=" +
        Status +
        "&&StatusDate=" +
        StatusDate +
        "&&PurposeId=" +
        PurposeId +
        "&&GrossPay=" +
        GrossPay +
        "&&NetPay=" +
        NetPay +
        "&&LoanSeries=" +
        LoanSeries +
        "&&TotalShares=" +
        TotalShares +
        "&&FreeShares=" +
        FreeShares +
        "&&IsMigrated=" +
        IsMigrated +
        "&&CreditOfficerId=" +
        CreditOfficerId +
        "&&DonorId=" +
        DonorId +
        "&&CurrencyId=" +
        CurrencyId +
        "&&BranchId=" +
        BranchId +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  UpdateLoanApplication(
    LoanId,
    LoanTypeId,
    MemberId,
    Code,
    ManualRef,
    LoanAmount,
    InterestRate,
    ApplicationDate,
    PeriodFrequency,
    RepayPeriod,
    IsMarkUpBased,
    MarkupAmount,
    InterestType,
    Status,
    StatusDate,
    PurposeId,
    GrossPay,
    NetPay,
    LoanSeries,
    TotalShares,
    FreeShares,
    IsMigrated,
    CreditOfficerId,
    DonorId,
    CurrencyId,
    BranchId,
    Delete
  ) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/UpdateLoanApplication?LoanId=" +
        LoanId +
        "&&LoanTypeId=" +
        LoanTypeId +
        "&&MemberId=" +
        MemberId +
        " &&Code=" +
        Code +
        "&&ManualRef=" +
        ManualRef +
        "&&LoanAmount=" +
        LoanAmount +
        "&&InterestRate=" +
        InterestRate +
        "&&ApplicationDate=" +
        ApplicationDate +
        "&&PeriodFrequency=" +
        PeriodFrequency +
        "&&RepayPeriod=" +
        RepayPeriod +
        "&&IsMarkUpBased=" +
        IsMarkUpBased +
        "&&MarkupAmount=" +
        MarkupAmount +
        "&&Interest=" +
        InterestType +
        "&&Status=" +
        Status +
        "&&StatusDate=" +
        StatusDate +
        "&&PurposeId=" +
        PurposeId +
        "&&GrossPay=" +
        GrossPay +
        "&&NetPay=" +
        NetPay +
        "&&LoanSeries=" +
        LoanSeries +
        "&&TotalShares=" +
        TotalShares +
        "&&FreeShares=" +
        FreeShares +
        "&&IsMigrated=" +
        IsMigrated +
        "&&CreditOfficerId=" +
        CreditOfficerId +
        "&&DonorId=" +
        DonorId +
        "&&CurrencyId=" +
        CurrencyId +
        "&&BranchId=" +
        BranchId +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  AddLoanCollateral(
    LoanId,
    ColleteralId,
    OwnerName,
    RegistrationDetails,
    ActualValue,
    ForcedSaleValue,
    Remarks,
    ExpiryDate,
    Delete
  ) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AddLoanCollateral?LoanId=" +
        LoanId +
        "&&CollateralId=" +
        ColleteralId +
        "&&OwnerName=" +
        OwnerName +
        "&&RegistrationDetails=" +
        RegistrationDetails +
        "&&ActualValue=" +
        ActualValue +
        "&&ForcedSaleValue=" +
        ForcedSaleValue +
        "&&Remarks=" +
        Remarks +
        "&&ExpiryDate=" +
        ExpiryDate +
        "&&Delete=" +
        Delete +
        ""
    );
    // http://micropointlive.com/Upgrade/Loan/AddLoanCollateral?LoanId='+LoanId+'&&CollateralId='+ColleteralId+'&&OwnerName='+OwnerName+'&&RegistrationDetails='+RegistrationDetails+'&&ActualValue='+ActualValue+'&&ForcedSaleValue='+ForcedSaleValue+'&&Remarks='+Remarks+'&&ExpiryDate='+ExpiryDate+'&&Delete='+Delete+'
  }
  getAllLoanCollateral(LoanId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanCollateral?LoanId=" +
        LoanId +
        ""
    );
  }
  getLoanCollateral(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoanCollateral?id=" + id + ""
    );
  }
  UpdateLoanCollateral(
    LoanCollateralId,
    LoanId,
    ColleteralId,
    OwnerName,
    RegistrationDetails,
    ActualValue,
    ForcedSaleValue,
    Remarks,
    ExpiryDate,
    Delete
  ) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/UpdateLoanCollateral?LoanCollateralId=" +
        LoanCollateralId +
        "&&LoanId=" +
        LoanId +
        "&&CollateralId=" +
        ColleteralId +
        "&&OwnerName=" +
        OwnerName +
        "&&RegistrationDetails=" +
        RegistrationDetails +
        "&&ActualValue=" +
        ActualValue +
        "&&ForcedSaleValue=" +
        ForcedSaleValue +
        "&&Remarks=" +
        Remarks +
        "&&ExpiryDate=" +
        ExpiryDate +
        "&&Delete=" +
        Delete +
        ""
    );
    // http://micropointlive.com/Upgrade/Loan/AddLoanCollateral?LoanId='+LoanId+'&&CollateralId='+ColleteralId+'&&OwnerName='+OwnerName+'&&RegistrationDetails='+RegistrationDetails+'&&ActualValue='+ActualValue+'&&ForcedSaleValue='+ForcedSaleValue+'&&Remarks='+Remarks+'&&ExpiryDate='+ExpiryDate+'&&Delete='+Delete+'
  }
  DeleteLoanCollateral(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanCollateral?id=" +
        id +
        ""
    );
  }
  AddLoanGuarator(
    LoanId,
    MemberId,
    GuarantorType,
    Names,
    GuarantorId,
    LoanSerialRef,
    GuaranteedAmount,
    Delete
  ) {
    return this.http.get(
      " http://micropointlive.com/Upgrade/Loan/AddLoanGuarator?LoanId=" +
        LoanId +
        "&&MemberId=" +
        MemberId +
        "&&FullName=" +
        Names +
        "&&IdNo=" +
        GuarantorId +
        "&&GuarantorTypeId=" +
        GuarantorType +
        "&&LoanSerialRef=" +
        LoanSerialRef +
        "&&GuaranteedAmount=" +
        GuaranteedAmount +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  getAllLoanGuarator(LoanId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanGuarator?LoanId=" +
        LoanId +
        ""
    );
  }
  getLoanGuarator(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoanGuarator?id=" + id + ""
    );
  }
  UpdateLoanGuarator(
    LoanGuarantorId,
    LoanId,
    MemberId,
    GuarantorType,
    Names,
    GuarantorId,
    LoanSerialRef,
    GuaranteedAmount,
    Delete
  ) {
    return this.http.get(
      " http://micropointlive.com/Upgrade/Loan/UpdateLoanGuarator?LoanGuarantorId=" +
        LoanGuarantorId +
        "&&LoanId=" +
        LoanId +
        "&&MemberId=" +
        MemberId +
        "&&FullName=" +
        Names +
        "&&IdNo=" +
        GuarantorId +
        "&&GuarantorTypeId=" +
        GuarantorType +
        "&&LoanSerialRef=" +
        LoanSerialRef +
        "&&GuaranteedAmount=" +
        GuaranteedAmount +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  DeleteLoanGuarator(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanGuarator?id=" + id + ""
    );
  }
  GetAllLoanTypes() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetAllLoanTypes"
    );
  }

  getAllLoanStatus() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanStatus"
    );
  }
  AddLoanStatus(LoanStatusName, Delete) {
    return this.http.get(
      " http://micropointlive.com/Upgrade/Loan/AddLoanStatus?LoanStatusName=" +
        LoanStatusName +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  getLoanStatus(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoanStatus?id=" + id + ""
    );
  }
  UpdateLoanStatus(LoanStatusId, LoanStatusName, Delete) {
    return this.http.get(
      " http://micropointlive.com/Upgrade/Loan/UpdateLoanStatus?LoanStatusId=" +
        LoanStatusId +
        "&&LoanStatusName=" +
        LoanStatusName +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  DeleteLoanStatus(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanStatus?id=" + id + ""
    );
  }
  getAllLoanDonor() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanDonor"
    );
  }
  AddLoanDonor(DonorName, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AddLoanDonor?DonorName=" +
        DonorName +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  UpdateLoanDonor(DonorId, DonorName, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/UpdateLoanDonor?DonorId=" +
        DonorId +
        "&&DonorName=" +
        DonorName +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  getLoanDonor(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoanDonor?id=" + id + ""
    );
  }
  DeleteLoanDonor(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanDonor?id=" + id + ""
    );
  }
  //OtherSetting/AddCompanyBranch?Code=002&&Name=Nakuru&&Delete=false
  AddCompanyBranch(Name, Code, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AddCompanyBranch?Name=" +
        Name +
        "&&Code=" +
        Code +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  UpdateCompanyBranch(CompanyBranchesId, Code, Name, Delete) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/UpdateCompanyBranch?CompanyBranchesId=" +
        CompanyBranchesId +
        "&&Name=" +
        Name +
        "&&Code=" +
        Code +
        "&&Delete=" +
        Delete +
        ""
    );
  }
  GetAllCompanyBranches() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetAllCompanyBranches"
    );
  }
  GetCompanyBranch(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetCompanyBranch?id=" + id + ""
    );
  }
  DeleteCompanyBranch(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteCompanyBranch?id=" + id + ""
    );
  }

  GetLoanChargesTariffAmount(Amount, LoanChargesListId): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanType/GetLoanChargesTariffAmount?Amount=" +
        Amount +
        "&&LoanChargesListId=" +
        LoanChargesListId +
        ""
    );
  }
  GetAllLoanTypeCharges() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanTypeCharges"
    );
  }

  //kevin works
  getAllLoanApplications() {
    return this.http.get(
      // 'http://micropointlive.com/LoanCharges/GetAllLoanChargeListTariff'
      "http://micropointlive.com/Upgrade/Loan/getAllLoanApplication"
    );
  }

  VerifyLoanApplication(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/GetAllLoanChargeListTariffByLoanChargesListId?id='
      "http://micropointlive.com/Upgrade/Loan/VerifyLoanApplication?id=" +
        id +
        ""
    );
  }

  AddLoanChargeListTariff(
    LoanChargesListId,
    FromInterval,
    ToInterval,
    Amount,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/AddLoanChargeListTariff?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/AddLoanChargeListTariff?LoanChargesListId=" +
        LoanChargesListId +
        "&&FromInterval=" +
        FromInterval +
        "&&ToInterval=" +
        ToInterval +
        "&&Amount=" +
        Amount +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  UpdateLoanChargeListTariff(
    LoanChargesListTariffId,
    LoanChargesListId,
    FromInterval,
    ToInterval,
    Amount,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/UpdateLoanChargeListTariff?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/UpdateLoanChargeListTariff?LoanChargesListTariffId=" +
        LoanChargesListTariffId +
        "&&LoanChargesListId=" +
        LoanChargesListId +
        "&&FromInterval=" +
        FromInterval +
        "&&ToInterval=" +
        ToInterval +
        "&&Amount=" +
        Amount +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  getAllLoanChargeListTariff() {
    return this.http.get(
      // 'http://micropointlive.com/LoanCharges/GetAllLoanChargeListTariff'
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanChargeListTariff"
    );
  }
  getAllLoanChargeListTariffByLoanChargesListId(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/GetAllLoanChargeListTariffByLoanChargesListId?id='
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanChargeListTariffByLoanChargesListId?id=" +
        id +
        ""
    );
  }
  getLoanChargesListTariffById(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanCharges/GetLoanChargesListTariffById?id=" +
        id +
        ""
      //'http://micropointlive.com/LoanCharges/GetLoanChargesListTariffById?id='+id+''
    );
  }
  DeleteLoanChargeListTariff(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/DeleteLoanChargeListTariff?id='
      "http://micropointlive.com/Upgrade/LoanCharges/DeleteLoanChargeListTariff?id=" +
        id +
        ""
    );
  }

  AddLoanChargesList(
    Name,
    Recur,
    IncludeInterest,
    IsTariffBased,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanType/AddLoanType?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/AddLoanChargesList?Name=" +
        Name +
        "&&Recur=" +
        Recur +
        "&&IncludeInterest=" +
        IncludeInterest +
        "&&IsTariffBased=" +
        IsTariffBased +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  UpdateLoanChargesList(
    LoanChargesListId,
    Name,
    Recur,
    IncludeInterest,
    IsTariffBased,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanType/UpdateLoanChargesList?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/UpdateLoanChargesList?LoanChargesListId=" +
        LoanChargesListId +
        "&&Name=" +
        Name +
        "&&Recur=" +
        Recur +
        "&&IncludeInterest=" +
        IncludeInterest +
        "&&IsTariffBased=" +
        IsTariffBased +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  getAllLoanChargesList() {
    return this.http.get(
      // 'http://micropointlive.com/LoanCharges/GetAllLoanChargesList'
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanChargesList"
    );
  }
  getLoanChargesListById(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanCharges/GetLoanChargesListById?id=" +
        id +
        ""
      //'http://micropointlive.com/LoanCharges/GetLoanChargesListById?id='+id+''
    );
  }
  DeleteLoanChargesList(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/DeleteLoanChargesList?id='
      "http://micropointlive.com/Upgrade/LoanCharges/DeleteLoanChargesList?id=" +
        id +
        ""
    );
  }

  AddLoanTypeCharges(
    LoanChargesListId,
    LoanTypeId,
    Name,
    IsTariffBased,
    IsPercentage,
    Value,
    Amount,
    PeriodToCharge,
    HasLimit,
    LowerLimit,
    UpperLimit,
    UseFormula,
    TheFormula,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/AddLoanTypeCharges?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/AddLoanTypeCharges?LoanChargesListId=" +
        LoanChargesListId +
        "&&LoanTypeId=" +
        LoanTypeId +
        "&&Name=" +
        Name +
        "&&IsTariff=" +
        IsTariffBased +
        "&&IsPercentage=" +
        IsPercentage +
        "&&Value=" +
        Value +
        "&&Amount=" +
        Amount +
        "&&PeriodToCharge=" +
        PeriodToCharge +
        "&&HasLimit=" +
        HasLimit +
        "&&LowerLimit=" +
        LowerLimit +
        "&&UpperLimit=" +
        UpperLimit +
        "&&UseFormula=" +
        UseFormula +
        "&&TheFormula=" +
        TheFormula +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  UpdateLoanTypeCharges(
    LoanTypeChargesId,
    LoanChargesListId,
    LoanTypeId,
    Name,
    IsTariffBased,
    IsPercentage,
    Value,
    Amount,
    PeriodToCharge,
    HasLimit,
    LowerLimit,
    UpperLimit,
    UseFormula,
    TheFormula,
    Delete = false
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/UpdateLoanTypeCharges?RefCode'
      "http://micropointlive.com/Upgrade/LoanCharges/UpdateLoanTypeCharges?LoanTypeChargesId=" +
        LoanTypeChargesId +
        "&&LoanChargesListId=" +
        LoanChargesListId +
        "&&LoanTypeId=" +
        LoanTypeId +
        "&&Name=" +
        Name +
        "&&IsTariff=" +
        IsTariffBased +
        "&&IsPercentage=" +
        IsPercentage +
        "&&Value=" +
        Value +
        "&&Amount=" +
        Amount +
        "&&PeriodToCharge=" +
        PeriodToCharge +
        "&&HasLimit=" +
        HasLimit +
        "&&LowerLimit=" +
        LowerLimit +
        "&&UpperLimit=" +
        UpperLimit +
        "&&UseFormula=" +
        UseFormula +
        "&&TheFormula=" +
        TheFormula +
        "&&Delete=" +
        Delete +
        ""
    );
  }

  getAllLoanTypeCharges() {
    return this.http.get(
      // 'http://micropointlive.com/LoanCharges/GetAllLoanTypeCharges'
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanTypeCharges"
    );
  }
  getLoanTypeChargesById(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanCharges/GetLoanTypeChargesById?id=" +
        id +
        ""
      //'http://micropointlive.com/LoanCharges/GetLoanTypeChargesById?id='+id+''
    );
  }
  GetAllLoanTypeChargesByLoanTypeId(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanTypeChargesByLoanTypeId?id=" +
        id +
        ""
      //'http://micropointlive.com/LoanCharges/GetLoanTypeChargesById?id='+id+''
    );
  }
  DeleteLoanTypeCharges(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanCharges/DeleteLoanTypeCharges?id='
      "http://micropointlive.com/Upgrade/LoanCharges/DeleteLoanTypeCharges?id=" +
        id +
        ""
    );
  }

  getAllLoanTypes() {
    return this.http.get(
      // 'http://micropointlive.com/LoanType/GetAllLoanTypes'
      "http://micropointlive.com/Upgrade/LoanType/GetAllLoanTypes"
    );
  }
  getLoanTypeById(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/LoanType/GetLoanTypeById?id=" + id + ""
      //'http://micropointlive.com/LoanType/GetLoanTypeById?id='+id+''
    );
  }

  DeleteLoanTYpe(id: number) {
    return this.http.get(
      //'http://micropointlive.com/LoanType/DeleteLoanType?id='
      "http://micropointlive.com/Upgrade/LoanType/DeleteLoanType?id=" + id + ""
    );
  }
  /*RefreshLoanChargesList(id:number){
    return this.http.get('http://micropointlive.com/Upgrade/LoanCharges/GetAllLoanTypeChargesByLoanTypeId?id='+id+'').toPromise()
    .then(res =>this.LoanCharges= res as LoanCharges[]);
  }*/

  getAllLoanActiveAPPlication() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanActiveAPPlication"
    );
    //http://localhost:49367/Loan/getAllLoanActiveAPPlication
  }
  getAllLoanAppraisedAPPlication() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getAllLoanAppraisedAPPlication"
    );
    //http://localhost:49367/Loan/getAllLoanAppraisedAPPlication
  }
  CountLoanRows(MemberId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/CountLoanRows?MemberId=" +
        MemberId +
        ""
    );
    // http://localhost:49367/Loan/CountLoanRows?MemberId=44
  }
  AddLoanType1(
    RefCode,
    Description,
    MaxPeriod,
    InterestRate,
    InterestRateFrequency,
    MinAmount,
    MaxAmount,
    IncomeFactor,
    ChargeInterestDuringGracePeriod,
    SharesFactor,
    MinGuarantors,
    MaxGuarantors,
    InterestPayMethod,
    DefaultPenalty,
    DefaultPenaltyFrequency,
    Moratorium,
    MinShares,
    InterestCalFormula,
    MinPeriod,
    LoansFactor,
    RepaymentFrequency,
    GracePeriod,
    ApplyPenaltyAfterMaturity,
    IsSecure,
    Consider23rdRule,
    PreConsiderInterest,
    ForgoneInterest,
    AllowPartialDisbursements,
    AllowTopups,
    AdjustInterestRate,
    ConsiderLoanSeries,
    IsMarkupBased,
    ForcedSaleValue,
    UseOfZeroShares,
    MarginBaseAmount,
    IncrementValue,
    IsMobileLoan,
    IsIncrementFactor,
    NearestPrincipleRounding,
    PrincipalRoundingType,
    NearestInterestRounding,
    InterestRoundingType,
    Category,
    Remarks,
    Delete = false,
    intPostingFrequency,
    intPostingPeriod
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanType/AddLoanType?RefCode'
      "http://micropointlive.com/Upgrade/LoanType/AddLoanType?RefCode=" +
        RefCode +
        "&&Description=" +
        Description +
        "&&MaxPeriod=" +
        MaxPeriod +
        "&&InterestRate=" +
        InterestRate +
        "&&InterestRateFrequency=" +
        InterestRateFrequency +
        "&&MinAmount=" +
        MinAmount +
        "&&MaxAmount=" +
        MaxAmount +
        "&&IncomeFactor=" +
        IncomeFactor +
        "&&ChargeInterestDuringGracePeriod=" +
        ChargeInterestDuringGracePeriod +
        "&&SharesFactor=" +
        SharesFactor +
        "&&MinGuarantors=" +
        MinGuarantors +
        "&&MaxGuarantors=" +
        MaxGuarantors +
        "&&InterestPayMethod=" +
        InterestPayMethod +
        "&&DefaultPenalty=" +
        DefaultPenalty +
        "&&DefaultPenaltyFrequency=" +
        DefaultPenaltyFrequency +
        "&&Moratorium=" +
        Moratorium +
        "&&MinShares=" +
        MinShares +
        "&&InterestCalFormula=" +
        InterestCalFormula +
        "&&MinPeriod=" +
        MinPeriod +
        "&&LoansFactor=" +
        LoansFactor +
        "&&RepaymentFrequency=" +
        RepaymentFrequency +
        "&&GracePeriod=" +
        GracePeriod +
        "&&ApplyPenaltyAfterMaturity=" +
        ApplyPenaltyAfterMaturity +
        "&&IsSecure=" +
        IsSecure +
        "&&Consider23rdRule=" +
        Consider23rdRule +
        "&&PreConsiderInterest=" +
        PreConsiderInterest +
        "&&ForgoneInterest=" +
        ForgoneInterest +
        "&&AllowPartialDisbursements=" +
        AllowPartialDisbursements +
        "&&AllowTopups=" +
        AllowTopups +
        "&&AdjustInterestRate=" +
        AdjustInterestRate +
        "&&ConsiderLoanSeries=" +
        ConsiderLoanSeries +
        "&&IsMarkupBased=" +
        IsMarkupBased +
        "&&ForcedSaleValue=" +
        ForcedSaleValue +
        "&&UseOfZeroShares=" +
        UseOfZeroShares +
        "&&MarginBaseAmount=" +
        MarginBaseAmount +
        "&&IncrementValue=" +
        IncrementValue +
        "&&IsMobileLoan=" +
        IsMobileLoan +
        "&&IsIncrementFactor=" +
        IsIncrementFactor +
        "&&NearestPrincipleRounding=" +
        NearestPrincipleRounding +
        "&&PrincipalRoundingType=" +
        PrincipalRoundingType +
        "&&NearestInterestRounding=" +
        NearestInterestRounding +
        "&&InterestRoundingType=" +
        InterestRoundingType +
        "&&Category=" +
        Category +
        "&&Remarks=" +
        Remarks +
        "&&Delete=" +
        Delete +
        "&&intPostingFrequency=" +
        intPostingFrequency +
        "&&intPostingPeriod=" +
        intPostingPeriod +
        ""
    );
  }

  UpdateLoanType(
    LoanTypeId,
    RefCode,
    Description,
    MaxPeriod,
    InterestRate,
    InterestRateFrequency,
    MinAmount,
    MaxAmount,
    IncomeFactor,
    ChargeInterestDuringGracePeriod,
    SharesFactor,
    MinGuarantors,
    MaxGuarantors,
    InterestPayMethod,
    DefaultPenalty,
    DefaultPenaltyFrequency,
    Moratorium,
    MinShares,
    InterestCalFormula,
    MinPeriod,
    LoansFactor,
    RepaymentFrequency,
    GracePeriod,
    ApplyPenaltyAfterMaturity,
    IsSecure,
    Consider23rdRule,
    PreConsiderInterest,
    ForgoneInterest,
    AllowPartialDisbursements,
    AllowTopups,
    AdjustInterestRate,
    ConsiderLoanSeries,
    IsMarkupBased,
    ForcedSaleValue,
    UseOfZeroShares,
    MarginBaseAmount,
    IncrementValue,
    IsMobileLoan,
    IsIncrementFactor,
    NearestPrincipleRounding,
    PrincipalRoundingType,
    NearestInterestRounding,
    InterestRoundingType,
    Category,
    Remarks,
    Delete = false,
    intPostingFrequency,
    intPostingPeriod
  ) {
    return this.http.get(
      //'http://micropointlive.com/LoanType/AddLoanType?LoanTypeId='
      "http://micropointlive.com/Upgrade/LoanType/UpdateLoanType?LoanTypeId=" +
        LoanTypeId +
        "&&RefCode=" +
        RefCode +
        "&&Description=" +
        Description +
        "&&MaxPeriod=" +
        MaxPeriod +
        "&&InterestRate=" +
        InterestRate +
        "&&InterestRateFrequency=" +
        InterestRateFrequency +
        "&&MinAmount=" +
        MinAmount +
        "&&MaxAmount=" +
        MaxAmount +
        "&&IncomeFactor=" +
        IncomeFactor +
        "&&ChargeInterestDuringGracePeriod=" +
        ChargeInterestDuringGracePeriod +
        "&&SharesFactor=" +
        SharesFactor +
        "&&MinGuarantors=" +
        MinGuarantors +
        "&&MaxGuarantors=" +
        MaxGuarantors +
        "&&InterestPayMethod=" +
        InterestPayMethod +
        "&&DefaultPenalty=" +
        DefaultPenalty +
        "&&DefaultPenaltyFrequency=" +
        DefaultPenaltyFrequency +
        "&&Moratorium=" +
        Moratorium +
        "&&MinShares=" +
        MinShares +
        "&&InterestCalFormula=" +
        InterestCalFormula +
        "&&MinPeriod=" +
        MinPeriod +
        "&&LoansFactor=" +
        LoansFactor +
        "&&RepaymentFrequency=" +
        RepaymentFrequency +
        "&&GracePeriod=" +
        GracePeriod +
        "&&ApplyPenaltyAfterMaturity=" +
        ApplyPenaltyAfterMaturity +
        "&&IsSecure=" +
        IsSecure +
        "&&Consider23rdRule=" +
        Consider23rdRule +
        "&&PreConsiderInterest=" +
        PreConsiderInterest +
        "&&ForgoneInterest=" +
        ForgoneInterest +
        "&&AllowPartialDisbursements=" +
        AllowPartialDisbursements +
        "&&AllowTopups=" +
        AllowTopups +
        "&&AdjustInterestRate=" +
        AdjustInterestRate +
        "&&ConsiderLoanSeries=" +
        ConsiderLoanSeries +
        "&&IsMarkupBased=" +
        IsMarkupBased +
        "&&ForcedSaleValue=" +
        ForcedSaleValue +
        "&&UseOfZeroShares=" +
        UseOfZeroShares +
        "&&MarginBaseAmount=" +
        MarginBaseAmount +
        "&&IncrementValue=" +
        IncrementValue +
        "&&IsMobileLoan=" +
        IsMobileLoan +
        "&&IsIncrementFactor=" +
        IsIncrementFactor +
        "&&NearestPrincipleRounding=" +
        NearestPrincipleRounding +
        "&&PrincipalRoundingType=" +
        PrincipalRoundingType +
        "&&NearestInterestRounding=" +
        NearestInterestRounding +
        "&&InterestRoundingType=" +
        InterestRoundingType +
        "&&Category=" +
        Category +
        "&&Remarks=" +
        Remarks +
        "&&Delete=" +
        Delete +
        "&&intPostingFrequency=" +
        intPostingFrequency +
        "&&intPostingPeriod=" +
        intPostingPeriod +
        ""
    );
  }
  GetTotalShares(MemberId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetTotalShares?MemberId=" +
        MemberId +
        ""
    );
    //http://localhost:49367/Loan/GetTotalShares?MemberId=44
  }
  GetUsedShares(MemberId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetUsedShares?MemberId=" +
        MemberId +
        ""
    );
    //http://localhost:49367/Loan/GetTotalShares?MemberId=44
  }
  GetAllLoanDefaultStatus() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetAllLoanDefaultStatus"
    );
  }
  getAllLoanApplicationCharges(LoanId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetAllLoanApplicationCharges?LoanId=" +
        LoanId +
        ""
    );
    //http://localhost:49367/Loan/GetAllLoanApplicationCharges?LoanId=69
  }
  GetSumLoanCharges(LoanId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetSumLoanCharges?LoanId=" +
        LoanId +
        ""
    );
    //http://localhost:49367/Loan/GetTotalShares?MemberId=44
  }
  DeletetblLoan(id: number) {
    // return this.http.delete('http://localhost:49367/api/LoanApplication?id='+id+'');
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteAllLoanDetails?LoanId=" +
        id +
        ""
    );
  }

  DeleteLoanApplicationCharges(id: number) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DeleteLoanApplicationCharges?id=" +
        id +
        ""
    );
  }

  DisbersedLoans(
    LoanId,
    PaymodeId,
    BankId,
    ChequeType,
    ChequeNo,
    RepaymentCharge,
    ChargeAmount,
    CollectedAmount,
    RepaymentAmount,
    DisbursementDate
  ) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/DisbersedLoans?LoanId=" +
        LoanId +
        "&&PayModeId=" +
        PaymodeId +
        "&&BankId=" +
        BankId +
        "&&ChequeType=" +
        ChequeType +
        "&&ChequeNo=" +
        ChequeNo +
        "&&RepaymentChargeMethod=" +
        RepaymentCharge +
        "&&ChargeAmount=" +
        ChargeAmount +
        "&&BalanceAmount=" +
        CollectedAmount +
        "&&RepayAmount=" +
        RepaymentAmount +
        "&&DisbersementDate=" +
        DisbursementDate +
        ""
    );
  }
  GetAllLoanDisbursed() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetAllLoanDisbersed"
    );
  }
  getLoan(id: number): any {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/getLoan?id=" + id + ""
    );
  } /*
    PosttblLoan(){
      var body ={
        ...this.LoanApplicationForm,
        LoanApplicationCharges: this.LoanCharges
      };
      return this.http.post('http://micropointlive.com/Upgrade/api/LoanApplication',body);
    }*/
  GetTotalLoanApplication() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetTotalLoanApplication"
    );
  }
  GetTotalLoanAppraised() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetTotalLoanAppraised"
    );
  }
  GetTotalLoanDisbersed() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/GetTotalLoanDisbersed"
    );
  }
  AppraisedLoans(LoanId, Status, StatusDate) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/Loan/AppraisedLoans?LoanId=" +
        LoanId +
        "&&StatusId=" +
        Status +
        "&&StatusDate=" +
        StatusDate +
        ""
    );
    //http://localhost:49367/Loan/GetTotalShares?MemberId=44
  }
  GetAllInterestDue() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/InterestCalculation/GetAllInterestDue"
    );
  }

  ProcessInterestDue() {
    return this.http.get(
      "http://micropointlive.com/Upgrade/InterestCalculation/ProcessInterestDue"
    );
  }
  CalculateInterestOnDisbursement(LoanId) {
    return this.http.get(
      "http://micropointlive.com/Upgrade/nterestCalculation/CreateLoanInterestOnDisbursmentDate?LoanId=" +
        LoanId +
        ""
    );
  }
}
