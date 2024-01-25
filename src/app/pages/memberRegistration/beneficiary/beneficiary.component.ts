import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
  BeneficiaryId:any=0;
  MemberId:any=0;
  RelationshipId:any=0;
  FullName:any="";
  IdNo:any="";
  DOB:any= new Date;
  PhoneNumber:any="";
  Town:any="";
  Value:any=0;
  Code:any="";
  Remarks:any="";
  Delete:boolean=false;
  RelationList:any;
  isValid:boolean=true;
  public loading: boolean = false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isDisconnected: boolean = false; 
  constructor(
    private currentRoute:ActivatedRoute,
    public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
  ) {
    this.isSuccess=false;
      this.errDescription=''
   }

  ngOnInit(): void {
  
    
    let BeneficiaryId=this.currentRoute.snapshot.paramMap.get('id');
    if(BeneficiaryId==null)
    this.ClearData();
    else{
        this.service.GetBeneficiary(parseInt(BeneficiaryId)).subscribe(Response =>{
        this.BeneficiaryId=Response.beneficiary.BeneficiaryId;
        this.MemberId=Response.beneficiary.MemberId;
        this.RelationshipId=Response.beneficiary.RelationshipId;
        this.FullName=Response.beneficiary.FullName;
        this.IdNo=Response.beneficiary.IdNo;
        this.DOB=Response.beneficiary.DOB;
        this.PhoneNumber=Response.beneficiary.PhoneNumber;
        this.Town=Response.beneficiary.Town;
        this.Value=Response.beneficiary.Value;
        this.Code=Response.beneficiary.Code;
        this.Remarks=Response.beneficiary.Remarks;
  
    
    })
    }
    this.refreshList();
  }
  Reload(){
    window.location.reload();
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }

  //Save data
  onSubmit(MemberId,RelationshipId,FullName,IdNo,DOB,PhoneNumber,Town,Value,Code,Remarks){
 if(this.formValidation()){
  if(this.isDisconnected==false){
  }
   this.loading=true;
      let BeneficiaryId=this.currentRoute.snapshot.paramMap.get('id');
        this.service.UpdateBeneficiary(BeneficiaryId,MemberId,RelationshipId,FullName,IdNo,DOB,PhoneNumber,Town,Value,Code,Remarks,this.Delete).subscribe(Response =>{ 
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
          //this.toastr.info('Process Succeeded','Power Financial System');
          this.ClearData()
          this.loading=false;
          this.router.navigate(['/beneficiary-list/get/'+ this.MemberId]);
         }
       
         } ,(error)=>{
          this.isDisconnected=true;
          this.loading=false})

        
      }

 }

 ClearData(){
 
  this.RelationshipId=0;
  this.FullName="";
  this.IdNo="";
  this.DOB = new Date;
  this.PhoneNumber ="";
  this.Town ="";
  this.Value =0;
  this.Code ="";
  this.Remarks ="";
 }

 listBeneficiaries(){
  this.router.navigate(['/beneficiary-list/get/'+ this.MemberId]);
 }
 refreshList(){
  this.service.GetAllRelations().subscribe((Response)=>{
    this.RelationList=Response;
  })
}

formValidation(){
  this.isValid=true;
  if(this.FullName=="")
  this.isValid=false;
  if(this.IdNo=="")
  this.isValid=false;
  if(this.Town=="")
  this.isValid=false;
  if(this.PhoneNumber=="")
  this.isValid=false;
  if(this.RelationshipId==0)
  this.isValid=false;
  if(this.Value==0)
  this.isValid=false;
  return this.isValid;
 }
}
