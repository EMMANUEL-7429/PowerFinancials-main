import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-paymode',
  templateUrl: './add-paymode.component.html',
  styleUrls: ['./add-paymode.component.scss']
})
export class AddPaymodeComponent implements OnInit {

  PaymodeName:any="";
  Description:any=""
  AllowBackDated:any=false;
  Transtype =0;
  CanDisburseLoan: boolean=true;
  Delete:any=false;
  MaxDaysofBackDated: 0;

  PaymentModeId:any;
  isValid:boolean=true;
  myResp:any;
  loanAppResp:any;

  isSuccess:any;
  errDescription:any;
  IsDefault: any;

  public loading: boolean = false;
  isDisconnected: boolean = false; 

  constructor(private service:AccountTransactionService,private currentRoute:ActivatedRoute,
    private toastr: ToastrService,private router:Router) {
      this.isSuccess=false;
      this.errDescription=''
     }

  ngOnInit(): void {
    let PaymentModeId=this.currentRoute.snapshot.paramMap.get('id');
   
    if(PaymentModeId==null)
    this.resetForm();
    else{
      this.service.GetPaymentMode(parseInt(PaymentModeId)).subscribe(Response =>{
        this.myResp=Response;
        this.PaymentModeId=this.myResp.PaymentMode.PaymentModeId;
        this.PaymodeName=this.myResp.PaymentMode.Name;
        this.Description=this.myResp.PaymentMode.Description;
        this.IsDefault=this.myResp.PaymentMode.IsDefault;   
        this.AllowBackDated=this.myResp.PaymentMode.AllowBackDated;
        this.CanDisburseLoan=this.myResp.PaymentMode.CanDisburseLoan;
        this.MaxDaysofBackDated=this.myResp.PaymentMode.MaxDaysofBackDated;
        this.Transtype=this.myResp.PaymentMode.Transtype;
         
      })
    }
  }
  onSubmit( AllowBackDated : any ,Transtype : any,CanDisburseLoan: any){
    
    if(this.formValidation()){
      this.loading=true;
    let modeId=this.currentRoute.snapshot.paramMap.get('id');
    if(modeId==null)
    {
      debugger;
    this.service.AddPaymentMode(0,this.PaymodeName,this.Description,Transtype,AllowBackDated,this.MaxDaysofBackDated,
      this.CanDisburseLoan,this.IsDefault,"Admin",false).subscribe(Response =>{
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
    }
    else{
      this.service.AddPaymentMode(this.PaymentModeId,this.PaymodeName,this.Description,Transtype,AllowBackDated,this.MaxDaysofBackDated,this.CanDisburseLoan,this.IsDefault,"Admin",false).subscribe(Response =>{
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
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  onInput(){
    this.Description=this.PaymodeName;    
  }
  formValidation(){
    this.isValid=true;
    if(this.PaymodeName=="")
    this.isValid=false;
    if(this.Description=="")
    this.isValid=false;

    if(this.Transtype==0)this.isValid=false;
    return this.isValid;
   }
   resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.Description	='';
    this.PaymodeName	='';
    this.Transtype=0;
    this.CanDisburseLoan=false;
    this.AllowBackDated=false;
    this.IsDefault	=false;
    this.MaxDaysofBackDated=0;
    this.Transtype=0;
   }
}
