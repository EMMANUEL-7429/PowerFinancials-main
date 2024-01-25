import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insert-contact',
  templateUrl: './insert-contact.component.html',
  styleUrls: ['./insert-contact.component.scss']
})
export class InsertContactComponent implements OnInit {
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
  IdNo:any="";
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
  MemberNo:any;
  Name:any;
  Id:any;
  isDisconnected: boolean = false;
  constructor(private currentRoute:ActivatedRoute,
    public service :  PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
   ) { 
      this.isSuccess=false;
      this.errDescription='' }

      ngOnInit(): void {

        let MemberId=this.currentRoute.snapshot.paramMap.get('id');
        
        if(MemberId==null)
        this.resetForm();
        else{
          this.service.getMember(parseInt(MemberId)).subscribe(Response =>{
            this.MemberId=MemberId;
            this.MemberNo=Response.member.MemberNo;
             this.Name=Response.member.FullName;
              this.Id=Response.member.IdNo;
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
      }
      successmsg() {
        Swal.fire('Process Succeeded')
      }
       
  Reload(){
    window.location.reload();
  }
  Viewcontact(){  
   this.router.navigate(['/view-contacts/edit/'+this.MemberId])
           
 }
 onInput(){
  this.SearchName=this.FullName;
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
      view(){
        let MemberId=this.currentRoute.snapshot.paramMap.get('id');
        this.router.navigate(['/view-contacts/edit/'+MemberId]); 

      }
    
      //Save data
      onsubmit(Payroll,MemberId,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
        Telephone1, Telephone2, Telephone3, PhoneNo, FaxNumber, PhysicalLocation, PostalAddress,MemberStatusId, Blocked, LevelofEducationId,
        IsRegister, IsDormancy, Remark, SecurityQuestion, RegistrationCode, NationalityId,
        CompanyRegistrationDate, RegistrationDate, CompanyCertificateNo, BankId, BankBranchId, 
        BankAccountNo, CurrencyId, SecurityAnswer){
          if(this.formValidation()){
         this.loading=true;
            this.service.AddContact(Payroll,MemberId,FullName,SearchName,IdNo,IsPerson,NHIFNo,KRAPin,NSSFNo,HudumaNo,Email,DOB,TitleId, Gender, MaritalStatusId,
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
             }
            })
          
        }
     }
     selectTab(index: number): void {
      this.selectedIndex = index;
    }
     selectTabOne(){
      if(this.formValidationTabOne()){
     this.selectedIndex=1;
      }
    }
    formValidationTabOne(){
      this.isValid=true;
      if(this.FullName=='')
      this.isValid=false;
      return this.isValid;
       }
     selectTabTwo(){  
       if(this.formValidationTabTwo()) {
        this.selectedIndex=2; 
      
       }  
       
    }
    selectTabThree(){
      if(this.formValidationTabThree()){
     this.selectedIndex=3;
      }
    }
    formValidationTabThree(){
      this.isValid=true;
      if(this.PhoneNo==254 || this.PhoneNo=="" || this.PhoneNo.length<10 || this.PhoneNo.length>15   )
      this.isValid=false;
      return this.isValid;
  
     }
    formValidationTabTwo(){
      this.isValid=true;
           
      if(this.Gender==0)
      this.isValid=false;
      return this.isValid;
      
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
        this.PhoneNo=254; 
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
       onlyNumbersAllowed(event):boolean
       {
         const charCode =(event.which)?event.which:event.keyCode;
         if(charCode >31 && (charCode <48 || charCode>57)){
           console.log(charCode)
           return false;
         }
         return true;
     
       }
}
