import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss']
})
export class AddContactsComponent implements OnInit {
  selectedIndex: number = 0;
  maxNumberOfTabs: number = 4;

  ContactId:any=0;
  Payroll:any="";
  MemberId:any=0;
  FullName:any="";
  SearchName:any="";
  RegistrationDate:any= new Date;
  IsPerson:any=true;
  //second tab
  //person
  IdNo:any=0;
  NHIFNo:any=0;
  KRAPin:any=0;
  NSSFNo:any=0;
  HudumaNo:any=0;
  Email:any="";
  DOB:any=new Date;
  TitleId:any=0;
  Gender:any="";
  MaritalStatusId:any=0;
  LevelofEducationId:any=0;
  //
  Telephone1:any="";
  Telephone2:any=""; 
  Telephone3:any=""; 
  PhoneNo:any=""; 
  FaxNumber:any=""; 
  PhysicalLocation:any="";
  PostalAddress:any="";

  MemberStatusId:any=0; 
  Blocked:any=false;
  IsRegister:any=false; 
  IsDormancy:any=false; 
  Remark:any=""; 
  SecurityQuestion:any=0; 
  RegistrationCode:any=""; 
  NationalityId:any=0;

  CompanyRegistrationDate:any=new Date;
  CompanyCertificateNo:any="";
  BankId:any=0; 
  BankBranchId:any=0;
  BankAccountNo:any=""; 
  CurrencyId:any=0; 
  SecurityAnswer:any="";
  Delete:boolean=false;
  NationalityList:any;
  Titlelist:any;
  EducationList:any;
  MaritalStatusList:any;
  MemberStatusList:any;
  BankList:any;
  securityList:any;
  BranchList:any;
  CurrencyList:any;
  memberList:any
  public loading: boolean = false;
  isValid:boolean=true;
  loanResp:any;  
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isDisconnected: boolean = false; 
  MemberNo:any;
  Name:any;
  Id:any;
  constructor( private currentRoute:ActivatedRoute,
    public service :  PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    
    ) { 
      this.isSuccess=false;
      this.errDescription=''
    }

