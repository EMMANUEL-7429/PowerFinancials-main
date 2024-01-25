import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';

import Swal from 'sweetalert2';
import { ViewLoanChargesListTariffComponent } from '../../LoanChargesListTariff/view-loan-charges-list-tariff/view-loan-charges-list-tariff.component';
@Component({
  selector: 'app-view-loan-charges',
  templateUrl: './view-loan-charges.component.html',
  styleUrls: ['./view-loan-charges.component.scss']
})
export class ViewLoanChargesComponent implements OnInit {

  public LoanChargesList: Object;//change to Object if using data tables
  public temp: Object=false;
  spinnerContent:any;
  isDisconnected: boolean = false;
  isNodeLoading:any=false;
  IsSuccess: any;
  ErrorDescription:any;
  Resp: any;

  constructor(public service :LoanApplicationService,private router:Router,private toastr: ToastrService,
    public dialog: MatDialog) { 
      this.spinnerContent='';
      this.IsSuccess = false;
      this.isDisconnected=false;
      this.ErrorDescription ='';
    }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.spinnerContent='Loading Loan Charges List....';
    //this.spinner.show();
    this.service.getAllLoanChargesList().subscribe(Response => {
     // this.spinner.hide();
      this.LoanChargesList = Response;
      this.temp = true;
    },(error)=>{
      
      this.isDisconnected=true;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }

  onUpdate(LoanChargesListId:any){
    this.router.navigate(['/Loan-Charges/edit/'+LoanChargesListId]);

  }
  addToList(){
    this.router.navigate(['/Loan-Charges']);

  }

  onListTariff(LoanChargesListId:any){
    
    window.localStorage.setItem('LoanChargesListId-V', LoanChargesListId);
    
    const dialogRef = this.dialog.open(ViewLoanChargesListTariffComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      window.localStorage.setItem('LoanChargesListId-V', 'null');
     
    });
  
  
    
  }

  onDelete(LoanChargesListId:any){
    if(confirm('Are you sure yu want to delete this record?')){
      this.service.DeleteLoanChargesList(LoanChargesListId).subscribe(res=>{
        this.getData();
        this.successmsg();
        });
    }
  }
  onView(){

  }

  Reload(){
    window.location.reload();
  }

}
