import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { AddLoantypeChargesComponent } from '../add-loantype-charges/add-loantype-charges.component';
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-loantype',
  templateUrl: './add-loantype.component.html',
  styleUrls: ['./add-loantype.component.scss']
})
export class AddLoantypeComponent implements OnInit {
//Tab Manipulation
selectedIndex: number = 0;
maxNumberOfTabs: number = 3;

//Tab Labels
Tab1: any="Loan Details";
Tab2: any="Other Charges";
Tab3: any="Interest Accrual Settings";
public loading: boolean = false;
spinnerContent:any;
isDisconnected: boolean = false;

//Loan Details
LoanTypeId:any=0;
RefCode:any="";
Description:any="";
MaxPeriod:any="";
InterestRate:any=0;
InterestRateFrequency:any="3";
MinAmount:any=0;
MaxAmount:any=0;
IncomeFactor:any=0;
ChargeInterestDuringGracePeriod:any=false;
SharesFactor:any=0;
MinGuarantors:any=0;
MaxGuarantors:any=0;
InterestPayMethod:any="3";
DefaultPenalty:any=0;
DefaultPenaltyFrequency:any="";
Moratorium:any=0;
MinShares:any=0;
InterestCalFormula:any="1";
MinPeriod:any=0;
LoansFactor:any=0;
RepaymentFrequency:any="3";
GracePeriod:any="";
ApplyPenaltyAfterMaturity:any=false;
IsSecure:any=false;
Consider23rdRule:any=false;
PreConsiderInterest:any=false;
ForgoneInterest:any=false;
AllowPartialDisbursements:any=false;
AllowTopups:any=false;
AdjustInterestRate:any=false;
ConsiderLoanSeries:any=false;
IsMarkupBased:any=false;
ForcedSaleValue:any=0;
UseOfZeroShares:any=false;
MarginBaseAmount:any="";
IncrementValue:any="";
IsMobileLoan:any=false;
IsIncrementFactor:any=false;
NearestPrincipleRounding:any="";
PrincipalRoundingType:any="";
NearestInterestRounding:any="";
InterestRoundingType:any="";
Category:any="";
Remarks:any="";
intPostingPeriod:any=0
intPostingFrequency:any=1;

public  LoanTypeCharges: Object;//change to Object if using data tables
public temp: Object=false;

LoanTypeIdStored:any=0;
IsBtnSee:any=false;
IsUpdateBtnSee:any=true;

ChargeNameList: any;
LoanTypesList:any;

isValid:any=true;

Delete:any=false;
loanResp:any;
loanAppResp:any;
isSuccess:any;
errDescription:any;



constructor(public dialog: MatDialog,
  private toastr: ToastrService,private _snackBar: MatSnackBar, 
  private router:Router, private loanTypeService :LoanApplicationService,
  private currentRoute:ActivatedRoute) { 

}

ngOnInit(): void {
  this.loanTypeService.getAllLoanChargesList().subscribe(Response => {
    this.ChargeNameList = Response;
  },(error)=>{
    this.isDisconnected=true;
  });

  this.loanTypeService.getAllLoanTypes().subscribe(Response => {
    this.LoanTypesList = Response;
  },(error)=>{
    //this.spinner.hide();
    this.isDisconnected=true;
  });

  let LoanTypeId=this.currentRoute.snapshot.paramMap.get('id');
  if(LoanTypeId==null){
    this.ClearData();
  
  }else{
  this.loanTypeService.getLoanTypeById(parseInt(LoanTypeId)).subscribe(Response =>{

    console.log(Response);
    this.LoanTypeId=Response.loantypes.LoanTypeId;
    this.LoanTypeIdStored=Response.loantypes.LoanTypeId;
    localStorage.setItem('LoanTypeId-A', Response.loantypes.LoanTypeId);
    this.IsBtnSee = false;
    this.IsUpdateBtnSee=false;
   
    this.RefCode=Response.loantypes.RefCode;
    this.Description=Response.loantypes.Description;
    this.MaxPeriod=Response.loantypes.MaxPeriod;
    this.InterestRate=Response.loantypes.InterestRate;
    this.InterestRateFrequency=Response.loantypes.InterestRateFrequency;
    this.MinAmount=Response.loantypes.MinAmount;
    this.MaxAmount=Response.loantypes.MaxAmount;
    this.IncomeFactor=Response.loantypes.IncomeFactor;
    this.ChargeInterestDuringGracePeriod=Response.loantypes.ChargeInterestDuringGracePeriod;
    this.SharesFactor=Response.loantypes.SharesFactor;
    this.MinGuarantors=Response.loantypes.MinGuarantors;
    this.MaxGuarantors=Response.loantypes.MaxGuarantors;
    this.InterestPayMethod=Response.loantypes.InterestPayMethod;
    this.DefaultPenalty=Response.loantypes.DefaultPenalty;
    this.DefaultPenaltyFrequency=Response.loantypes.DefaultPenaltyFrequency;
    this.Moratorium=Response.loantypes.Moratorium;
    this.MinShares=Response.loantypes.MinShares;
    this.InterestCalFormula=Response.loantypes.InterestCalFormula;
    this.MinPeriod=Response.loantypes.MinPeriod;
    this.LoansFactor=Response.loantypes.LoansFactor;
    this.RepaymentFrequency=Response.loantypes.RepaymentFrequency;
    this.GracePeriod=Response.loantypes.GracePeriod;
    this.ApplyPenaltyAfterMaturity=Response.loantypes.ApplyPenaltyAfterMaturity;
    this.IsSecure=Response.loantypes.IsSecure;
    this.ChargeInterestDuringGracePeriod=Response.loantypes.ChargeInterestDuringGracePeriod;
    this.PreConsiderInterest=Response.loantypes.PreConsiderInterest;
    this.ForgoneInterest=Response.loantypes.ForgoneInterest;
    this.AllowPartialDisbursements=Response.loantypes.AllowPartialDisbursements;
    this.AllowTopups=Response.loantypes.AllowTopups;
    this.AdjustInterestRate=Response.loantypes.AdjustInterestRate;
    this.ConsiderLoanSeries=Response.loantypes.ConsiderLoanSeries;
    this.IsMarkupBased=Response.loantypes.IsMarkupBased;
    this.ForcedSaleValue=Response.loantypes.ForcedSaleValue;
    this.UseOfZeroShares=Response.loantypes.UseOfZeroShares;
    this.MarginBaseAmount=Response.loantypes.MarginBaseAmount;
    this.IncrementValue=Response.loantypes.IncrementValue;
    this.IsMobileLoan=Response.loantypes.IsMobileLoan;
    this.IsIncrementFactor=Response.loantypes.IsIncrementFactor;
    this.NearestPrincipleRounding=Response.loantypes.NearestPrincipleRounding;
    this.PrincipalRoundingType=Response.loantypes.PrincipalRoundingType;
    this.NearestInterestRounding=Response.loantypes.NearestInterestRounding;
    this.InterestRoundingType=Response.loantypes.InterestRoundingType;
    this.Category=Response.loantypes.Category;
    this.Remarks=Response.loantypes.Remarks;
    this.intPostingPeriod=Response.loantypes.IntPostingPeriod;
    this.intPostingFrequency=Response.loantypes.IntPostingFrequency;
    this.Consider23rdRule=Response.loantypes.Consider23rdRule;    
    this.getData();    
  })
  }
  
}

onSubmit(RefCode,Description,MaxPeriod,InterestRate,InterestRateFrequency,MinAmount,MaxAmount,IncomeFactor,ChargeInterestDuringGracePeriod,SharesFactor,MinGuarantors,MaxGuarantors,
  InterestPayMethod,DefaultPenalty,DefaultPenaltyFrequency,Moratorium,MinShares,InterestCalFormula,MinPeriod,LoansFactor,RepaymentFrequency,GracePeriod,ApplyPenaltyAfterMaturity,
  IsSecure,Consider23rdRule,PreConsiderInterest,ForgoneInterest,AllowPartialDisbursements,AllowTopups,AdjustInterestRate,ConsiderLoanSeries,IsMarkupBased,
  ForcedSaleValue,UseOfZeroShares,MarginBaseAmount,IncrementValue,IsMobileLoan,IsIncrementFactor,NearestPrincipleRounding,PrincipalRoundingType,NearestInterestRounding,InterestRoundingType,
  Category,Remarks,intPostingFrequency,intPostingPeriod){
   
    /*if(this.Description ==""){
     confirm("Name is required  ***"); 
      return; 
    }
    if(this.intPostingPeriod ==0){
      confirm("Posting period is required ***"); 
      return; 
    }
    if(this.intPostingFrequency ==""){
      confirm("Posting Frequency is required ***"); 
      return; 
    } */ 
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
        this.loading = true;
      }    
    this.LoanTypeId=this.currentRoute.snapshot.paramMap.get('id');
    if(this.LoanTypeId==null)
           
