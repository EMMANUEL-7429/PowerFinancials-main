import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-loan-guarantor',
  templateUrl: './add-loan-guarantor.component.html',
  styleUrls: ['./add-loan-guarantor.component.scss']
})
export class AddLoanGuarantorComponent implements OnInit {
  LoanGuarantorId:any=0;
  GuarantorType:any=0;
  LoanSerialRef:any="";
  MemberId:any=0;
  GuantorMemberShareId:any=0;
  GuarantorId:any="";
  Names:any="";
  GuaranteedAmount:any=0;
  memberList:any;
  LoanId:any;
  Delete:any=false
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isValid:boolean=true;
  MemberShares:any;
  MemberShareId:any;
  TotalSharesList:any;
  UsedShares:any;
  UsedSharesList:any;
  FreeShares:any;
  MemberAccounts: any;
  
  public loading: boolean = false;
  public isDisconnected:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<AddLoanGuarantorComponent>,private pfService:PowerFinancialService,private loanService:LoanApplicationService,
 private router:Router,private loanservice:LoanApplicationService) {
    this.isSuccess=false;
    this.errDescription=''
   }

  ngOnInit(): void {
    if(this.data.LoanGuarantorId==null)
    this.resetForm();
    else{
      this.loanService.getLoanGuarator(parseInt(this.data.LoanGuarantorId)).subscribe(Response =>{
        this.LoanGuarantorId = Response.loanGuarator.id;
        this.MemberId = Response.loanGuarator.MemberId;
        this.GuarantorId = Response.loanGuarator.IdNo;
        this.Names = Response.loanGuarator.FullName;
        this.GuarantorType = Response.loanGuarator.GuarantorTypeId;
        this.GuaranteedAmount = Response.loanGuarator.GuaranteedAmount;
        this.LoanSerialRef = Response.loanGuarator.LoanSerialRef;
        
      })
    }
    this.refreshList();
  }
  refreshList(){
    this.pfService.getAllMembers().subscribe((Response)=>{
      this.memberList=Response;
    });
  }
  updateMemberdatails(ctrl){
    if(ctrl.selectedIndex==0){
      this.Names='';
      this.GuarantorId='';  
    }
    
    else{      
      this.MemberShareId=this.memberList[ctrl.selectedIndex-1].MemberId;
      this.Names=this.memberList[ctrl.selectedIndex-1].FullName;
      this.GuarantorId=this.memberList[ctrl.selectedIndex-1].IdNo; 
      this.loanservice.GetTotalShares(this.MemberShareId).subscribe( Response =>{
       this.TotalSharesList=Response;
       this.MemberShares = this.TotalSharesList['BalanceAmount'];
      }) 
       this.loanservice.GetUsedShares(this.MemberShareId).subscribe( Response =>{
       this.UsedSharesList=Response;
       this.UsedShares = this.UsedSharesList['TotalAmount'];
      })
      debugger;
      this.getMemberAccounts(this.memberList[ctrl.selectedIndex-1].MemberId);
    }
  
  }
  displayAccountDetails(ctrl){
    var membershareId=this.MemberAccounts[ctrl.selectedIndex-1].MemberShareId;
    console.log(membershareId);
    
    this.loanservice.GetTotalShares(membershareId).subscribe( Response =>{
      this.TotalSharesList=Response;
      this.MemberShares = this.TotalSharesList['BalanceAmount'];
     }) 
      this.loanservice.GetUsedShares(membershareId).subscribe( Response =>{
      this.UsedSharesList=Response;
      this.UsedShares = this.UsedSharesList['TotalAmount'];
     })
  }
  getMemberAccounts(memberId : number){
    this.pfService.GetMemberAccounts(memberId).subscribe(
      res=>{
        console.log(res);
        this.MemberAccounts =res as [];
      }
    );
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(GuantorMemberShareId,GuarantorType,LoanSerialRef,GuaranteedAmount){
   
    if(this.data.LoanId==null){
      confirm("Please select a Loan before adding Guarantor")
      this.dialogRef.close();
      return
    }
    if((this.MemberShares-this.UsedShares)<this.GuaranteedAmount){
 
      confirm("Guaranteed Amount should not be greater than free shares amount")
      return

    }
    
    
    if(this.formValidation()){
     
   this.LoanId= this.data.LoanId;
   this.loading=true;
   if(this.data.LoanGuarantorId==null)
    this.loanService.AddLoanGuarator(this.LoanId,GuantorMemberShareId,GuarantorType,LoanSerialRef,GuaranteedAmount,"Admin",this.Delete=false).subscribe(Response =>{
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
      this.dialogRef.close();
     }
     
    })
    else{
      this.loanService.UpdateLoanGuarator(this.data.LoanGuarantorId,this.LoanId,GuantorMemberShareId,GuarantorType,LoanSerialRef,GuaranteedAmount,"Admin",this.Delete=false).subscribe(Response =>{
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
      this.dialogRef.close();
     }
        
      })

    }
  } 

  }
  formValidation(){
    this.isValid=true;
    if(this.GuarantorType==0)
    this.isValid=false;
    if(this.MemberId==0)
    this.isValid=false;
    if(this.GuaranteedAmount==0) 
    this.isValid=false;
  
    return this.isValid;
   }
   resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.GuarantorType=0;
    this.MemberId=0;
    this.GuarantorId='';
    this.Names=0;
    this.LoanSerialRef='';
    this.GuaranteedAmount=0;
    
   }
 

}
