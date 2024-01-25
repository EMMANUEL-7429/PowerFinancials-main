import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {
  CurrencyName:any="";
  CurrencySymbol:any=""
  IsMainCurrency:any=false;
  Delete:any=false;
  CurrencyId:any;
  isValid:boolean=true;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  isDisconnected: boolean = false; 
  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,
    private toastr: ToastrService,private router:Router) { 
    this.isSuccess=false;
    this.errDescription=''
  }

  ngOnInit(): void {
    let CurrencyId=this.currentRoute.snapshot.paramMap.get('id');
    if(CurrencyId==null)
    this.resetForm();
    else{
      this.service.getCurrency(parseInt(CurrencyId)).subscribe(Response =>{
        this.CurrencyId=Response.currency.id;
        this.CurrencyName=Response.currency.CurrencyName;
        this.CurrencySymbol=Response.currency.CurrencySymbol;
        this.IsMainCurrency=Response.currency.IsMainCurrency;       
      })
    }
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.CurrencyName=="")
    this.isValid=false;
    if(this.CurrencySymbol=="")
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(CurrencyName,CurrencySymbol,IsMainCurrency){
    if(this.formValidation()){
      this.loading=true;
    let CurrencyId=this.currentRoute.snapshot.paramMap.get('id');
    if(CurrencyId==null)
    this.service.AddCurrency(CurrencyName,CurrencySymbol,IsMainCurrency,this.Delete=false).subscribe(Response =>{
      this.loanAppResp = Response;
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        this.toastr.warning(this.errDescription);
        this.loading=false;
        return;
       }
     if (this.isSuccess==true){
      this.successmsg();
      this.resetForm();
      this.loading=false;
      
     }
    })
    else{
      this.service.UpdateCurrency(CurrencyId,CurrencyName,CurrencySymbol,IsMainCurrency,this.Delete=false).subscribe(Response =>{
        this.loanAppResp = Response;
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
      confirm(this.errDescription);
        this.loading=false;
        return;
       }
     if (this.isSuccess==true){
      this.successmsg();
      this.resetForm();
      this.loading=false;
      
     }
      }) 
    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.CurrencyName	='';
    this.CurrencySymbol	='';
    this.IsMainCurrency	=false;
   }

}
