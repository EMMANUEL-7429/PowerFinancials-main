import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionCharges } from 'src/app/shared/classes/transaction-charges';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-add-transaction-charges',
  templateUrl: './add-transaction-charges.component.html',
  styleUrls: ['./add-transaction-charges.component.scss']
})
export class AddTransactionChargesComponent implements OnInit {
formCharge:TransactionCharges;
  Commission:any=false;
  ChargesList:any;
  isValid:boolean=true;
  public loading: boolean = false;
  TariffList:any;
  showTariff:any=true;
  showCharges:any=true;
  
  constructor( @Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<AddTransactionChargesComponent>,private service:AccountTransactionService,private TarrifService:PowerFinancialService) { }

  ngOnInit(): void {
    if(this.data.AccountTransactionIndex==null)
    this.formCharge ={
      TransactionChargesId :null,
     AccountTransactionId :this.data.AccountTransactionId,
     ChargesId :0,
     IsPercent :false,
     Amount :0,
     Total :0,
     ChargesName:'',
     TariffId:0,
     Tariff:false,
     CreatedOn :new Date,
     CreatedBy :'Admin',
     ModifiedOn :new Date,
    ModifiedBy :'Admin',

   }
   else{
     this.formCharge=Object.assign({} ,this.service.TransactionCharges[this.data.AccountTransactionIndex]);
   }
   
   this.refreshList();
   this.refreshTaffList();
   this.formCharge.CreatedOn=new Date().toISOString().split('T')[0]; 
    this.formCharge.ModifiedOn=new Date().toISOString().split('T')[0]; 

  }
  refreshList(){
    this.service.GetAllCharge().subscribe(Response =>{
      this.ChargesList=Response;
    })
  }
  refreshTaffList(){
    this.TarrifService.GetAllTariffs().subscribe(Response =>{
      this.TariffList=Response;
    })
  }
 
  
  updateCharges(ctrl){
    this.showTariff=false
    if(ctrl.selectedIndex==0){
      this.formCharge.IsPercent=false;
      this.formCharge.Amount=0;
      this.formCharge.ChargesName='';
      this.formCharge.Tariff=false;

      
    }
    
    else{
      this.formCharge.IsPercent=this.ChargesList[ctrl.selectedIndex-1].IsPercent;
      this.formCharge.Amount=this.ChargesList[ctrl.selectedIndex-1].Value;
      this.formCharge.ChargesName=this.ChargesList[ctrl.selectedIndex-1].Description;
      this.formCharge.Tariff=this.ChargesList[ctrl.selectedIndex-1].Tariff;
     
      
    }
    this.updateTotal();
  }
  updateTotal(){
 if(this.formCharge.Tariff==true){
 this.service.GetTariffAmount(this.data.Amount).subscribe(Response =>{
   console.log(this.data.Amount)
  this.formCharge.Total= Response.Tariff.ChargeAmount;

 })
}
 else{
 
    if(this.formCharge.IsPercent==true)
    this.formCharge.Total=parseFloat((this.data.Amount*(this.formCharge.Amount/100)).toFixed(2))
else{
  this.formCharge.Total=parseFloat(((this.data.Amount-(this.data.Amount-this.formCharge.Amount))).toFixed(2))

}
 }
  }
  onSubmit(form:NgForm){
    if(this.data.Amount==0){
      confirm("Please enter Amount before add charge")
      this.dialogRef.close();
      return

    }
    else{
      if(this.formValidation(form.value)) {
      this.loading=true
      if(this.data.AccountTransactionIndex==null)
 this.service.TransactionCharges.push(form.value);
 
 else{
   this.service.TransactionCharges[this.data.AccountTransactionIndex]=form.value;
 }
 this.dialogRef.close();
 this.loading=false;
  }
}
}
  formValidation(formData:TransactionCharges){
    this.isValid=true;
    if(formData.ChargesId==0)
    this.isValid=false;
    if(formData.Total==0)
    this.isValid=false;
    return this.isValid;

  } 
 }
