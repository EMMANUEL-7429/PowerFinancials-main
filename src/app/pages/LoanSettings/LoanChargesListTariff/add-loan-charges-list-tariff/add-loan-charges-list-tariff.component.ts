import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-loan-charges-list-tariff',
  templateUrl: './add-loan-charges-list-tariff.component.html',
  styleUrls: ['./add-loan-charges-list-tariff.component.scss']
})
export class AddLoanChargesListTariffComponent implements OnInit {

  spinnerContent:any;
  isDisconnected: boolean = false;

    LoanChargesListTariffId:any=0; 
    LoanChargesListId:any=0; 
    FromInterval:any=0;
    ToInterval:any=0; 
    Amount:any=0;


    LoanChargesListIdA:any=0;

    LoanChargesListName:any="";

  public LoanChargesList:[];
public loading:boolean=false;

  Delete:any=false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  

  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialogRef: MatDialogRef<AddLoanChargesListTariffComponent>,
    private toastr: ToastrService,
    private router:Router, private loanTypeService :LoanApplicationService,
    private currentRoute:ActivatedRoute
  ) {
    this.spinnerContent='';
    this.isSuccess = false;
    this.isDisconnected=false;
    this.errDescription ='';
    this.LoanChargesListId = localStorage.getItem('LoanChargesListId-A');
    this.LoanChargesListTariffId= localStorage.getItem('LoanChargesListTariffId-A');

    this.loanTypeService.getAllLoanChargesList().subscribe(res=>{
      this.LoanChargesList=res as [];
    });


   }

  ngOnInit(): void {
    
    
    //let LoanChargesListTariffId=this.currentRoute.snapshot.paramMap.get('id');
    if(this.LoanChargesListTariffId==0){
      this.ClearData();
      this.FromInterval = parseInt(this.data.FromInterval) + 1;
    }else{
      this.spinnerContent='Loading Data....';
      //this.spinner.show();

      this.loanTypeService. getLoanChargesListTariffById(parseInt(this.LoanChargesListTariffId)).subscribe(Response =>{
        this.LoanChargesListTariffId=Response.loanchargeslist.LoanChargesListTariffId;
        this.LoanChargesListId=Response.loanchargeslist.LoanChargesListId;
        this.FromInterval=Response.loanchargeslist.FromInterval;
        this.ToInterval=Response.loanchargeslist.ToInterval;
        this.Amount=Response.loanchargeslist.Amount;
        //this.spinner.hide();
  })
  }
  }


  Reload(){
    window.location.reload();
  }


  
  onSubmit(LoanChargesListId, FromInterval, ToInterval, Amount){

     // this.LoanChargesListTariffId=this.currentRoute.snapshot.paramMap.get('id');
      
      if(this.LoanChargesListTariffId==0){
        this.spinnerContent='Saving Loan Charges List Tariff....';
        //this.spinner.show();
     
        
             this.loanTypeService.AddLoanChargeListTariff(LoanChargesListId, FromInterval, ToInterval, Amount, this.Delete).subscribe(Response =>{ 
  
               this.loanAppResp = Response;
               this.isSuccess = this.loanAppResp['IsSuccess'];
               this.errDescription = this.loanAppResp['ErrorDescription'];
               if (this.isSuccess==false && this.errDescription!=''){
                 confirm(this.errDescription);
                
                 this.dialogRef.close()
                 return;
                }
              if (this.isSuccess==true){
               this.successmsg();
               //this.spinner.hide();
               this.dialogRef.close()
              }
             } ,(error)=>{
               
                this.isDisconnected=true;
                this.dialogRef.close()
              });
      }else{

        this.spinnerContent='Updating Loan Charge List Tarif....';
        //this.spinner.show();
     
        
             this.loanTypeService.UpdateLoanChargeListTariff(this.LoanChargesListTariffId, LoanChargesListId, FromInterval, ToInterval, Amount, this.Delete).subscribe(Response =>{ 
  
               this.loanAppResp = Response;
               this.isSuccess = this.loanAppResp['IsSuccess'];
               this.errDescription = this.loanAppResp['ErrorDescription'];
               if (this.isSuccess==false && this.errDescription!=''){
                 confirm(this.errDescription);
                 //this.spinner.hide();
                 this.dialogRef.close()
                 return;
                }
              if (this.isSuccess==true){
              this.successmsg();
               this.ClearData();
               localStorage.setItem('LoanChargesListTariffId-A', '0');
               //this.router.navigate(['/V-LoanChargesListTariff']);
               //window.location.reload();
               //this.spinner.hide();
               this.dialogRef.close()
               
              }
             } ,(error)=>{
               // this.spinner.hide();
                this.isDisconnected=true;
                this.dialogRef.close()
              });
      }
    }


  ClearData(){
    this.LoanChargesListTariffId=0;
        this.FromInterval=0;
        this.ToInterval=0;
        this.Amount=0;
  }

  getLoanChargeName(id: any): string{
    
    var name: string;
    if(this.LoanChargesList){
    if(id>0){
    this.LoanChargesList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["LoanChargesListId"]==id){
        name=obj["Name"];
        this.LoanChargesListName=obj["Name"];
        return true;
      }
    })}}
    return name;
  }

  onExit(){
    localStorage.setItem('LoanChargesListTariffId-A', '0');
    this.dialogRef.close();

  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
}