  ngOnInit(): void {
   
    let ContactId=this.currentRoute.snapshot.paramMap.get('id');    
    if(ContactId==null)
    this.resetForm();
    else{
        this.service.GetContact(parseInt(ContactId)).subscribe(Response =>{
        this.ContactId=Response.contact.ContactId;
        console.log(Response.contact.ContactId);
        
        this.Payroll=Response.contact.Payroll;
        this.MemberId=Response.contact.MemberId;
        this.FullName=Response.contact.FullName;
        this.SearchName=Response.contact.SearchName;
        this.IdNo=Response.contact.IdNo;
        this.IsPerson=Response.contact.IsPerson;
        this.NHIFNo=Response.contact.NHIFNo;
        this.KRAPin=Response.contact.KRAPin;
        this.NSSFNo=Response.contact.NSSFNo;
        this.HudumaNo=Response.contact.HudumaNo;
        this.Email=Response.contact.Email;
        this.DOB=Response.contact.DOB;
        this.TitleId=Response.contact.TitleId;
        this.Gender=Response.contact.Gender;
        this.MaritalStatusId=Response.contact.MaritalStatusId;
        this.Telephone1=Response.contact.Telephone1;
        this.Telephone2=Response.contact.Telephone2;
        this.Telephone3=Response.contact.Telephone3;
        this.PhoneNo=Response.contact.PhoneNo;
        this.FaxNumber=Response.contact.FaxNumber;
        this.PhysicalLocation=Response.contact.PhysicalLocation;
        this.PostalAddress=Response.contact.PostalAddress;
        this.MemberStatusId=Response.contact.MemberStatusId;
        this.Blocked=Response.contact.Blocked;
        this.LevelofEducationId=Response.contact.LevelofEducationId;
        this.IsRegister=Response.contact.IsRegister;
        this.IsDormancy=Response.contact.IsDormancy;
        this.Remark=Response.contact.Remark;
        this.SecurityQuestion=Response.contact.SecurityQuestion;
        this.RegistrationCode=Response.contact.RegistrationCode;
        this.NationalityId=Response.contact.NationalityId;
        this.CompanyRegistrationDate=Response.contact.CompanyRegistrationDate;
        this.RegistrationDate=Response.contact.RegistrationDate;
        this.CompanyCertificateNo=Response.contact.CompanyCertificateNo;
        this.BankId=Response.contact.BankId;
        this.BankBranchId=Response.contact.BankBranchId;
        this.BankAccountNo=Response.contact.BankAccountNo;
        this.CurrencyId=Response.contact.CurrencyId;
        this.SecurityAnswer=Response.contact.SecurityAnswer;            
                
    })
    
    }
    
    this.refreshNationalityList();
	  this.refreshTitleList();
	  this.refreshLevelofEducationList();
	  this.refreshMaritalStatusList();
    this.refreshMemberStatusList();
    this.refreshBankList();
    this.refreshList();
    this.refreshCurrencyList();
    this.refreshMemberList();
    this.RegistrationDate = new Date().toISOString().split('T')[0];     
    this.DOB = new Date().toISOString().split('T')[0]; 
    this.CompanyRegistrationDate = new Date().toISOString().split('T')[0]; 
    
   
    
     
  }
  refreshNationalityList(){
    this.service.getAllNationalities().subscribe((Response)=>{
      this.NationalityList=Response;
    });
 }
 refreshTitleList(){
    this.service.getAllTitles().subscribe((Response)=>{
      this.Titlelist=Response; 
    })
  }
  refreshLevelofEducationList(){
    this.service.getAllLevelofEducation().subscribe((Response)=>{
      this.EducationList=Response;
      
    });
  }
  refreshMaritalStatusList(){
    this.service.getAllMaritalStatus().subscribe((Response)=>{
      this.MaritalStatusList=Response; 
    });
}
refreshMemberStatusList(){
  this.service.getAllMemberStatus().subscribe((Response)=>{
      this.MemberStatusList=Response; 
    });
  }
  refreshBankList(){

    this.service.getAllBank().subscribe((Response)=>{
      this.BankList=Response;
      
      });
     
  }
  refreshList(){
    this.service.getAllGenders().subscribe((Response)=>{
      this.securityList=Response;
      
      
    });

  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  refreshCurrencyList(){

    this.service.getAllCurrency().subscribe((Response)=>{
      this.CurrencyList=Response;
      
      
    });
  }
  loadBranches(BankId){
    
    if(BankId>0){
      this.service.getBranchType(BankId).subscribe((Response)=>{
        
        this.BranchList=Response;
      })
    }

  }
  refreshMemberList(){
    this.service.getAllMembers().subscribe((Response)=>{
      this.memberList=Response; 
    });
  }
  
  Reload(){
    window.location.reload();
  }
  //Save data
  onsubmit(Payroll,MemberId,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
    Telephone1, Telephone2, Telephone3, PhoneNo, FaxNumber, PhysicalLocation, PostalAddress,MemberStatusId, Blocked, LevelofEducationId,
    IsRegister, IsDormancy, Remark, SecurityQuestion, RegistrationCode, NationalityId,
    CompanyRegistrationDate, RegistrationDate, CompanyCertificateNo, BankId, BankBranchId, 
    BankAccountNo, CurrencyId, SecurityAnswer){
      if(this.formValidation()){
    this.loading=true;
      let ContactId=this.currentRoute.snapshot.paramMap.get('id');
        this.service.UpdateContact(ContactId,Payroll,MemberId,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
          Telephone1, Telephone2, Telephone3, PhoneNo, FaxNumber, PhysicalLocation, PostalAddress,MemberStatusId, Blocked, LevelofEducationId,
          IsRegister, IsDormancy, Remark, SecurityQuestion, RegistrationCode, NationalityId,
          CompanyRegistrationDate, RegistrationDate, CompanyCertificateNo, BankId, BankBranchId, 
          BankAccountNo, CurrencyId, SecurityAnswer,this.Delete
      
         ).subscribe(Response =>{
           
          this.loanAppResp = Response;
          this.isSuccess = this.loanAppResp['isSuccess'];
          this.errDescription = this.loanAppResp['errorDescription'];
          if (this.isSuccess==false && this.errDescription!=''){
            confirm(this.errDescription);
            this.loading=false;
            return;
           }
         if (this.isSuccess==true){
          this.successmsg();
          this.resetForm();
          this.loading=false;
          this.Viewcontact();
          
         }
       
         })


        }
       
 }

 Viewcontact(){  
  this.router.navigate(['/view-contacts/edit/'+this.MemberId])
          
}



  nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    
  }
  formValidation(){
    this.isValid=true;
    if(this.MemberId=='')
    this.isValid=false;
    if(this.FullName=='')
    this.isValid=false;
    if(this.SearchName=='')
    this.isValid=false;
    if(this.NationalityId==0)
    this.isValid=false;
    if(this.PhoneNo=='')
    this.isValid=false;
    if(this.MemberStatusId==0)
    this.isValid=false;
    return this.isValid;
   }
   resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.IsPerson=false;
    this.Payroll="";
    this.SearchName="";
    this.RegistrationDate= new Date;
    this.IdNo="";
    this.NHIFNo=0;
    this.KRAPin=0;
    this.NSSFNo=0;
    this.HudumaNo=0;
    this.Email="";
    this.DOB=new Date;
    this.TitleId=0;
    this.Gender="";
    this.MaritalStatusId=0;
    this.LevelofEducationId=0;
    this.Telephone1="";
    this.Telephone2=""; 
    this.Telephone3=""; 
    this.PhoneNo=""; 
    this.FaxNumber=""; 
    this.PhysicalLocation="";
    this.PostalAddress="";
  
    this.MemberStatusId=0; 
    this.Blocked=false;
   this.IsRegister=false; 
   this.IsDormancy=false; 
   this.Remark=""; 
   this.SecurityQuestion=0; 
   this.RegistrationCode=""; 
   this.NationalityId=0;
  
   this.CompanyRegistrationDate=new Date;
   this.CompanyCertificateNo="";
   this.BankId=0; 
   this.BankBranchId=0;
   this.BankAccountNo=""; 
   this.CurrencyId=0; 
   this.SecurityAnswer="";
   
   }
}
