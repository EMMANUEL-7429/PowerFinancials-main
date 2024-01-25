import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import Swal from 'sweetalert2';

import { AddLoanChargesListTariffComponent } from '../add-loan-charges-list-tariff/add-loan-charges-list-tariff.component';

@Component({
  selector: 'app-view-loan-charges-list-tariff',
  templateUrl: './view-loan-charges-list-tariff.component.html',
  styleUrls: ['./view-loan-charges-list-tariff.component.scss']
})
export class ViewLoanChargesListTariffComponent implements OnInit {

  public LoanChargeTariffList: Object;//change to Object if using data tables
  public temp: Object=false;
  spinnerContent:any;
  isDisconnected: boolean = false;
  LoanChargesListId:any=0;
  isNodeLoading: boolean = false;
  public LoanChargesList:[];
  public LoanChargeTariffToInterval:any;
  MaxFromInterval:any=0;

  IsSuccess: any;
  ErrorDescription:any;
  Resp: any;

  

  constructor(public dialogRef: MatDialogRef<ViewLoanChargesListTariffComponent>,
    public dialog: MatDialog,
    public service :LoanApplicationService,private router:Router,private toastr: ToastrService,
    private _snackBar: MatSnackBar) { 
      this.spinnerContent='';
      this.IsSuccess = false;
      this.isDisconnected=false;
      this.ErrorDescription ='';
      this.LoanChargesListId = window.localStorage.getItem('LoanChargesListId-V');

      this.service.getAllLoanChargesList().subscribe(res=>{
        this.LoanChargesList=res as [];
      });

    }

  ngOnInit(): void {
    console.log('TarrifviewComp'+this.LoanChargesListId)
    if(this.LoanChargesListId != 0 || this.LoanChargesListId != 'null'){
      this.getData();
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }

  getData(){
    this.temp = false;
    this.spinnerContent='Loading Loan Charges Tariffs....';
    //this.spinner.show();
    this.service.getAllLoanChargeListTariffByLoanChargesListId(this.LoanChargesListId).subscribe(Response => {
      //this.spinner.hide();
      this.LoanChargeTariffList = Response;
      this.LoanChargeTariffToInterval = Response;
      this.temp = true;
      this.getToInterval();
    },(error)=>{
      //this.spinner.hide();
      this.isDisconnected=true;
    });
  }

  onUpdate(LoanChargesListTariffId:any){
    localStorage.setItem('LoanChargesListTariffId-A', LoanChargesListTariffId);
    const dialogRef = this.dialog.open(AddLoanChargesListTariffComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      localStorage.setItem('LoanChargesListTariffId-A', '0');
    });
  }

  CreateTariff(){
    localStorage.setItem('LoanChargesListId-A', this.LoanChargesListId);
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.data={FromInterval:this.MaxFromInterval};
    this.dialog.open(AddLoanChargesListTariffComponent,dialogConfig).afterClosed().subscribe(Response =>{
      this.temp =false;
      this.getData();
    }) ;
 
  }

  onExit(){
    localStorage.setItem('LoanChargesListTariffId-A', '0');
    this.dialogRef.close();
  }


  onDelete(LoanChargesListTariffId:any){
    if(confirm('Are you sure yu want to delete this record?')){
      this.service.DeleteLoanChargeListTariff(LoanChargesListTariffId).subscribe(res=>{
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

  getLoanChargeName(id: any) : string {
    var name: string;
    if(this.LoanChargesList){
    if(id>0){
    this.LoanChargesList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["LoanChargesListId"]==id){
        name=obj["Name"];
        return true;
      }
    })}}
    return name;
  }

  getToInterval(){
    var swap: any =0;
    var max: any =0;
    if(this.LoanChargeTariffToInterval){
    this.LoanChargeTariffToInterval.some((obj)=>{

      if(obj["ToInterval"] > swap){
        max=obj["ToInterval"];
        return false;
      }
      swap=max;
    })}
    console.log('MaxValue'+max);
    this.MaxFromInterval = max;
    //return max;
  }

}
