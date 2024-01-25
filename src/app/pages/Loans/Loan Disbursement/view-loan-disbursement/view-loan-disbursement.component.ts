import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import { ViewDisbursedLoanComponent } from '../../view-disbursed-loan/view-disbursed-loan.component';

@Component({
  selector: 'app-view-loan-disbursement',
  templateUrl: './view-loan-disbursement.component.html',
  styleUrls: ['./view-loan-disbursement.component.scss']
})
export class ViewLoanDisbursementComponent implements OnInit {
  public LoanList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  LoanTypeList:any;
  MemberList:any
  LoanPurposeList:any;
  CreditOfficerList:any;
  CurrencyList:any;


  spinnerContent:any;

  LoanId:any=0;
  public ErrorList: any;
  IsSuccess: any;
  ErrorDescription:any;
  Resp: any;

  LoanShareFactorError:any;
  LoanShareFactorErrorState:any = false;
  LoanMinPeriodError:any;
  LoanSharesError:any;
  LoanMaxError:any;
  LoanMinError:any;
  CollateralError: any;
  GuarantorSecureError: any;
  MinGuarantorsError: any;
  MaxGuarantorsError: any;
  IsValidationSuccess:any=false;
  LoanTypesList:any;
  TotalLoanList:any;
  TotalLoan:any;


  constructor(public dialog: MatDialog,private service:LoanApplicationService,private router:Router,private toastr:ToastrService,private pfservice:PowerFinancialService,
   ) {
     // this.service.GetAllLoanTypes().subscribe(Response =>{
      //  this.LoanTypeList=Response;
     // })
     this.service.getAllLoanTypes().subscribe(Response =>{
      this.LoanTypeList=Response;
   })
    this.pfservice.getAllMembers().subscribe(Response =>{
      this.MemberList=Response;
    })
   this.service.getAllLoanPurposes().subscribe(Response =>{
    this.LoanPurposeList=Response;
   })
    this.pfservice.GetAllCreditOfficers().subscribe(Response =>{
      this.CreditOfficerList=Response;
    })
    this.pfservice.getAllCurrency().subscribe(Response =>{
      this.CurrencyList=Response;
    })
    
    this.service.getAllLoanTypes().subscribe(Response => {
      this.LoanTypesList = Response;
    });
  
    
    
   }

  ngOnInit(): void {
    this.refreshList();
    this.service.GetTotalLoanDisbersed().subscribe(Response =>{
      this.TotalLoanList=Response;
     this.TotalLoan = this.TotalLoanList['CountRows'];

    })
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.GetAllLoanDisbursed().subscribe(Response =>{
     this.LoanList=Response;
     this.temp=true;
    this.isNodeLoading=false;
    })
  }
  openforEditLoan(LoanId:number){
    this.router.navigate(['/loan-application/edit/'+LoanId]);
  }
  OnDeleteLoan(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    //this.service.DeletetblLoan(id).subscribe((Response) =>{
     // this.refreshList();
      this.toastr.warning('Process Succeeded', 'Power Financial System');
      //   })
    }  
      getLoanType
      (id: any) : string {
        var name: string;
        if(this.LoanTypeList){
        if(id>0){
        this.LoanTypeList.some((obj)=>{
          //var dim=obj as Element;
          if(obj["LoanTypeId"]==id){
            name=obj["Name"];
            return true;
          }
        })}}
        return name;
      }
      getMemberNo(id: any) : string {
        var name: string;
        if(this.MemberList){
        if(id>0){
        this.MemberList.some((obj)=>{
          //var dim=obj as Element;
          if(obj["MemberId"]==id){
            name=obj["MemberNo"];
            return true;
          }
        })}}
        return name;
      }
      getMemberName(id: any) : string {
        var name: string;
        if(this.MemberList){
        if(id>0){
        this.MemberList.some((obj)=>{
          //var dim=obj as Element;
          if(obj["MemberId"]==id){
            name=obj["FullName"];
            return true;
          }
        })}}
        return name;
      }
      getLoanPurpose(id: any) : string {
        var name: string;
        if(this.LoanPurposeList){
        if(id>0){
        this.LoanPurposeList.some((obj)=>{
          //var dim=obj as Element;
          if(obj["LoanPurposeId"]==id){
            name=obj["Name"];
            return true;
          }
        })}}
        return name;
      }
      getLoanCreditOfficerName(id: any) : string {
        var name: string;
        if(this.CreditOfficerList){
        if(id>0){
        this.CreditOfficerList.some((obj)=>{
          //var dim=obj as Element;
          if(obj["CreditOfficerId"]==id){
            name=obj["FullName"];
            return true;
          }
        })}}
        return name;
      } 
      
      getLoanCurrency(id: any) : string {
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
    getLoanTypeName(id: any) : string {
      var name: string;
      if(this.LoanTypesList){
      if(id>0){
      this.LoanTypesList.some((obj)=>{
        //var dim=obj as Element;
        if(obj["LoanTypeId"]==id){
          name=obj["Description"];
          return true;
        }
      })}}
      return name;
    } 
    OpentoApproveLoan(LoanId:number){ 
      this.router.navigate(['/disbersement/edit/'+LoanId]);

  }
 
  ViewLoanDisbursed(DisBursedIndex,LoanId){ 

    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.data={DisBursedIndex,LoanId};
    this.dialog.open(ViewDisbursedLoanComponent,dialogConfig)
  
  }
}
