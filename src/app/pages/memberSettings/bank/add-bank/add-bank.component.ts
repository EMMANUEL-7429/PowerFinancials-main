import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService} from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  BankName:any;
  Delete:any=false;
  BankId:any;
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
    let BankId=this.currentRoute.snapshot.paramMap.get('id');
    if(BankId==null)
    this.resetForm();
    else{
      this.service.getBank(parseInt(BankId)).subscribe(Response =>{
        this.BankId=Response.bank.id;
        this.BankName=Response.bank.BankName;      
      });


  }}
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.BankName=='')
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(BankName,CreatedBy=""){
     if(this.formValidation()){
       this.loading=true;
    let BankId=this.currentRoute.snapshot.paramMap.get('id');
    if(BankId==null)
    this.service.AddBank(BankName, CreatedBy,this.Delete=false).subscribe(Response =>{
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
      this.service.UpdateBank(BankId,BankName,CreatedBy,this.Delete=false).subscribe(Response =>{
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
    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.BankName	=''
   }
}
