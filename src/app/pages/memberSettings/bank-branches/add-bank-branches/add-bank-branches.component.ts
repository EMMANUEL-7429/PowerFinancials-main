import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-bank-branches',
  templateUrl: './add-bank-branches.component.html',
  styleUrls: ['./add-bank-branches.component.scss']
})
export class AddBankBranchesComponent implements OnInit {
  BranchId:any=0;
  BranchName:any="";
  BankName:any="";   
  AccountNumber:any="";
  BankId:any=0;
  BankList:any;
  CurrencyId:any=0;
  CurrencyList: any;
  Delete:any=false
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
    let BranchId=this.currentRoute.snapshot.paramMap.get('id');
    if(BranchId==null)
    this.resetForm();
    else{
      this.service.getBranch(parseInt(BranchId)).subscribe(Response =>{
        this.BranchId=Response.banch.id;
        this.BankId=Response.banch.BankId;
        this.CurrencyId=Response.banch.CurrencyId;
        this.BranchName=Response.banch.BranchName;
        this.AccountNumber=Response.banch.AccountNumber;    
      })
    }
    this.refreshList();
    this.refreshCurrencyList();
  }  
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.BankId==0)
    this.isValid=false;    
    if(this.BranchName=="")
    this.isValid=false;
    if(this.AccountNumber=="")
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(BranchName,AccountNumber,BankId,CreatedBy="",GLId=""){
    if(this.formValidation()){
      this.loading=true;
    let BranchId=this.currentRoute.snapshot.paramMap.get('id');
    if(BranchId==null)
    this.service.AddBankBranches(BranchName,AccountNumber,BankId, CreatedBy,GLId,this.Delete=false).subscribe(Response =>{
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
    
    },
    (error)=>{
      this.isDisconnected=true;
      this.loading=false})
    else{
      this.service.UpdateBankBranches(BranchId,BranchName,AccountNumber,BankId,CreatedBy,GLId,this.Delete=false).subscribe(Response =>{
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
        }),
        (error)=>{
          this.isDisconnected=true;
          this.loading=false}
    }
  }
  }
  refreshList(){ 
    this.service.getAllBank().subscribe((Response)=>{
      this.BankList=Response;
    });
  }
  refreshCurrencyList(){ 
    this.service.getAllCurrency().subscribe((Response)=>{
      this.CurrencyList=Response;
    });
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.BranchName	=''
    this.AccountNumber=''
    this.BankId=0
    this.CurrencyId=0
   }

}
