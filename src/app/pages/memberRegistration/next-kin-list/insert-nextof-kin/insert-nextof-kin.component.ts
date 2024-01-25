import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-nextof-kin',
  templateUrl: './insert-nextof-kin.component.html',
  styleUrls: ['./insert-nextof-kin.component.css']
})
export class InsertNextofKinComponent implements OnInit {
  KinId:any=0;
  MemberId:any=0;
  RelationId:any=0;
  FullName:any="";
  Address:any="";
  PhoneNumber:any="";
  Town:any="";
  DOB:any=new Date;
  IdNo:any="";
  Remarks:any="";
  isValid:boolean=true;
  RelationList:any;
  Delete:any=false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  MemberNo:any;
  Name:any;
  Id:any;
  public loading: boolean = false;
  isDisconnected: boolean = false; 
  constructor(private currentRoute:ActivatedRoute,private service :PowerFinancialService,
    private _snackBar: MatSnackBar,private toastr: ToastrService,private router:Router) { 
    this.isSuccess=false;
    this.errDescription=''
  }

  ngOnInit(): void {
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
   this.MemberId=MemberId;
   if(MemberId==null)
    this.resetForm()
    else{
      this.service.getMember(parseInt(MemberId)).subscribe(Response =>{
        this.MemberId=MemberId;
        this.MemberNo=Response.member.MemberNo;
        this.Name=Response.member.FullName;
        this.Id=Response.member.IdNo;
      })
    }
    
    this.refreshList();
    
  }
  refreshList(){
    this.service.GetAllRelations().subscribe((Response)=>{
      this.RelationList=Response;
    })
  }

  Reload(){
    window.location.reload();
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  onSubmit(MemberId,RelationId,FullName,Address,PhoneNumber,Town,DOB,IdNo,Remarks){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }
      this.loading=true
      this.service.AddKin(MemberId,RelationId,FullName,Address,PhoneNumber,Town,DOB,IdNo,Remarks,this.Delete=false).subscribe(Response =>{
        this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp['isSuccess'];
        this.errDescription = this.loanAppResp['errorDescription'];
        if (this.isSuccess==false && this.errDescription!=''){
          confirm(this.errDescription)
          //this.openSnackBar(this.errDescription);
          this.loading=false;
          return;
         }
       if (this.isSuccess==true){
         this.successmsg();
        //this.toastr.success('Process Succeeded','Power Financial System');
        this.resetForm()
        this.loading=false;
       }
      }  ,(error)=>{
        this.isDisconnected=true;
        this.loading=false})
      
    }

  }
  ViewKin(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/next-kin-list/get/'+MemberId]);

  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm()
    this.RelationId	=0;
    this.FullName="";
    this.Address="";
    this.PhoneNumber="";
    this.Town="";
    this.DOB=new Date;
    this.IdNo="";
    this.Remarks="";
   }
   formValidation(){
    this.isValid=true;
    if(this.RelationId==0)
    this.isValid=false;
    if(this.FullName=="")
    this.isValid=false;
    if(this.Address=="")
    this.isValid=false;
    if(this.PhoneNumber=="")
    this.isValid=false;
    if(this.Town=="")
    this.isValid=false;
    if(this.IdNo=="")
    this.isValid=false;
    return this.isValid;
   }
   passIdToInsert(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/next-kin-list/get/'+MemberId]); 
  }
}
