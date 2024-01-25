import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product-charge',
  templateUrl: './add-product-charge.component.html',
  styleUrls: ['./add-product-charge.component.scss']
})
export class AddProductChargeComponent implements OnInit {
  ProductId:any;
  ChargeId:any=0;
  ChargeType:any=0;
  Productlist:any;
  chargelist:any;
  Delete:any=false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isDisconnected: boolean = false;
  public loading: boolean = false;
  isValid:boolean=true;
  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<AddProductChargeComponent>, private service:PowerFinancialService,
  private toastr: ToastrService,private currentRoute:ActivatedRoute,
  private router:Router,) { 
       this.isSuccess=false;
      this.errDescription='';
  }

  ngOnInit(): void {
   this.ProductId=this.data.ProductId  
   console.log(this.data.ProductId) 
    this.refreshList();
    this.refreshChargeList();
    this.resetForm();
  }
  refreshList(){ 
    this.service.GetAllProduct().subscribe((Response)=>{
      this.Productlist=Response;
    })
  }
  
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  refreshChargeList(){ 
    this.service.GetChargeById().subscribe((Response)=>{
      this.chargelist=Response;
    })
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.ChargeId==0)
    this.isValid=false;
    if(this.ChargeType=='')
    this.isValid=false;
    return this.isValid;
    
   }
  onSubmit(ChargeId,ChargeType){
    if(this.formValidation()){ 
      this.loading=true;   
    this.service.AddProductCharge(this.data.ProductId,ChargeId,ChargeType,this.Delete).subscribe(Response =>{
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
      this.resetForm()
      this.loading=false;
      
     }
    })
  }

  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.ProductId=0;
    this.ChargeId =0;
    this.ChargeType=0
    
   }
   

}
