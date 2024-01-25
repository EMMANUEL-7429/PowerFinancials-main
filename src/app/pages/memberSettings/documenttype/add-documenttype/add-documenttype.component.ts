import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService} from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-documenttype',
  templateUrl: './add-documenttype.component.html',
  styleUrls: ['./add-documenttype.component.scss']
})
export class AddDocumenttypeComponent implements OnInit {
  DocumentTypeName:any;
  Delete:any=false;
  DocumentTypeId:any;
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
    let DocumentTypeId=this.currentRoute.snapshot.paramMap.get('id');
    if(DocumentTypeId==null)
    this.resetForm();
    else{
      this.service.getDocumentType(parseInt(DocumentTypeId)).subscribe(Response=>{
      this.DocumentTypeId=Response.documenttype.id;
      this.DocumentTypeName=Response.documenttype.DocumentTypeName;
      })
  }}
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  Reload(){
    window.location.reload();
  }
  formValidation(){
    this.isValid=true;
    if(this.DocumentTypeName=='')
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(DocumentTypeName){
     if(this.formValidation()){
       this.loading=true;
    let DocumentTypeId=this.currentRoute.snapshot.paramMap.get('id');
    if(DocumentTypeId==null)
    this.service.AddDocumentType(DocumentTypeName,this.Delete=false).subscribe(Response =>{
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
      this.service.UpdateDocumentType(DocumentTypeId,DocumentTypeName,this.Delete=false).subscribe(Response =>{
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
    }
  }
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.DocumentTypeName	=''
   }
}
