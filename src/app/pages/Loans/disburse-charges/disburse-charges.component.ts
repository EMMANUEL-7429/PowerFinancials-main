import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';

@Component({
  selector: 'app-disburse-charges',
  templateUrl: './disburse-charges.component.html',
  styleUrls: ['./disburse-charges.component.scss']
})
export class DisburseChargesComponent implements OnInit {
  LoanChargesList:any;
  LoanTypeCharges:any;
  constructor(private loanservice:LoanApplicationService,@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<DisburseChargesComponent> ) {
    this.loanservice.GetAllLoanTypeCharges().subscribe(res=>{
      this.LoanTypeCharges=res as [];
    });
    
   }

  ngOnInit(): void {
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