           this.loanTypeService.AddLoanType(RefCode,Description,MaxPeriod,InterestRate,InterestRateFrequency,MinAmount,MaxAmount,IncomeFactor,ChargeInterestDuringGracePeriod,SharesFactor,MinGuarantors,MaxGuarantors,
            InterestPayMethod,DefaultPenalty,DefaultPenaltyFrequency,Moratorium,MinShares,InterestCalFormula,MinPeriod,LoansFactor,RepaymentFrequency,GracePeriod,ApplyPenaltyAfterMaturity,
            IsSecure,Consider23rdRule,PreConsiderInterest,ForgoneInterest,AllowPartialDisbursements,AllowTopups,AdjustInterestRate,ConsiderLoanSeries,IsMarkupBased,
            ForcedSaleValue,UseOfZeroShares,MarginBaseAmount,IncrementValue,IsMobileLoan,IsIncrementFactor,NearestPrincipleRounding,PrincipalRoundingType,NearestInterestRounding,InterestRoundingType,
            Category,Remarks, this.Delete,intPostingFrequency,intPostingPeriod).subscribe(Response =>{ 

             this.loanAppResp = Response;
             this.isSuccess = this.loanAppResp['IsSuccess'];
             this.errDescription = this.loanAppResp['ErrorDescription'];

             if (this.isSuccess==false && this.errDescription!=''){
               confirm(this.errDescription);
              
               return;
            }

            if (this.isSuccess==true){
            this.successmsg();
            this.ClearData();          
            this.loading = false;
            this.selectedIndex=0;
             this.LoanTypeIdStored=this.loanAppResp['LoanTypeId'];
             localStorage.setItem('LoanTypeId-A', this.LoanTypeIdStored);
             this.getData();           
             
            }
           } ,(error)=>{
              this.isDisconnected=true;
            });
    else{
   
      
           this.loanTypeService.UpdateLoanType(this.LoanTypeId,RefCode,Description,MaxPeriod,InterestRate,InterestRateFrequency,MinAmount,MaxAmount,IncomeFactor,ChargeInterestDuringGracePeriod,SharesFactor,MinGuarantors,MaxGuarantors,
            InterestPayMethod,DefaultPenalty,DefaultPenaltyFrequency,Moratorium,MinShares,InterestCalFormula,MinPeriod,LoansFactor,RepaymentFrequency,GracePeriod,ApplyPenaltyAfterMaturity,
            IsSecure,ChargeInterestDuringGracePeriod,PreConsiderInterest,ForgoneInterest,AllowPartialDisbursements,AllowTopups,AdjustInterestRate,ConsiderLoanSeries,IsMarkupBased,
            ForcedSaleValue,UseOfZeroShares,MarginBaseAmount,IncrementValue,IsMobileLoan,IsIncrementFactor,NearestPrincipleRounding,PrincipalRoundingType,NearestInterestRounding,InterestRoundingType,
            Category,Remarks, this.Delete,intPostingFrequency,intPostingPeriod).subscribe(Response =>{ 

              
             this.loanAppResp = Response;
             this.isSuccess = this.loanAppResp['IsSuccess'];
             this.errDescription = this.loanAppResp['ErrorDescription'];

             if (this.isSuccess==false && this.errDescription!=''){
               confirm(this.errDescription);             
               return;
              }

            if (this.isSuccess==true){
             this.successmsg();
             this.ClearData();
             this.loading=false;
             //this.LoanTypeIdStored=this.loanAppResp['LoanTypeId'];
             //localStorage.setItem('LoanTypeId-A', this.LoanTypeIdStored);
            this.router.navigate(['/loan-type-list'])
             
            }
           } ,(error)=>{
             
              this.isDisconnected=true;
            });
    }
    }
  } 
  onMaxPerioInput(){
    this.intPostingPeriod=this.MaxPeriod;
    this.setMarkupDefault();
  }
  setMarkupDefault(){
    if(this.InterestPayMethod==5){//markup.. we might have to consider if/when loading
      this.intPostingPeriod=1;
    }
  }
  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  selectTabOne() {
    if (this.formValidationTabOne()) 
    {
      this.selectedIndex = 1;
    }
  }
  formValidationTabOne(){
this.isValid=true;
if(this.Description=="")
  this.isValid=false;
if(this.MaxPeriod==0)
  this.isValid=false;
if(this.InterestRate==0)
  this.isValid=false;
if(this.InterestRateFrequency=="")
  this.isValid=false;
if(this.InterestPayMethod=="")
  this.isValid=false;
return this.isValid;
}
selectTabTwo(){
  if(this.formValidationTwo())
  {
    this.selectedIndex=2;
  }
}
selectTabThree(){
  //if(this.formValidationTwo())
  //{
    this.selectedIndex=3;
  //}
}
formValidationTwo(){
this.isValid=true;
if(this.RepaymentFrequency=="")this.isValid=false;
return this.isValid;
}
formValidation(){
  this.isValid=true;
if(this.Description=="")
  this.isValid=false;
if(this.MaxPeriod==0)
  this.isValid=false;
if(this.InterestRate==0)
  this.isValid=false;
if(this.InterestRateFrequency=="")
  this.isValid=false;
if(this.InterestPayMethod=="")
  this.isValid=false;
if(this.RepaymentFrequency=="")
  this.isValid=false
if(this.intPostingFrequency==0)
  this.isValid=false;
if(this.intPostingPeriod==0)
  this.isValid=false;
return this.isValid;
}
  
  clearComponent(){
    this.ClearData();
    this.LoanTypeIdStored =0;
    localStorage.setItem('LoanTypeId-A', '0');
    this.IsUpdateBtnSee=true;
    this.IsBtnSee = false;
    this.router.navigate(['/loan-type']);

  }


