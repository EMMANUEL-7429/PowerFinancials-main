import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.scss']
})
export class AddStructureComponent implements OnInit {
  StructureId:any=0;
  Caption:any="";
  Description:any="";
  ParentId:any=0;
  Remarks:any="";
  Delete:any=false;
  MyDescription:any="Parent";
  IsAddStruct:any;
  isValid:boolean=true;
  Show:boolean=false;
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
    
    this.IsAddStruct = localStorage.getItem('AddStructure');

    if(this.IsAddStruct == 'true'){
     this.Show=true;
      this.ParentId = parseInt(localStorage.getItem('StructId'));
      this.MyDescription=localStorage.getItem('StructName');

    }else{
    let StructureId=this.currentRoute.snapshot.paramMap.get('id');
    if(StructureId==null)
    this.resetForm();
    else{
      this.service.GetStructure(parseInt(StructureId)).subscribe(Response =>{
      this.StructureId=Response.structure.StructureId;
      this.Description=Response.structure.Description;  
      this.Caption=Response.structure.Caption;   
      this.ParentId=Response.structure.ParentId;  
      this.Remarks=Response.structure.Remarks;      
      });
    }
  }
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
 Reload(){
  window.location.reload();
}
  onSubmit(Caption,Description,ParentId,Remarks){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }    
      this.loading=true;
      let StructureId=this.currentRoute.snapshot.paramMap.get('id');
      if(StructureId==null)
    this.service.AddStructure(Caption,Description,ParentId,Remarks,"Admin",this.Delete=false).subscribe(Response =>{
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
      this.loading=false;
      this.resetForm()
      this.router.navigate(['/view-structure']);
      localStorage.setItem('AddStructure', 'false');
      
     }
    } ,(error)=>{
      this.isDisconnected=true;
      this.loading=false})
    else{
      this.service.UpdateStructure(StructureId,Caption,Description,ParentId,Remarks,"Admin",this.Delete=false).subscribe(Response =>{
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
        this.loading=false;
        this.resetForm()
        localStorage.setItem('AddStructure', 'false');
        this.router.navigate(['/structure-list']);
    
       }
   
      }  ,(error)=>{
        this.isDisconnected=true;
        this.loading=false})

    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.Caption	=''
    this.Description=''
    this.ParentId=0
    this.Remarks=""
   }
   formValidation(){
    this.isValid=true;
    if(this.Description=='')
    this.isValid=false;
    return this.isValid;
   }
  
}