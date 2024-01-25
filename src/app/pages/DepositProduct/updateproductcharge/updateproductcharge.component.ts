import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-updateproductcharge',
  templateUrl: './updateproductcharge.component.html',
  styleUrls: ['./updateproductcharge.component.scss']
})
export class UpdateproductchargeComponent implements OnInit {
  ProductChargeId:any;
  ProductId:any=0;
  ChargeId:any=0;
  ChargeType:any=0;
  Productlist:any;
  chargelist:any;
  Delete:any=false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  isValid:boolean=true;
  isDisconnected: boolean = false;
  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,
 private toastr: ToastrService,
  private router:Router,) {
    this.isSuccess=false;
    this.errDescription='';
   }

  ngOnInit(): void {
    let ProductChargeId=this.currentRoute.snapshot.paramMap.get('id');
    if(ProductChargeId==null)
    this.resetForm()
    else{
      this.service.GetProductCharge(parseInt(ProductChargeId)).subscribe(Response =>{
        this.ProductChargeId=Response.Product.id;
        this.ProductId=Response.Product.ProductId;
        this.ChargeId=Response.Product.ChargeId;
        this.ChargeType=Response.Product.ChargeType;
      })

    }
   
    this.refreshList();
    this.refreshChargeList();
  }
  refreshList(){ 
    this.service.GetAllProduct().subscribe((Response)=>{
      this.Productlist=Response;
    })
  }
  refreshChargeList(){ 
    this.service.GetChargeById().subscribe((Response)=>{
      this.chargelist=Response;
    })
  }
   
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }  
  formValidation(){
    this.isValid=true;
    if(this.ProductId==0)
    this.isValid=false;
    if(this.ChargeId==0)
    this.isValid=false;
    if(this.ChargeType=='')
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(ProductId,ChargeId,ChargeType){
    if(this.formValidation()){
      this.loading=true;
    let ProductChargeId=this.currentRoute.snapshot.paramMap.get('id');
    this.service.UpdateProductCharge(ProductChargeId,ProductId,ChargeId,ChargeType,this.Delete).subscribe(Response =>{
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
      this.router.navigate(['/view-products']);
      
     }
    })

  }
}
  
resetForm(form?:NgForm){
  if(form!=null)
  form.resetForm()
  this.ChargeId =0;
  this.ChargeType=0
}

}
