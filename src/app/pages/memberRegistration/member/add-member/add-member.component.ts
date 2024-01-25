import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-member",
  templateUrl: "./add-member.component.html",
  styleUrls: ["./add-member.component.scss"],
})
export class AddMemberComponent implements OnInit {
  selectedIndex = 0;
  //first tab
  IsPerson: any = true;
  Payroll: any = "";
  MemberNo: any = "";
  FullName: any = "";
  SearchName: any = "";
  RegistrationDate: any = new Date();
  //second tab
  //person
  IdNo: any = 0;
  NHIFNo: any = 0;
  KRAPin: any = 0;
  NSSFNo: any = 0;
  HudumaNo: any = 0;
  Email: any = "";
  DOB: any = new Date();
  TitleId: any = 0;
  Gender: any = 0;
  MaritalStatusId: any = 0;
  LevelofEducationId: any = 0;
  isDisconnected: boolean = false;
  //
  Telephone1: any = "";
  Telephone2: any = "";
  Telephone3: any = "";
  PhoneNo: any = 254;
  FaxNumber: any = "";
  PhysicalLocation: any = "";
  PostalAddress: any = "";

  MemberStatusId: any = 0;
  MemberOutletId: any=0;

  Blocked: any = false;
  IsRegister: any = false;
  IsDormancy: any = false;
  Remark: any = "";
  SecurityQuestion: any = 0;
  RegistrationCode: any = "";
  NationalityId: any = 0;

  CompanyRegistrationDate: any = new Date();
  CompanyCertificateNo: any = "";
  BankId: any = 0;
  BankBranchId: any = 0;
  BankAccountNo: any = "";
  CurrencyId: any = 0;
  SecurityAnswer: any = "";

  NationalityList: any;
  Titlelist: any;
  EducationList: any;
  MaritalStatusList: any;
  MemberStatusList: any;
  CompanyOutletList: any;

  BankList: any;
  securityList: any;
  BranchList: any;
  Delete: any = false;
  CurrencyList: any;
  MemberId: any;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isValid: boolean = true;

