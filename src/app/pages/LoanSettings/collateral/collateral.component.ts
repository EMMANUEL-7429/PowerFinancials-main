import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss']
})
export class CollateralComponent implements OnInit {
  ColleteralId:any=0;
  OwnerName:any="";
  RegistrationDetails:any="";
  LoanColleteralId:any=0;
  ActualValue:any=0;
  ForcedSaleValue:any=0;
  Remarks:any="";
  ExpiryDate:any=new Date
  CollateralList:any;
  Delete:any=false;
  LoanId:any;
  isValid:boolean=true;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  ShowSide:boolean=false;
  isDisconnected: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<CollateralComponent>, private service:LoanApplicationService,
  private router:Router ) {
    this.isSuccess=false;
    this.errDescription=''
   }

  ngOnInit(): void {
  //console.log('id',this.data.LoanId)
  //console.log('id1',this.data.CollateralId);
  console.log('id1',this.data.ForceValue);
  
  if(this.data.CollateralId==null)
  this.resetForm()
  else{
    this.service.getLoanCollateral(parseInt(this.data.CollateralId)).subscribe(Response =>{
      this.LoanColleteralId = Response.loanCollateral.id;
      this.OwnerName = Response.loanCollateral.OwnerName;
      this.ColleteralId = Response.loanCollateral.CollateralId;
      this.RegistrationDetails = Response.loanCollateral.RegistrationDetails;
      this.ActualValue = Response.loanCollateral.ActualValue;
      this.ForcedSaleValue = Response.loanCollateral.ForcedSaleValue;
      this.Remarks = Response.loanCollateral.Remarks;
      this.ExpiryDate = Response.loanCollateral.ExpiryDate;
    })
  }
  this.ExpiryDate=new Date().toISOString().split('T')[0];  
  
  this.refreshList();
  }
  formValidation(){
    this.isValid=true;
    if(this.ColleteralId==0)
    this.isValid=false;
    if(this.OwnerName=='')
    this.isValid=false;
    if(this.RegistrationDetails=='')
    this.isValid=false;
    if(this.ActualValue==0)
    this.isValid=false;
    return this.isValid;
   }
   Reload(){
    window.location.reload();
  }
   successmsg() {
     Swal.fire("Process Succeeded");
   }
  onSubmit(ColleteralId,OwnerName,RegistrationDetails,ActualValue,ForcedSaleValue,Remarks,ExpiryDate){
    if(this.data.LoanId==null){
      confirm("Please select a Loan before adding Collateral")
      this.dialogRef.close();
      return
    }
    if(this.formValidation()){
      this.loading=true;
    this.LoanId=this.data.LoanId
    if(this.data.CollateralId==null)
    this.service.AddLoanCollateral(this.LoanId,ColleteralId,OwnerName,RegistrationDetails,ActualValue,ForcedSaleValue,Remarks,ExpiryDate,this.Delete=false).subscribe(Response =>{
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
      this.service.UpdateLoanCollateral(this.data.CollateralId,this.LoanId,ColleteralId,OwnerName,RegistrationDetails,ActualValue,ForcedSaleValue,Remarks,ExpiryDate,this.Delete=false).subscribe(Response =>{
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
  refreshList(){
    this.service.getAllCollateral().subscribe((Response)=>{
    this.CollateralList=Response;  
    });
   
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.ColleteralId=0;
    this.OwnerName='';
    this.RegistrationDetails='';
    this.ActualValue=0;
    this.ForcedSaleValue=0;
    this.ExpiryDate=new Date;
    this.Remarks='';
   }
   moveToCallateral(){
    this.router.navigate(['/view-loan-collateral']);
    this.dialogRef.close();
   }
   updateTotal(){
  this.ForcedSaleValue=parseFloat((this.ActualValue*(this.data.ForceValue/100)).toFixed(2))
   }
}