ClearData(){

    this.LoanTypeId=0;
    this.RefCode="";
    this.Description="";
    this.MaxPeriod="";
    this.InterestRate=0;
    this.InterestRateFrequency="3";
    this.MinAmount=0;
    this.MaxAmount=0;
    this.IncomeFactor=0;
    this.ChargeInterestDuringGracePeriod=false;
    this.SharesFactor=0;
    this.MinGuarantors=0;
    this.MaxGuarantors=0;
    this.InterestPayMethod="3";
    this.DefaultPenalty=0;
    this.DefaultPenaltyFrequency="";
    this.Moratorium=0;
    this.MinShares=0;
    this.InterestCalFormula="1";
    this.MinPeriod=0;
    this.LoansFactor=0;
    this.RepaymentFrequency="3";
    this.GracePeriod="";
    this.ApplyPenaltyAfterMaturity=false;
    this.IsSecure=false;
    this.ChargeInterestDuringGracePeriod=false;
    this.PreConsiderInterest=false;
    this.ForgoneInterest=false;
    this.AllowPartialDisbursements=false;
    this.AllowTopups=false;
    this.AdjustInterestRate=false;
    this.ConsiderLoanSeries=false;
    this.IsMarkupBased=false;
    this.ForcedSaleValue=0;
    this.UseOfZeroShares=false;
    this.MarginBaseAmount="";
    this.IncrementValue="";
    this.IsMobileLoan=false;
    this.IsIncrementFactor=false;
    this.NearestPrincipleRounding="";
    this.PrincipalRoundingType="";
    this.NearestInterestRounding="";
    this.InterestRoundingType="";
    this.Category="";
    this.Remarks="";
    this.intPostingFrequency=1;
    this.intPostingPeriod=0;
}


