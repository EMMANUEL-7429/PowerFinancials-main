import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService }  from 'src/app/shared/service/account-transaction.service';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-disbursed-loan',
  templateUrl: './view-disbursed-loan.component.html',
  styleUrls: ['./view-disbursed-loan.component.scss']
})
export class ViewDisbursedLoanComponent implements OnInit {
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
  LoanChargesList:any
  LoanTypeCharges:[];
    public loading: boolean = false;
    constructor(@Inject(MAT_DIALOG_DATA)public data,
    public dialogRef:MatDialogRef<ViewDisbursedLoanComponent>,public loanservice:LoanApplicationService,
    private pfservice:PowerFinancialService,private currentRoute:ActivatedRoute,public service:AccountTransactionService,
private toastr: ToastrService,private router:Router ) {
        this.isSuccess=false;
        this.errDescription='';
         this.loanservice.GetAllLoanTypeCharges().subscribe(res=>{
      this.LoanTypeCharges=res as [];
    });
    
       }
  
    ngOnInit(): void {

      this.loanservice.getLoan(parseInt(this.data.LoanId)).subscribe(Response =>{
        console.log(this.data.LoanId)
        this.LoanId=Response.loan.LoanId
        this.MemberId=Response.loan.MemberId ;
        this.LoanCode=Response.loan.Code ;
        this.LoanAmount=Response.loan.LoanAmount ;
        this.ApproveAmount=Response.loan.LoanAmount;
        this.LoanPurposeId=Response.loan.PurposeId;
        this.ApplicationDate=Response.loan.ApplicationDate;
        this.PaymodeId=Response.loan.PayModeId;
        this.BankId=Response.loan.BankId;
        this.ChequeType=Response.loan.ChequeType;
        this.ChequeNo=Response.loan.ChequeNo;
        this.RepaymentCharge=Response.loan.RepaymentChargeMethod;
        this.ChargeAmount=Response.loan.ChargeAmount;
        this.CollectedAmount=Response.loan.DisbursedAmount;
        this.DisbursementDate=Response.loan.DisbursementDate;
       // this.loanservice.LoanApplicationForm.LoanTypeId=Response.loan.LoanTypeId ;
        this.pfservice.getMember(parseInt(this.MemberId)).subscribe(Response =>{
          this.MemberNo=Response.member.MemberNo;
          this.FullName=Response.member.FullName;
          this.IdNo=Response.member.IdNo;
        }) ;
        this.loanservice.GetSumLoanCharges(this.data.LoanId).subscribe(Response =>{
          this.TotalChargeList=Response;
          this.ChargeAmount = this.TotalChargeList['TotalAmount'];
          
         })
       
      })
     

      this.refreshLoanPurposeList();
      this.refreshPaymentModesList();
      this.refreshBankList();
      this.RefreshChargeList();
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
        if(Name=="From Loan"){
        this.CollectedAmount=parseFloat((this.LoanAmount-this.ChargeAmount).toFixed(2));
         this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))
        }
        if(Name=="Pay Cash"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2));
           this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))    
        }
        if(Name=="Repayment Account"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2)) 
          this.RepaymentAmount=parseFloat((this.LoanAmount+this.ChargeAmount).toFixed(2)) 
        }
        if(Name=="None"){
          this.CollectedAmount=parseFloat((this.LoanAmount*1).toFixed(2)) 
          this.RepaymentAmount=parseFloat((this.LoanAmount*1).toFixed(2))  
        }
       
  
      }
      RefreshChargeList(){
       this.loanservice.getAllLoanApplicationCharges(this.data.LoanId).subscribe(Response =>{
      this.LoanChargesList=Response;
      
     })
      }
      getLoanTypeName(id: any) : string {
        var name: string;
        if(this.LoanTypeCharges){
        if(id>0){
        this.LoanTypeCharges.some((obj)=>{
          //var dim=obj as Element;
          if(obj["LoanChargesListId"]==id){
            name=obj["Name"];
            return true;
          }
        })}}
        return name;
      }
        

}
