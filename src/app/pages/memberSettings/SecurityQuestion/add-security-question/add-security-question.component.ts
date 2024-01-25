import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-security-question',
  templateUrl: './add-security-question.component.html',
  styleUrls: ['./add-security-question.component.scss']
})
export class AddSecurityQuestionComponent implements OnInit {
 errGenderName="";
  GenderId:any;
  GenderName:any="";
  Delete:any=false;
  isValid:boolean=true;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  isDisconnected: boolean = false; 
  show:any=true;
  hide:any=false;
  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,
   private toastr: ToastrService,private router:Router) { 
    this.isSuccess=false;
    this.errDescription=''
  }

  ngOnInit() {
    let GenderId=this.currentRoute.snapshot.paramMap.get('id');
    if(GenderId==null)
    this.resetForm();
    else{
      this.service.getGender(parseInt(GenderId)).subscribe(Response =>{
        this.GenderId=Response.gender.id;
        this.GenderName=Response.gender.GenderName;      
      });

    }
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
 Reload(){
  window.location.reload();
}
  onSubmit(GenderName){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }
      this.show=false;
      this.hide=true;
      this.loading=true;
      let GenderId=this.currentRoute.snapshot.paramMap.get('id');
      if(GenderId==null)
    this.service.AddGender(GenderName,this.Delete=false).subscribe( Response =>{
      this.loanAppResp = Response;
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
       
       confirm(this.errDescription);
        this.loading=false;
        this.show=true;
        this.hide=false;
        return;
       }
     if (this.isSuccess==true){
      this.successmsg();
      this.resetForm();
      this.loading=false;
      this.show=true;
      this.hide=false;
     
     }
    
    
    },(error)=>{
      this.isDisconnected=true;
      this.loading=false})
    else{
      this.service.UpdateGender(GenderId,GenderName,this.Delete=false).subscribe( Response =>{
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
        this.show=true;
        this.hide=false;
       this.router.navigate(['/view-security-question']); 
       }
       
      
      },(error)=>{
        this.isDisconnected=true;
        this.loading=false})
    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.GenderName	=''
   }
   formValidation(){
    this.isValid=true;
   
    if(this.GenderName=='')
   
    this.isValid=false;
    return this.isValid;
   }

}

