import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-exchange-rate',
  templateUrl: './add-exchange-rate.component.html',
  styleUrls: ['./add-exchange-rate.component.scss']
})
export class AddExchangeRateComponent implements OnInit {
  BuyRate:any=0;
  SellRate:any=0;
  CurrencyId:any=0;
  CurrencyList:any;
  Delete:any=false;
  ExchangeRateId:any;
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
    let ExchangeRateId=this.currentRoute.snapshot.paramMap.get('id');
    if(ExchangeRateId==null)
    this.resetForm();
    else{
      this.service.getExchangeRate(parseInt(ExchangeRateId)).subscribe(Response =>{
        this.ExchangeRateId=Response.exchangeRate.id;
        this.BuyRate=Response.exchangeRate.BuyRate;
        this.SellRate=Response.exchangeRate.SellRate;
        this.CurrencyId=Response.exchangeRate.CurrencyId;       
      })
    }
    
    this.refreshList();
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.BuyRate==0)
    this.isValid=false;
    if(this.SellRate==0)
    this.isValid=false;
    if(this.CurrencyId==0)
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(BuyRate,SellRate,CurrencyId){
    if(this.formValidation()){
      this.loading=true;
    let ExchangeRateId=this.currentRoute.snapshot.paramMap.get('id');
    if(ExchangeRateId==null)
    this.service.AddCurrencyRate(BuyRate,SellRate,CurrencyId,this.Delete=false).subscribe(Response =>{
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

    },
    (error)=>{
      this.isDisconnected=true;
      this.loading=false})
    else{
      this.service.UpdateCurrencyRate(ExchangeRateId,BuyRate,SellRate,CurrencyId,this.Delete=false).subscribe(Response =>{
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
      this.router.navigate(['/view-exchange-rate']); 
     }

      }),
      (error)=>{
        this.isDisconnected=true;
        this.loading=false}
    }
   }
  }
  refreshList(){
    this.service.getAllCurrency().subscribe((Response)=>{
      this.CurrencyList=Response;
      });
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.CurrencyId	=0;
    this.SellRate	=0;
    this.BuyRate	=0;
   }

}
