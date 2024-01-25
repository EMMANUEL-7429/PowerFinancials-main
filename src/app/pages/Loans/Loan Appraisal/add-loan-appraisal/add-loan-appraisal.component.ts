import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AccountTransactionService } from "src/app/shared/service/account-transaction.service";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-loan-appraisal",
  templateUrl: "./add-loan-appraisal.component.html",
  styleUrls: ["./add-loan-appraisal.component.scss"],
})
export class AddLoanAppraisalComponent implements OnInit {
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
StatusDate:any=new Date;
isValid:boolean=true;
ChequeNo:any="";
InterestRate:any=0;
PeriodFrequency:any=0;
RepayPeriod:any=0
RepaymentAmount:any=0;
LoanTypeId:any=0
loanResp:any;
loanAppResp:any;
isSuccess:any;
errDescription:any;
LoanTypeList:any;
Status:any=0;
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
      this.InterestRate=Response.loan.InterestRate ; 
      this.PeriodFrequency=Response.loan.PeriodFrequency ;
      this.RepayPeriod=Response.loan.RepayPeriod ;
      this.LoanTypeId=Response.loan.LoanTypeId ;
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
    this.StatusDate=new Date().toISOString().split('T')[0];
    this.refreshLoanPurposeList();
    this.refreshPaymentModesList();
    this.refreshBankList();
    this.refreshLoanType();
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload(){
    window.location.reload();
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
    refreshLoanType(){
      this.loanservice.getAllLoanTypes().subscribe(Response =>{
        this.LoanTypeList=Response;
      })
    }

    
  onSubmit(StatusDate){
    let LoanId=this.currentRoute.snapshot.paramMap.get('id');
    this.loading=true;
   this.loanservice.AppraisedLoans(LoanId,this.Status,StatusDate).subscribe(Response =>{
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
    this.router.navigate(['/loan-Appraisals-list']);
   }
   })
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
    this.StatusDate=new Date;
    this.InterestRate=0;
    this.PeriodFrequency=0;
    this.RepayPeriod=0;
    this.LoanTypeId=0;
   
 }
    
}
