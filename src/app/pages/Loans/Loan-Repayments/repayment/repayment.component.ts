import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import { BalancesComponent } from '../balances/balances.component';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.scss']
})
export class RepaymentComponent implements OnInit {
  MemberId:any;
  LoanId:any;
  BankId:any;
  RepaymentNo:any;
 TransactionDate:any;
 ValueDate:any;
  Amount:any;
  TransType:any;
  SerialId:any;
  PaymentMode:any;
  VoucherNo:any; 
  DocumentNo:any;
  CurrencyId:any;
  ExchangeRate:any;
  BaseCurrencyId:any;  
  PaidBy:any;
  Remarks:any;
  Delete:any;
  BankList:any;
  PayModeList:any;
  CurrencyList:any;
  DefaultCurrencyLists:any;
  LoanAmount:any;
  CurrencyRateList:any;
  ForeignAmount:any;
  isValid:boolean=true;
  public loading: boolean = false;
  isSuccess:any;
  errDescription:any;
  loanResp:any;
  loanAppResp:any;
  RepayedAmount:any;
  LoanBalance:any;
  Amount1:any;
  FullName:any;
  IdNo:any;
  RepaymentId:any;
  spinnerContent:any;
  isDisconnected: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA)public data,private toastr: ToastrService,private service:AccountTransactionService,private loanservice:LoanApplicationService,private pfservice:PowerFinancialService,
  private currentRoute:ActivatedRoute,public dialogRef:MatDialogRef<RepaymentComponent>,public dialog:MatDialog) 
  { this.isSuccess=false;
    this.errDescription='';}

  ngOnInit(): void {
    console.log(this.data.RepaymentId)
      if(this.data.RepaymentId==null)      
      this.resetForm();
      else{ 
        this.pfservice.GetRepaymentLoan(parseInt(this.data.RepaymentId)).subscribe(Response =>{  
          console.log(Response)        
          this.RepaymentId=Response.Repayment.id;          
          this.LoanId=Response.Repayment.LoanId;
          this.BankId=Response.Repayment.BankId;
          this.CurrencyId=Response.Repayment.CurrencyId;
          this.SerialId=Response.Repayment.SerialId;
          this.BaseCurrencyId=Response.Repayment.BaseCurrencyId;
          this.ExchangeRate=Response.Repayment.ExchangeRate;
          this.ForeignAmount=Response.Repayment.ForeignAmount;
          this.Amount=Response.Repayment.Amount;
          this.RepaymentNo=Response.Repayment.RepaymentNo;
          this.TransactionDate=Response.Repayment.TransactionDate;
          this.ValueDate=Response.Repayment.ValueDate;
          this.TransType=Response.Repayment.TransType;
          this.PaymentMode=Response.Repayment.PaymentMode;
          this.VoucherNo=Response.Repayment.VoucherNo;
          this.DocumentNo=Response.Repayment.DocumentNo;
          this.PaidBy=Response.Repayment.PaidBy;
          this.Remarks=Response.Repayment.Remarks;         
        })
      }
    this.refreshPaymentModesList();
    this.refreshBankList();
    this. refreshCurrencyList();
    this.refreshCurrRateList();
    this. getMainCurrency();    
    this.TransactionDate=new Date().toISOString().split('T')[0]; 
    this.ValueDate=new Date().toISOString().split('T')[0]; 
    this.pfservice.getMember(parseInt(this.data.MemberId)).subscribe(Response=>{
      this.PaidBy=Response.member.FullName;
      this.FullName=Response.member.FullName;
      this.IdNo=Response.member.IdNo;
      })
      this.loanservice.getLoan(this.data.LoanId).subscribe(Response=>{
        this.LoanAmount=Response.loan.LoanAmount;        
        this.loanservice.GetSumAmount(this.data.LoanId).subscribe(Response=>{
        this.loanAppResp=Response;
        this.RepayedAmount=this.loanAppResp['Amount'];
        this.RepayedAmount*=-1;       
        this.LoanBalance=(this.LoanAmount-this.RepayedAmount); 
         })      
      }) 
      this.loanservice.getMaxRepayment(this.data.LoanId).subscribe(Response => {     
        this.loanAppResp= Response;  
        this.RepaymentNo=this.loanAppResp['RepaymentNo'];
        this.RepaymentNo=this.RepaymentNo+1;         
      });   
     
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
     refreshCurrencyList(){
      this.pfservice.getAllCurrency().subscribe((Response)=>{
        this.CurrencyList=Response;  
      });
    }
    refreshCurrRateList(){
      this.pfservice.getAllCurrencyRate().subscribe((Response)=>{
        this.CurrencyRateList=Response;  
      });
    }
     getMainCurrency(){
    this.service.getMainCurrency().subscribe(Response=>{
    this.DefaultCurrencyLists=Response;
  
    })
    
    }
 

OnSubmit(BankId, CurrencyId, SerialId,  BaseCurrencyId,  ExchangeRate,  ForeignAmount,  Amount, RepaymentNo,TransactionDate,ValueDate,TransType,  PaymentMode,  VoucherNo,DocumentNo, PaidBy,  Remarks){
  if(this.Amount1>this.LoanBalance){
    if(confirm("You cannot Repay more than  your loan Balance!!"))
  return
  }
// if(this.formValidation()){
    this.loading=true; 
  let RepaymentId=this.currentRoute.snapshot.paramMap.get('id');
  if(RepaymentId==null)    
  this.loanservice.AddLoanRepayment(this.data.LoanId,BankId, CurrencyId, SerialId,  BaseCurrencyId,  ExchangeRate,  ForeignAmount,  Amount, RepaymentNo,TransactionDate,  ValueDate,  TransType,  PaymentMode,  VoucherNo,DocumentNo, PaidBy,  Remarks,this.Delete=false).subscribe(Response=>{
    this.loanAppResp = Response;
    console.log(Response)
      this.isSuccess = this.loanAppResp['IsSuccess'];
      this.errDescription = this.loanAppResp['ErrorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        confirm(this.errDescription);
        this.loading=false;
        return;
       }
     if (this.isSuccess==true){  
    this.toastr.success('Process Succeeded','Power Financial System');
      this.resetForm();
      this.loading=false;
      this.dialogRef.close();
     } 
    })
    else
    {
      this.loanservice.UpdateLoanRepayment(this.data.RepaymentId,this.data.LoanId,BankId, CurrencyId, SerialId,  BaseCurrencyId,  ExchangeRate,  ForeignAmount,  Amount, RepaymentNo,TransactionDate,  ValueDate,  TransType,  PaymentMode,  VoucherNo,DocumentNo, PaidBy,  Remarks,this.Delete=false).subscribe(Response=>{
        this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp['IsSuccess'];
      this.errDescription = this.loanAppResp['ErrorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        confirm(this.errDescription);
        this.loading=false;
        return;
       }
     if (this.isSuccess==true){  
    this.toastr.success('Process Succeeded','Power Financial System');
      this.resetForm();
      this.loading=false;
      this.dialogRef.close();
     } 
      })
    }
  //}
  }
  convertCurrency(CurrencyId){
    console.log('CurrencyId='+CurrencyId);
    this.service.GetExchangeRateByCurrencyId(CurrencyId).subscribe(response=>{
      this.CurrencyRateList=response;
      this.ExchangeRate=this.CurrencyRateList["BuyRate"];
      this.BaseCurrencyId=this.CurrencyRateList["BaseCurrencyId"];   
          
    } )  
  }
  updateCurrencyDetails(ctrl){
    for(var items of this.DefaultCurrencyLists){
      this.ExchangeRate=items.ExchangeRate;
      this.BaseCurrencyId=items.BaseCurrencyId;      
    } 
  }
  updateAmount(){
    this.Amount=this.ForeignAmount*this.ExchangeRate;
      this.Amount*= -1
      this.Amount1=this.Amount*-1        
      if(this.Amount1>this.LoanBalance){
        if(confirm("You cannot Repay more than  your loan Balance!!"))
      return
      }
    }
  
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.BankId=0;
    this.CurrencyId=0;
    this.SerialId=0;
    this.BaseCurrencyId=0;
    this.ExchangeRate=0;
    this.RepaymentNo=0;
    this.TransactionDate=new Date()
    this.ValueDate=new Date();
    this.TransType=0;
    this.Amount=0;
    this.PaymentMode='';
    this.VoucherNo='';
    this.DocumentNo='';
    this.PaidBy='';
    this.Remarks='';
    this.ForeignAmount=0;
    this.LoanAmount=0;
  }
  formValidation(){
    this.isValid=true;
    if(this.CurrencyId==0)
    this.isValid=false;
    if(this.PaymentMode=='')
    this.isValid=false;
    if(this.TransType==0)
    this.isValid=false;
    if(this.VoucherNo=='')
    this.isValid=false;    
    return this.isValid;
   }
   ViewBalances(BalancesIndex){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.data={BalancesIndex,LoanAmount:this.LoanAmount,RepayedAmount:this.RepayedAmount}; 
    this.dialog.open(BalancesComponent,dialogConfig).afterClosed().subscribe(Response =>{
   })
  }
  
  Reload(){
    window.location.reload();
  }
}