  //structure
  public parentList: any = [];
  public structureList: any = [];
  public structureList1: any = [];
  public structureList2: any = [];
  public structureList3: any = [];
  StructureId: any = 0;
  v1: boolean = false;
  v2: boolean = false;
  v3: boolean = false;
  v4: boolean = false;
  MyStructureValueId: any;
  LastChild: any = 0;
  MyParentId: any;
  viewExisting: boolean = false;
  insertstructure: boolean = true;
  MemberStractureList: any;
  //add
  GrossPay: any = 0;
  NetPay: any = 0;
  TotalShares: any = 0;
  FreeShare: any = 0;
  constructor(
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let MemberId = this.currentRoute.snapshot.paramMap.get("id");

    if (MemberId == null) this.resetForm();
    else {
      this.viewExisting = true;
      this.insertstructure = false;
      this.service.getMember(parseInt(MemberId)).subscribe((Response) => {
        this.MemberId = Response.member.id;
        this.Payroll = Response.member.Payroll;
        this.MemberNo = Response.member.MemberNo;
        this.FullName = Response.member.FullName;
        this.SearchName = Response.member.SearchName;
        this.IdNo = Response.member.IdNo;
        this.IsPerson = Response.member.IsPerson;
        this.NHIFNo = Response.member.NHIFNo;
        this.KRAPin = Response.member.KRAPin;
        this.NSSFNo = Response.member.NSSFNo;
        this.HudumaNo = Response.member.HudumaNo;
        this.Email = Response.member.Email;
        this.DOB = Response.member.DOB;
        this.TitleId = Response.member.TitleId;
        this.Gender = Response.member.Gender;
        this.MaritalStatusId = Response.member.MaritalStatusId;
        this.Telephone1 = Response.member.Telephone1;
        this.Telephone2 = Response.member.Telephone2;
        this.Telephone3 = Response.member.Telephone3;
        this.PhoneNo = Response.member.PhoneNo;
        this.FaxNumber = Response.member.FaxNumber;
        this.PhysicalLocation = Response.member.PhysicalLocation;
        this.PostalAddress = Response.member.PostalAddress;
        this.MemberStatusId = Response.member.MemberStatusId;
        this.MemberOutletId=Response.member.BranchId;
        
        this.Blocked = Response.member.Blocked;
        this.LevelofEducationId = Response.member.LevelofEducationId;
        this.IsRegister = Response.member.IsRegister;
        this.IsDormancy = Response.member.IsDormancy;
        this.Remark = Response.member.Remark;
        this.SecurityQuestion = Response.member.SecurityQuestion;
        this.RegistrationCode = Response.member.RegistrationCode;
        this.NationalityId = Response.member.NationalityId;
        this.CompanyRegistrationDate = Response.member.CompanyRegistrationDate;
        this.RegistrationDate = Response.member.RegistrationDate;
        this.CompanyCertificateNo = Response.member.CompanyCertificateNo;
        this.BankId = Response.member.BankId;
        this.BankBranchId = Response.member.BankBranchId;
        this.BankAccountNo = Response.member.BankAccountNo;
        this.CurrencyId = Response.member.CurrencyId;
        this.SecurityAnswer = Response.member.SecurityAnswer;
        this.StructureId = Response.member.HierarchyId;

        this.GrossPay = Response.member.Gross;
        this.NetPay = Response.member.Nett;
        this.TotalShares = Response.member.TotalShares;
        this.FreeShare = Response.member.FreeShare;
        this.service
          .getStructureValueTree(parseInt(MemberId))
          .subscribe((Response) => {
            this.MemberStractureList = Response;
            console.log(Response);
          });
      });
    }
    this.refreshNationalityList();
    this.refreshTitleList();
    this.refreshLevelofEducationList();
    this.refreshMaritalStatusList();
    this.refreshMemberStatusList();
    this.refreshCompanyOutletList();
    this.refreshBankList();
    this.refreshList();
    this.refreshCurrencyList();
    this.getData();
    this.RegistrationDate = new Date().toISOString().split("T")[0];
    this.DOB = new Date().toISOString().split("T")[0];
    this.CompanyRegistrationDate = new Date().toISOString().split("T")[0];
  }
  updateStructure() {
    this.viewExisting = false;
    this.insertstructure = true;
  }
  refreshNationalityList() {
    this.service.getAllNationalities().subscribe(
      (Response) => {
        this.NationalityList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshTitleList() {
    this.service.getAllTitles().subscribe(
      (Response) => {
        this.Titlelist = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshLevelofEducationList() {
    this.service.getAllLevelofEducation().subscribe(
      (Response) => {
        this.EducationList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshMaritalStatusList() {
    this.service.getAllMaritalStatus().subscribe(
      (Response) => {
        this.MaritalStatusList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshMemberStatusList() {
    this.service.getAllMemberStatus().subscribe((Response) => {
      this.MemberStatusList = Response;
    });
  }
  refreshCompanyOutletList(){
    this.service.getAllCompanyOutlets().subscribe(
      res=>{
        this.CompanyOutletList=res;
      }
    );
  }
  refreshBankList() {
    this.service.getAllBank().subscribe(
      (Response) => {
        this.BankList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshList() {
    this.service.getAllGenders().subscribe(
      (Response) => {
        this.securityList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  refreshCurrencyList() {
    this.service.getAllCurrency().subscribe(
      (Response) => {
        this.CurrencyList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }

  loadBranches(BankId) {
    if (BankId > 0) {
      this.service.getBranchType(BankId).subscribe(
        (Response) => {
          this.BranchList = Response;
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  //Function to get all parent structures since their parentId is 0
  getData() {
    this.service.GetStructureValues(0).subscribe(
      (Response) => {
        this.parentList = Response;
      },
      (error) => {
        this.isDisconnected = true;
      }
    );
  }
  //Function to get structure level 1
  getLevel1(id: number) {
    //clear all arrays
    this.structureList1 = [];
    this.structureList2 = [];
    this.structureList3 = [];
    //hide all children incase selection is changed
    this.v1 = false;
    this.v2 = false;
    this.v3 = false;
    this.v4 = false;
    //pass current id to structurevalueid
    this.StructureId = id;
    if (this.StructureId != 0) {
      this.service.GetStructureValues(id).subscribe(
        (Response) => {
          this.structureList = Response;
          //Check if the array list is not empty then make the next select dropdown visible
          if (this.structureList.length > 0) {
            //Show the next dropdown
            this.v1 = true;
          }
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
    }
  }

  getLevel2(id: number) {
    //clear  array
    this.structureList2 = [];
    this.structureList3 = [];
    //hide all children incase selection is changed
    this.v2 = false;
    this.v3 = false;
    this.v4 = false;
    //pass current id to structurevalueid
    this.StructureId = id;
    if (this.StructureId != 0) {
      this.service.GetStructureValues(id).subscribe(
        (Response) => {
          this.structureList1 = Response;
          //Check if the array list is not empty then make the next select dropdown visible
          if (this.structureList1.length > 0) {
            //Show the next dropdown
            this.v2 = true;
          }
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
    }
  }

  getLevel3(id: number) {
    //clear  array
    this.structureList3 = [];
    //pass current id to structurevalueid
    this.StructureId = id;

    //hide all children incase selection is changed
    this.v3 = false;
    this.v4 = false;
    if (this.StructureId != 0) {
      this.service.GetStructureValues(id).subscribe(
        (Response) => {
          this.structureList2 = Response;
          //Check if the array list is not empty then make the next select dropdown visible

          if (this.structureList2.length > 0) {
            //Show the next dropdown
            this.v3 = true;
          }
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
    }
  }

  getLevel4(id: number) {
    //pass current id to structurevalueid
    this.StructureId = id;
    //hide all children incase selection is changed
    this.v4 = false;
    if (this.StructureId != 0) {
      this.service.GetStructureValues(id).subscribe(
        (Response) => {
          this.structureList3 = Response;
          //Check if the array list is not empty then make the next select dropdown visible
          if (this.structureList3.length > 0) {
            //Show the next dropdown
            this.v4 = true;
          }
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
    }
  }

  getLevel5(id: number) {
    //pass current id to structurevalueid
    this.StructureId = id;
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  onsubmit(
    Payroll,
    MemberNo,
    FullName,
    SearchName,
    IdNo,
    IsPerson,
    NHIFNo,
    KRAPin,
    NSSFNo,
    HudumaNo,
    Email,
    DOB,
    TitleId,
    Gender,
    MaritalStatusId,
    Telephone1,
    Telephone2,
    Telephone3,
    PhoneNo,
    FaxNumber,
    PhysicalLocation,
    PostalAddress,
    MemberStatusId,
    Blocked,
    LevelofEducationId,
    IsRegister,
    IsDormancy,
    Remark,
    SecurityQuestion,
    RegistrationCode,
    NationalityId,
    CompanyRegistrationDate,
    RegistrationDate,
    CompanyCertificateNo,
    BankId,
    BankBranchId,
    BankAccountNo,
    CurrencyId,
    SecurityAnswer,
    StructureId,
    GrossPay,
    NetPay,
    TotalShares,
    FreeShare
  ) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
        this.loading = true;
      }
      let MemberId = this.currentRoute.snapshot.paramMap.get("id");
      if (MemberId == null)
        this.service
          .AddMember(
            Payroll,
            FullName,
            SearchName,
            IdNo,
            IsPerson,
            NHIFNo,
            KRAPin,
            NSSFNo,
            HudumaNo,
            Email,
            DOB,
            TitleId,
            Gender,
            MaritalStatusId,
            Telephone1,
            Telephone2,
            Telephone3,
            PhoneNo,
            FaxNumber,
            PhysicalLocation,
            PostalAddress,
            MemberStatusId,
            Blocked,
            LevelofEducationId,
            IsRegister,
            IsDormancy,
            Remark,
            SecurityQuestion,
            RegistrationCode,
            NationalityId,
            CompanyRegistrationDate,
            RegistrationDate,
            CompanyCertificateNo,
            BankId,
            BankBranchId,
            BankAccountNo,
            CurrencyId,
            SecurityAnswer,
            StructureId,
            GrossPay,
            NetPay,
            TotalShares,
            FreeShare,
            (this.Delete = false),
            this.MemberOutletId
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
              if (
                this.isSuccess == false &&
                this.errDescription !=
                  " Please ensure your email is correct format eg. abc@example.com"
              ) {
                confirm(this.errDescription);
                this.selectedIndex = 2;
                this.loading = false;
                return;
              }
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                this.loading = false;
                return;
              }
              if (this.isSuccess == true) {
                this.resetForm();
                this.successmsg();
                this.loading = false;
                /*this.MemberNo=this.loanAppResp['MemberNo'];
  onsubmit(Payroll,MemberNo,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
    Telephone1, Telephone2, Telephone3, PhoneNo, FaxNumber, PhysicalLocation, PostalAddress,MemberStatusId, Blocked, LevelofEducationId,
    IsRegister, IsDormancy, Remark, SecurityQuestion, RegistrationCode, NationalityId,
    CompanyRegistrationDate, RegistrationDate, CompanyCertificateNo, BankId, BankBranchId, BankAccountNo, CurrencyId, SecurityAnswer,StructureId,
    GrossPay,NetPay,TotalShares,FreeShare)
    {
      if(this.formValidation()){
        if(this.isDisconnected==false){
          this.loading=true;
        }      
      let MemberId=this.currentRoute.snapshot.paramMap.get('id');
      if(MemberId==null) 
	  this.service.AddMember(Payroll,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
    Telephone1, Telephone2, Telephone3, PhoneNo, FaxNumber, PhysicalLocation, PostalAddress,MemberStatusId, Blocked, LevelofEducationId,
    IsRegister, IsDormancy, Remark, SecurityQuestion, RegistrationCode, NationalityId,
    CompanyRegistrationDate, RegistrationDate, CompanyCertificateNo, BankId, BankBranchId, BankAccountNo, CurrencyId, SecurityAnswer,StructureId,GrossPay,NetPay,TotalShares,FreeShare,this.Delete=false).subscribe( Response =>
      {
        this.loanAppResp = Response;             
        this.isSuccess = this.loanAppResp['isSuccess'];
        this.errDescription = this.loanAppResp['errorDescription'];        
        if (this.isSuccess==false && this.errDescription!=' Please ensure your email is correct format eg. abc@example.com'){
        confirm(this.errDescription);
          this.selectedIndex=2;
          this.loading=false;
          return;
         }
        if (this.isSuccess==false && this.errDescription!=''){
          confirm(this.errDescription);
          this.loading=false;
          return;
         }
       if (this.isSuccess==true){ 
        this.successmsg();
        this.resetForm();
        this.loading=false;
        this.MemberNo=this.loanAppResp['MemberNo'];
        this.FullName=this.loanAppResp['FullName'];
        this.SearchName=this.loanAppResp['SearchName'];
        this.Payroll=this.loanAppResp['Payroll'];
        this.IdNo=this.loanAppResp['IdNo'];
        this.IsPerson=this.loanAppResp['IsPerson'];
        this.KRAPin=this.loanAppResp['KRAPin'];
        this.NSSFNo=this.loanAppResp['NSSFNo'];
        this.HudumaNo=this.loanAppResp['HudumaNo'];
        this.Email=this.loanAppResp['Email'];
        this.DOB=this.loanAppResp['DOB'];
        this.TitleId=this.loanAppResp['TitleId'];
        this.Gender=this.loanAppResp['Gender'];
        this.MaritalStatusId=this.loanAppResp['MaritalStatusId'];
        this.Telephone1=this.loanAppResp['Telephone1'];
        this.Telephone2=this.loanAppResp['Telephone2'];
        this.Telephone3=this.loanAppResp['Telephone3'];
        this.PhoneNo=this.loanAppResp['PhoneNo'];
        this.FaxNumber=this.loanAppResp['FaxNumber'];
        this.PhysicalLocation=this.loanAppResp['PhysicalLocation'];
        this.PostalAddress=this.loanAppResp['PostalAddress'];
        this.MemberStatusId=this.loanAppResp['MemberStatusId'];
        this.LevelofEducationId=this.loanAppResp['LevelofEducationId'];
        this.RegistrationCode=this.loanAppResp['Remark'];
        this.SecurityQuestion=this.loanAppResp['SecurityQuestion'];
        this.RegistrationCode=this.loanAppResp['RegistrationCode'];
        this.NationalityId=this.loanAppResp['NationalityId'];
        this.CompanyRegistrationDate=this.loanAppResp['CompanyRegistrationDate'];
        this.RegistrationDate=this.loanAppResp['RegistrationDate'];
        this.CompanyCertificateNo=this.loanAppResp['CompanyCertificateNo'];
        this.BankId=this.loanAppResp['BankId'];
        this.BankBranchId=this.loanAppResp['BankBranchId'];
        this.BankAccountNo=this.loanAppResp['BankAccountNo'];
        this.CurrencyId=this.loanAppResp['CurrencyId'];
        this.SecurityAnswer=this.loanAppResp['SecurityAnswer'];
        this.GrossPay=this.loanAppResp['GrossPay'];
        this.NetPay=this.loanAppResp['NetPay'];
        this.TotalShares=this.loanAppResp['TotalShares'];
        this.FreeShare=this.loanAppResp['FreeShare'];*/
                this.selectedIndex = 0;
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateMember(
            MemberId,
            Payroll,
            MemberNo,
            FullName,
            SearchName,
            IdNo,
            IsPerson,
            NHIFNo,
            KRAPin,
            NSSFNo,
            HudumaNo,
            Email,
            DOB,
            TitleId,
            Gender,
            MaritalStatusId,
            Telephone1,
            Telephone2,
            Telephone3,
            PhoneNo,
            FaxNumber,
            PhysicalLocation,
            PostalAddress,
            MemberStatusId,
            Blocked,
            LevelofEducationId,
            IsRegister,
            IsDormancy,
            Remark,
            SecurityQuestion,
            RegistrationCode,
            NationalityId,
            CompanyRegistrationDate,
            RegistrationDate,
            CompanyCertificateNo,
            BankId,
            BankBranchId,
            BankAccountNo,
            CurrencyId,
            SecurityAnswer,
            StructureId,
            GrossPay,
            NetPay,
            TotalShares,
            FreeShare,
            (this.Delete = false)
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                this.loading = false;
                return;
              }
              if (this.isSuccess == true) {
                this.resetForm();
                this.successmsg();
                this.loading = false;
                this.router.navigate(["/view-member"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      }
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    //this.IsPerson=false;
    this.MemberNo = "";
    this.Payroll = "";
    this.FullName = "";
    this.SearchName = "";
    this.RegistrationDate = new Date();
    this.IdNo = 0;
    this.NHIFNo = 0;
    this.KRAPin = 0;
    this.NSSFNo = 0;
    this.HudumaNo = 0;
    this.Email = "";
    this.DOB = new Date();
    this.TitleId = 0;
    this.Gender = 0;
    this.MaritalStatusId = 0;
    this.LevelofEducationId = 0;
    this.Telephone1 = "";
    this.Telephone2 = "";
    this.Telephone3 = "";
    this.PhoneNo = 254;
    this.FaxNumber = "";
    this.PhysicalLocation = "";
    this.PostalAddress = "";

    this.MemberStatusId = 0;
    this.MemberOutletId=0;

    this.Blocked = false;
    this.IsRegister = false;
    this.IsDormancy = false;
    this.Remark = "";
    this.SecurityQuestion = 0;
    this.RegistrationCode = "";
    this.NationalityId = 0;

    this.CompanyRegistrationDate = new Date();
    this.CompanyCertificateNo = "";
    this.BankId = 0;
    this.BankBranchId = 0;
    this.BankAccountNo = "";
    this.CurrencyId = 0;
    this.SecurityAnswer = "";
  }

  formValidation() {
    this.isValid = true;
    if (this.FullName == "") this.isValid = false;
    if (this.PhoneNo == "") this.isValid = false;
    return this.isValid;
  }
  selectTabOne() {
    if (this.formValidationTabOne()) {
      this.selectedIndex = 1;
    }
  }
  formValidationTabOne() {
    this.isValid = true;
    if (this.FullName == "") this.isValid = false;
    return this.isValid;
  }
  formValidationTabThree() {
    this.isValid = true;
    if (
      this.PhoneNo == 254 ||
      this.PhoneNo == "" ||
      this.PhoneNo.length < 10 ||
      this.PhoneNo.length > 15
    )
      this.isValid = false;
    return this.isValid;
  }
  selectTabThree() {
    if (this.formValidationTabThree()) {
      this.selectedIndex = 3;
    }
  }
  formValidationTabTwo() {
    this.isValid = true;
    if (this.IsPerson == true) {
      if (this.IdNo == 0 || this.IdNo.length < 6 || this.IdNo.length > 10)
        this.isValid = false;

      if (this.Gender == 0) this.isValid = false;
      return this.isValid;
    }
    return this.isValid;
  }
  formValidationTabFour() {
    this.isValid = true;
    if (this.BankId > 0) {
      if (this.BankBranchId == 0) this.isValid = false;
      if (this.BankAccountNo == "") this.isValid = false;
      return this.isValid;
    }
    return this.isValid;
  }
  selectTabTwo() {
    if (this.formValidationTabTwo()) {
      this.selectedIndex = 2;
    }
  }
  selectTabFour() {
    if (this.formValidationTabFour()) {
      this.selectedIndex = 4;
    }
  }

  Reload() {
    window.location.reload();
  }
  onlyNumbersAllowed(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log(charCode);
      return false;
    }
    return true;
  }
  // Only AlphaNumeric
  keyPressAlphanumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    ///[a-zA-Z0-9]/
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressLetterandNumbers(event) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  onInput() {
    this.SearchName = this.FullName;
  }
}
