import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
import { DisburseChargesComponent } from '../../disburse-charges/disburse-charges.component';

@Component({
  selector: 'app-add-loan-disbursement',
  templateUrl: './add-loan-disbursement.component.html',
  styleUrls: ['./add-loan-disbursement.component.scss']
})
export class AddLoanDisbursementComponent implements OnInit {
  LoanId:any;
  MemberId:any=0
  ApplicationDate:any;
  MemberNo:any="";
  FullName:any="";
  Payroll:any="";
  IdNo:any="";
  LoanCode:any=""
  LoanAmount:any=0;
  ApproveAmount:any=0;
  LoanPurposeList:any;
  LoanPurposeId:any=0;
  PayModeList:any;
  PaymodeId:any=0;
  BankId:any=0;
  BankList:any;
  ChequeType:any="Manual";
  TotalChargeList:any;
  ChargeAmount:any=0;
  RepaymentCharge:any='';
  CollectedAmount:any=0;
  DisbursementDate:any=new Date;
  isValid:boolean=true;
  ChequeNo:any="";
  RepaymentAmount:any=0;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isDisconnected: boolean = false;
    public loading: boolean = false;
    constructor(public dialog:MatDialog,public loanservice:LoanApplicationService,
    private pfservice:PowerFinancialService,private currentRoute:ActivatedRoute,public service:AccountTransactionService,
    private toastr: ToastrService,private router:Router ) {
        this.isSuccess=false;
        this.errDescription=''
       }
  
    ngOnInit(): void {
       let LoanId=this.currentRoute.snapshot.paramMap.get('id');
      if(LoanId==null)
      this.resetForm();
      else{
      
     
      this.loanservice.getLoan(parseInt(LoanId)).subscribe(Response =>{
        this.LoanId=Response.loan.LoanId
        this.MemberId=Response.loan.MemberId ;
        this.LoanCode=Response.loan.Code ;
        this.LoanAmount=Response.loan.LoanAmount ;
        this.ApproveAmount=Response.loan.LoanAmount;
        this.LoanPurposeId=Response.loan.PurposeId;
        this.ApplicationDate=Response.loan.ApplicationDate;
       // this.loanservice.LoanApplicationForm.LoanTypeId=Response.loan.LoanTypeId ;
        this.pfservice.getMember(parseInt(this.MemberId)).subscribe(Response =>{
          this.MemberNo=Response.member.MemberNo;
          this.FullName=Response.member.FullName;
          this.IdNo=Response.member.IdNo;
        }) ;
        this.loanservice.GetSumLoanCharges(LoanId).subscribe(Response =>{
          this.TotalChargeList=Response;
          this.ChargeAmount = this.TotalChargeList['TotalAmount'];
          
         })
       
      })
      }
      this.DisbursementDate=new Date().toISOString().split('T')[0];
      this.refreshLoanPurposeList();
      this.refreshPaymentModesList();
      this.refreshBankList();
    }
    
successmsg() {
  Swal.fire("Process Succeeded");
}
Reload(){
  window.location.reload();
}
    openForEditLoanCharges(ChargeIndex){ 
  
      const dialogConfig= new MatDialogConfig();
      dialogConfig.autoFocus=true;
      dialogConfig.disableClose=true;
      dialogConfig.data={ChargeIndex,LoanId:this.LoanId};
      this.dialog.open(DisburseChargesComponent,dialogConfig)
    
    }
    refreshLoanPurposeList(){
      this.loanservice.getAllLoanPurposes().subscribe(Response =>{
        this.LoanPurposeList=Response;
      })
    }
    refreshPaymentModesList(){
      this.service.GetAllPaymentModes().subscribe(Response =>{
        this.PayModeList=Response;
      })
      }
      refreshBankList(){
        this.pfservice.getAllBank().subscribe((Response)=>{
          this.BankList=Response;
          
          });
         
      }
      updateBalance(Name:string){
        if(Name=="1"){
        this.CollectedAmount=parseFloat((this.LoanAmount-this.ChargeAmount).toFixed(2));
         this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))
        }
        if(Name=="2"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2));
           this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))    
        }
        if(Name=="3"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2)) 
          this.RepaymentAmount=parseFloat((this.LoanAmount+this.ChargeAmount).toFixed(2)) 
        }
        if(Name=="4"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2)) 
          this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))  
        }
       
  
      }
   
      formValidation(){
      this.isValid=true;
      if(this.PaymodeId==0)
      this.isValid=false;
      if(this.RepaymentCharge=='')
      this.isValid=false;
      return this.isValid;
     }
     onSubmit(PaymodeId,BankId,ChequeType,ChequeNo,RepaymentCharge,ChargeAmount,CollectedAmount,RepaymentAmount,DisbursementDate){
       console.log('date',DisbursementDate)
       if(this.formValidation()){
          this.loading=true;
      this.loanservice.DisbersedLoans(this.LoanId,PaymodeId,BankId,ChequeType,ChequeNo,RepaymentCharge,ChargeAmount,CollectedAmount,RepaymentAmount,DisbursementDate).subscribe(Response =>{
       this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp['IsSuccess'];
        this.errDescription = this.loanAppResp['ErrorDescription'];
        if (this.isSuccess==false && this.errDescription!=''){
    confirm(this.errDescription);
          this.loading=false;
          return;
         }
       if (this.isSuccess==true){
        this.successmsg();
        this.resetForm();
        this.loading=false;
        this.router.navigate(['/loan-disbersement-list']);
       }
  
   })
       }
     }
    resetForm(form?:NgForm){
      if(form!=null)
      form.resetForm();
      this.MemberNo='';
      this.FullName='';
      this.Payroll='';
      this.IdNo='';
      this.LoanCode='';
      this.LoanAmount=0;
      this.ApproveAmount=0;
      this.LoanPurposeId=0;
      this.PaymodeId=0;
      this.BankId=0;
      this.CollectedAmount=0;
      this.DisbursementDate=new Date;
      this.ChargeAmount=0;
      this.ChequeNo='';
      this.RepaymentAmount=0;
     
   }
      
}
