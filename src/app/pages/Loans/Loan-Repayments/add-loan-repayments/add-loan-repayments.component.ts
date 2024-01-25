import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchMemberComponent } from 'src/app/pages/memberAccounts/search-member/search-member.component';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import { RepaymentComponent } from '../repayment/repayment.component';

@Component({
  selector: 'app-add-loan-repayments',
  templateUrl: './add-loan-repayments.component.html',
  styleUrls: ['./add-loan-repayments.component.scss']
})
export class AddLoanRepaymentsComponent implements OnInit {
  MemberNo:any;
  MemberId:any;
  FullName:any;
  IdNo:any;
  LoanCode:any;
  MemberList:any;
  MemberLoanList:any;  
  ShowTable:any=false;
  LoanTypesList:any;
  LoanId:any;
  LoanRepaymentList:any;
  RepaymentId:any;
  CurrencyList:any;
  RepaymentNo:any=0;
  loanResp:any;
  loanAppResp:any;
  spinnerContent:any;
  memberIdd:any;
  IsAddmember:any;
  isValid:boolean=true;
    isDisconnected: boolean = false;
    constructor(private service:AccountTransactionService,private pfservice:PowerFinancialService,
      public loanservice :LoanApplicationService, public pfService:PowerFinancialService, private currentRoute:ActivatedRoute,private router:Router,
      private toastr: ToastrService,public dialog:MatDialog)
       {this.pfservice.getAllCurrency().subscribe(res=>{
        this.CurrencyList=res as [];
      })}
  
    ngOnInit(): void {
      let MemberId = this.currentRoute.snapshot.paramMap.get("id");
          this.pfService.getMember(parseInt(MemberId)).subscribe((Response) => {
          this.MemberId = Response.member.id;              
          this.MemberNo = Response.member.MemberNo;
          this.FullName = Response.member.FullName;       
          this.IdNo = Response.member.IdNo; 
                  
      })
      this.refreshList();
      this.refreshMemberList();
      this.refreshLoanTypeList();
      this.refreshLoanRepayment();      
           
    }
    
    refreshList(){
      this.service.GetDisbursedLoan(this.MemberId).subscribe((Response)=>{
          this.MemberLoanList=Response;           
        });
      }
      refreshMemberList(){
  this.pfservice.getAllMembers().subscribe(Response=>{
    this.MemberList=Response;
  })
  }
  refreshLoanTypeList(){
    this.loanservice.getAllLoanTypes().subscribe(Response => {
      this.LoanTypesList = Response;
  })
  }
  refreshLoanRepayment(){
    this.loanservice.getLoanRepayment(this.LoanId).subscribe(Response=>{
      this.LoanRepaymentList=Response;
    })
  }
    updateMemberDetails(ctrl){
  if(ctrl.selectedIndex==0){
  this.MemberId=0;
  this.FullName='';
  this.IdNo=0;
  }
  else{
  this.MemberId=this.MemberList[ctrl.selectedIndex-1].MemberId;
  this.FullName=this.MemberList[ctrl.selectedIndex-1].FullName;
  this.IdNo=this.MemberList[ctrl.selectedIndex-1].IdNo;
  this.service.GetDisbursedLoan(this.MemberId).subscribe((Response)=>{
    this.MemberLoanList=Response;
        
  });
    
    }
   }
   getLoanName(id: any) : string {
    var name: string;
    if(this.LoanTypesList){
    if(id>0){
    this.LoanTypesList.some((obj)=>{    
      if(obj["LoanTypeId"]==id){
        name=obj["Description"];
        return true;
      }
    })}}
    return name;
  }
  onView(Id:number){
  this.LoanId=Id
   this.ShowTable=true;
    this.loanservice.getLoanRepayment(this.LoanId).subscribe(Response=>{
    this.LoanRepaymentList=Response; 
    this.loanservice.getMaxRepayment(this.LoanId).subscribe(Response => {     
    this.loanAppResp= Response;  
    this.RepaymentNo=this.loanAppResp['RepaymentNo']; 
  
    })
  })
  
  }
  AddRepayment(RepaymentIndex,RepaymentId){ 
   
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.data={RepaymentIndex,RepaymentId,LoanId:this.LoanId,MemberId:this.MemberId,RepayNo:this.RepaymentNo}; 
  
    this.dialog.open(RepaymentComponent,dialogConfig).afterClosed().subscribe(Response =>{
    this.loanservice.getLoanRepayment(this.LoanId).subscribe(Response=>{
    this.LoanRepaymentList=Response;         
    })
    })  
  }
  DeleteRepayment(id:number){
    let RepaymentId=this.currentRoute.snapshot.paramMap.get('id'); 
    if(confirm("Are you sure you want to delete this record?"))
    this.loanservice.DeleteLoanRepayment(id).subscribe((Response) =>{
      this.loanservice.getLoanRepayment(this.LoanId).subscribe(Response=>{
        this.LoanRepaymentList=Response;   
       })
       this.toastr.warning('Process Succeeded', 'Power Financial System');
      })  
       
  }
  getCurrencyName(id: any) : string {
    var name: string;
    if(this.CurrencyList){
    if(id>0){
    this.CurrencyList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["CurrencyId"]==id){
        name=obj["CurrencyName"];
        return true;
      }
    })}}
    return name;
  }
  
  Reload(){
    window.location.reload();
  }
  openForSeachMember(ViewMembereIndex){    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width = "60%";
    dialogConfig.data={ViewMembereIndex};
    this.dialog.open(SearchMemberComponent,dialogConfig).afterClosed().subscribe(Response =>{
      this.IsAddmember = localStorage.getItem('AddMember');
    if(this.IsAddmember == 'true' && localStorage.getItem('MemberId')!=""){
      this.memberIdd= parseInt(localStorage.getItem('MemberId'));
      this.pfService.getMember(parseInt(this.memberIdd)).subscribe(Response =>{
        this.MemberId= this.memberIdd;
        this.FullName=Response.member.FullName;
        this.IdNo=Response.member.IdNo;

        this.service.GetDisbursedLoan(this.MemberId).subscribe(Response=>{
          this.MemberLoanList=Response;
          
        })
        
        localStorage.setItem('MemberId', "");
      },(error)=>{
        //Clear
        //Hebu test sasa I hope iko sawa
        localStorage.setItem('MemberId', "");
  
      });
        
    }
      
  })
   }
}
