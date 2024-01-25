import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-beneficiary',
  templateUrl: './create-beneficiary.component.html',
  styleUrls: ['./create-beneficiary.component.css']
})
export class CreateBeneficiaryComponent implements OnInit {
  BeneficiaryId:any=0;
  MemberId:any;
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
  MemberNo:any;
  Name:any;
  Id:any;
  isDisconnected: boolean = false; 
  constructor(private currentRoute:ActivatedRoute,
    public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,) { }

    ngOnInit(): void {
      let MemberId=this.currentRoute.snapshot.paramMap.get('id'); 
      if(MemberId==null)
      this.ClearData();
      else{
        this.service.getMember(parseInt(MemberId)).subscribe(Response =>{
          console.log(MemberId)  
          this.MemberId=MemberId;
          this.MemberNo=Response.member.MemberNo;
          this.Name=Response.member.FullName;
          this.Id=Response.member.IdNo;
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
    onSubmit(RelationshipId,FullName,IdNo,DOB,PhoneNumber,Town,Value,Code,Remarks){
   if(this.formValidation()){
    if(this.isDisconnected==false){
    }
     this.loading=true;
        let MemberId=this.currentRoute.snapshot.paramMap.get('id');
          //Add Contact
             
          this.service.AddBeneficiary(MemberId,RelationshipId,FullName,IdNo,DOB,PhoneNumber,Town,Value,Code,Remarks,this.Delete).subscribe(Response =>{
            
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
           }
        
          }  ,(error)=>{
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
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/beneficiary-list/get/'+ MemberId]);
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
