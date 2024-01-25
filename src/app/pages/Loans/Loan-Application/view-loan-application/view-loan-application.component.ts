import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-loan-application',
  templateUrl: './view-loan-application.component.html',
  styleUrls: ['./view-loan-application.component.scss']
})
export class ViewLoanApplicationComponent implements OnInit {

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


  constructor(public dialog: MatDialog,private service:LoanApplicationService,private router:Router,private pfservice:PowerFinancialService) {
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
    this.service.GetTotalLoanApplication().subscribe(Response =>{
      this.TotalLoanList=Response;
     this.TotalLoan = this.TotalLoanList['CountRows'];

    }) 
   
  }
  sucessMsg() {
    Swal.fire("Process Succeded");
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllLoanApplications().subscribe(Response =>{
     this.LoanList=Response;
     console.log(this.LoanList)
     console.log(Response)
     this.temp=true;
    this.isNodeLoading=false;
    })
  }
  openforEditLoan(LoanId:number){
    this.router.navigate(['/loan-application/edit/'+LoanId]);
  }
  OnDeleteLoan(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeletetblLoan(id).subscribe((Response) =>{
     this.refreshList();
     this.sucessMsg();
         })
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
      
      
      onAppraise(id:any){
       this.getData(id);
      }
      getData(id){
        this.service.VerifyLoanApplication(id).subscribe(Response => {          
          this.ErrorList = Response;          
          this.LoanShareFactorError = this.ErrorList['LoanShareFactorError'];
          if(this.LoanShareFactorError!=null){
            confirm(this.LoanShareFactorError);
        
          }   
          
          this.LoanMinPeriodError = this.ErrorList['LoanMinPeriodError'];
          if(this.LoanMinPeriodError!=null){
            confirm(this.LoanMinPeriodError);
            
          }
    
          
          this.LoanSharesError = this.ErrorList['LoanSharesError'];
          if(this.LoanSharesError!=null){
           confirm(this.LoanSharesError);
            //this.spinner.hide();
          }
    
          
          this.LoanMaxError = this.ErrorList['LoanMaxError'];
          if(this.LoanMaxError!=null){
          confirm(this.LoanMaxError);
            //this.spinner.hide();
          }
            
          
          this.LoanMinError = this.ErrorList['LoanMinError'];
          if(this.LoanMinError!=null){
            confirm(this.LoanMinError);
            //this.spinner.hide();
          }
          
          this.CollateralError  = this.ErrorList['CollateralError'];
          if(this.CollateralError !=null){
            confirm(this.CollateralError );
            //this.spinner.hide();
          }

          
          this.GuarantorSecureError = this.ErrorList['GuarantorSecureError'];
          if(this.GuarantorSecureError !=null){
            confirm(this.GuarantorSecureError);
            //this.spinner.hide();
          }

          
          this.MinGuarantorsError = this.ErrorList['MinGuarantorsError'];
          if(this.MinGuarantorsError !=null){
            confirm(this.MinGuarantorsError);
            //this.spinner.hide();
          }

          
          this.MaxGuarantorsError = this.ErrorList['MaxGuarantorsError'];
          if(this.MaxGuarantorsError!=null){
            confirm(this.MaxGuarantorsError);
            //this.spinner.hide();
          }
          this.IsValidationSuccess = this.ErrorList['IsSuccess'];
          if(this.IsValidationSuccess == true){           
           
            this.onMigrate();
            this.router.navigate(['/loan-appraised/edit/'+id]);
            //
          }          
        },(error)=>{
          //this.isDisconnected = true;
        });
      }
    onMigrate(){
     
     var successList = "Passed Shares Factor Rule \n Passed Minimum Membership Period Rule \n Passed Minimum Shares Rule \n Passed Maximum Loan Application Amount \n Passed Minimum Loan Application Amount \n Passed Collateral Check \n Passed Selected Guarantors Check \n Passed Minimum Guarantors Check \n Passed Maximum Guarantors Check";
      if(confirm('Process Complete. \n '+ successList +'\n Do you want to Appraise this Loan Application? ')){
   this.sucessMsg();
	

      }
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
}