informChange(tabIndex:number) {
  this.selectedIndex = tabIndex;
}
successmsg() {
  Swal.fire("Process Succeeded");
}
Reload(){
  window.location.reload();
}

CreateLoanCharge(){
  if (this.LoanTypeIdStored!=0){
    const dialogRef = this.dialog.open(AddLoantypeChargesComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.temp =false;
      this.getData();
      localStorage.setItem('LoanTypeChargesId-A', '0');
    });
  }else{
 confirm('You need to create a LoanType first before adding LoanType Charges');
  }
  
}

getData(){
  this.temp =false;
  this.spinnerContent='Loading Loan Type Charges....';
  //this.spinner.show();
  this.loanTypeService.GetAllLoanTypeChargesByLoanTypeId(parseInt(this.LoanTypeIdStored)).subscribe(Response => {
    //this.spinner.hide();
    this.LoanTypeCharges = Response;
    this.temp = true;
  },(error)=>{
    //this.spinner.hide();
    this.isDisconnected=true;
  });
}

onUpdate(LoanChargesListTariffId:any){
  localStorage.setItem('LoanTypeChargesId-A', LoanChargesListTariffId);
  const dialogRef = this.dialog.open(AddLoantypeChargesComponent, {
  });
   dialogRef.afterClosed().subscribe(result => {
    this.getData();
    localStorage.setItem('LoanTypeChargesId-A', '0');
  });
}

onDelete(LoanChargesListTariffId:any){
  if(confirm('Are you sure yu want to delete this record?')){
    this.loanTypeService.DeleteLoanTypeCharges(LoanChargesListTariffId).subscribe(res=>{
      this.getData();
      this.successmsg();
      });
  }
}

viewList(){
  this.LoanTypeIdStored=0;
  localStorage.setItem('LoanTypeId-A', '0');
  this.router.navigate(['/loan-type-list']);
}

getLoanChargesListName(id: any) : string {
  var name: string;
  if(this.ChargeNameList){
  if(id>0){
  this.ChargeNameList.some((obj)=>{
    if(obj["LoanChargesListId"]==id){
      name=obj["Name"];
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
    if(obj["LoanTypeId"]==id){
      name=obj["Description"];
      return true;
    }
  })}}
  return name;
}

}