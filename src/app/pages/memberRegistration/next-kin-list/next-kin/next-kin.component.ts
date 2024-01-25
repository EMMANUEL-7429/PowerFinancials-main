import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-next-kin',
  templateUrl: './next-kin.component.html',
  styleUrls: ['./next-kin.component.css']
})
export class NextKinComponent implements OnInit {
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
  public loading: boolean = false;
  isDisconnected: boolean = false; 

  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,
    private _snackBar: MatSnackBar,private toastr: ToastrService,private router:Router) { 
      this.isSuccess=false;
      this.errDescription=''
    }
  ngOnInit(): void {
    let KinId=this.currentRoute.snapshot.paramMap.get('id');
    if(KinId==null)
    this.resetForm();
    else{   
      this.service.GetKin(parseInt(KinId)).subscribe(Response =>{
        this.KinId=Response.kin.id;
        this.MemberId=Response.kin.MemberId;
        this.RelationId=Response.kin.RelationId;
        this.FullName=Response.kin.FullName;
        this.Address=Response.kin.Address;
        this.PhoneNumber=Response.kin.PhoneNumber;
        this.Town=Response.kin.Town;
        this.IdNo=Response.kin.IdNo;
        this.Remarks=Response.kin.Remarks;
        this.DOB=Response.kin.DOB;
         })
    }

    this.refreshList();
  }
   passIdToInsert(){
    //let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/next-kin-list/get/'+this.MemberId]); 
  }
  refreshList(){
    this.service.GetAllRelations().subscribe((Response)=>{
      this.RelationList=Response;
    })
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }

  Reload(){
    window.location.reload();
  }
  onSubmit(MemberId,RelationId,FullName,Address,PhoneNumber,Town,DOB,IdNo,Remarks){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }
      this.loading=true;
      let KinId=this.currentRoute.snapshot.paramMap.get('id');
      this.service.UpdateKin(KinId,MemberId,RelationId,FullName,Address,PhoneNumber,Town,DOB,IdNo,Remarks,this.Delete=false).subscribe(Response =>{
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
       // this.toastr.info('Process Succeeded','Power Financial System');
        this.resetForm()
        this.loading=false;
         // this.MemberId = parseInt(localStorage.getItem('StructId1'));
       this.router.navigate(['/next-kin-list/get/'+this.MemberId])
       
       }
      } ,(error)=>{
        this.isDisconnected=true;
        this.loading=false})

    }

  }
  viewList(){
    this.router.navigate(['/next-kin-list/get/'+this.MemberId]) 
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
   
   
}
