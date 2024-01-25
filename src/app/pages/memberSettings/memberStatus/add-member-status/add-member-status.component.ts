import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-member-status',
  templateUrl: './add-member-status.component.html',
  styleUrls: ['./add-member-status.component.scss']
})
export class AddMemberStatusComponent implements OnInit {
  MemberStatusName:any="";
  MemberStatusId:any=0;
  Delete:any=false
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  isValid:boolean=true;
  isDisconnected: boolean = false; 
  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,private router:Router,
    private toastr: ToastrService,) { 
    this.isSuccess=false;
    this.errDescription=''
    }

  ngOnInit(): void {
    let MemberStatusId=this.currentRoute.snapshot.paramMap.get('id');
    if(MemberStatusId==null)
    this.resetForm();
    else{
      this.service.getMemberStatus(parseInt(MemberStatusId)).subscribe(Response =>{
        this.MemberStatusId=Response.memberstatus.id;
        this.MemberStatusName=Response.memberstatus.MemberStatusName;
         })
    }
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  formValidation(){
    this.isValid=true;
    if(this.MemberStatusName=='')
    this.isValid=false;
    return this.isValid;
   }
   Reload(){
    window.location.reload();
  }
  onSubmit(MemberStatusName){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }
      
      this.loading=true;
    let MemberStatusId=this.currentRoute.snapshot.paramMap.get('id');
    if(MemberStatusId==null)
    this.service.AddMemberstatus(MemberStatusName,this.Delete=false).subscribe( Response =>{
      this.loanAppResp = Response;
    this.isSuccess = this.loanAppResp['isSuccess'];
    this.errDescription = this.loanAppResp['errorDescription'];
    if (this.isSuccess==false && this.errDescription!=''){
      confirm(this.errDescription)
      
      this.loading=false;
      return;
     }
   if (this.isSuccess==true){
    this.successmsg();
    this.resetForm()
    this.loading=false;
    
   }
    } ,(error)=>{
      this.isDisconnected=true;
      this.loading=false})
    else{
      console.log(MemberStatusId+MemberStatusName)
      this.service.UpdateMemberstatus(MemberStatusId,MemberStatusName,this.Delete=false).subscribe( Response =>{ 
        this.loanAppResp = Response;
    this.isSuccess = this.loanAppResp['isSuccess'];
    this.errDescription = this.loanAppResp['errorDescription'];
    if (this.isSuccess==false && this.errDescription!=''){
      confirm(this.errDescription)
    
      this.loading=false;
      return;
     }
   if (this.isSuccess==true){
    this.successmsg();
    this.resetForm()
    this.loading=false;
    this.router.navigate(['/view-member-status']); 
   }
      } ,(error)=>{
        this.isDisconnected=true;
        this.loading=false})

    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.MemberStatusName	=''
   }

}
