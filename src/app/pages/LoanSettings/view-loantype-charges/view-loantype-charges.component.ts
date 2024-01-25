import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { AddLoantypeChargesComponent } from '../add-loantype-charges/add-loantype-charges.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-loantype-charges',
  templateUrl: './view-loantype-charges.component.html',
  styleUrls: ['./view-loantype-charges.component.scss']
})
export class ViewLoantypeChargesComponent implements OnInit {

  public LoanTypeChargesList: Object;//change to Object if using data tables
  public temp: Object=false;
  spinnerContent:any;
  isDisconnected: boolean = false;

  ChargeNameList: any;
  LoanTypesList:any;

  IsSuccess: any;
  ErrorDescription:any;
  Resp: any;

  LoanTypeId:any=0;
  isNodeLoading:any=false;

  constructor(public dialogRef: MatDialogRef<ViewLoantypeChargesComponent>,
    public dialog: MatDialog,
    public service :LoanApplicationService,private router:Router,private toastr: ToastrService,
    private _snackBar: MatSnackBar) { 
      this.spinnerContent='';
      this.IsSuccess = false;
      this.isDisconnected=false;
      this.ErrorDescription ='';
      this.LoanTypeId = window.localStorage.getItem('LoanTypeId-V');

    }

  ngOnInit(): void {
    this.service.getAllLoanChargesList().subscribe(Response => {
      this.ChargeNameList = Response;
    },(error)=>{
      this.isDisconnected=true;
    });

    this.service.getAllLoanTypes().subscribe(Response => {
      this.LoanTypesList = Response;
    },(error)=>{
      this.isDisconnected=true;
    });
   
    if(this.LoanTypeId != 0 || this.LoanTypeId != 'null'){
      this.getData();
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }


  getData(){
    this.temp =false;
    this.spinnerContent='Loading Loan Type Charges List....';
    //this.spinner.show();
    this.service.GetAllLoanTypeChargesByLoanTypeId(parseInt(this.LoanTypeId)).subscribe(Response => {
      //this.spinner.hide();
      this.LoanTypeChargesList = Response;
      this.temp = true;
    },(error)=>{
     // this.spinner.hide();
      this.isDisconnected=true;
    });
  }

  onUpdate(LoanChargesListTariffId:any){
    localStorage.setItem('LoanTypeChargesId-A', LoanChargesListTariffId);
    localStorage.setItem("ChargesCallingForm", "EditingFromLoanTypes");
    debugger;
    const dialogRef = this.dialog.open(AddLoantypeChargesComponent, {
    });
     dialogRef.afterClosed().subscribe(result => {
      this.getData();
      localStorage.setItem('LoanTypeChargesId-A', '0');
    });
  }


  onDelete(LoanTypeChargesId:any){
    if(confirm('Are you sure yu want to delete this record?')){
      this.service.DeleteLoanTypeCharges(LoanTypeChargesId).subscribe(res=>{
        this.getData();
        this.successmsg();
        });
    }
  }

  CreateLoanTypeCharge(){
    localStorage.setItem('LoanTypeId-A', this.LoanTypeId);
    const dialogRef = this.dialog.open(AddLoantypeChargesComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.temp =false;
     this.getData();
    });
 
  }

  onExit(){
    localStorage.setItem('LoanTypeChargesId-A', '0');
    this.dialogRef.close();
  }

  onView(){

  }

  Reload(){
    window.location.reload();
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
