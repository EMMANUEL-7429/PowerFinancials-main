import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parent-structure-value',
  templateUrl: './parent-structure-value.component.html',
  styleUrls: ['./parent-structure-value.component.scss']
})
export class ParentStructureValueComponent implements OnInit {

  StructureValueId: any=0;
  StructureId: any=0;
  Name: any="";
  ParentId: any=0;
  IsGroup: boolean=false;
  Remarks: any="";
  Delete: boolean=false;
  structurelist:any;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  isValid:boolean=true;
  isDisconnected: boolean = false; 
 
  constructor(private service:PowerFinancialService,
    private _snackBar: MatSnackBar,private toastr: ToastrService,private router:Router) {
      this.isSuccess=false;
      this.errDescription=''
     }

  ngOnInit(): void {
    this.service.GetFilterStructure(0).subscribe((Response)=>{
      this.structurelist=Response;
    })
  }
  openSnackBar(message){
    this._snackBar.open(message, 'Ok',{
      duration:4000,
      horizontalPosition: 'center',
      verticalPosition:'bottom'
    });
  }
  Reload(){
    window.location.reload();
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  onSubmit(StructureId, Name,ParentId, IsGroup,Remarks){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }

      this.loading=true; 
    this.service.AddStructureValue(StructureId, Name, ParentId, IsGroup,Remarks,"Admin",this.Delete).subscribe(Response =>{
            
      this.loanAppResp = Response;
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        this.openSnackBar(this.errDescription);
        this.loading=false;
        return;
      }
    if (this.isSuccess==true){
     // this.toastr.success('Process Succeeded', 'Power Financial System');
     this.successmsg();
      this.loading=false;
      this.loading=false;
      this.router.navigate(['/structurevalue-list']);
      localStorage.setItem('AddStructureValue', 'false');
      localStorage.setItem('StructureValueName', '');
      
    }
     
  
    })
  }
  } 
  ClearData(){
    this.StructureId=0;
    this.Name="";
    this.ParentId=0;
    this.IsGroup=false;
    this.Remarks ="";
  }
  
  
    listBeneficiaries(){
      this.router.navigate(['/structurevalue-list']);
     }
  
     formValidation(){
       this.isValid=true;
       if(this.Name ==""){
         this.isValid=false;
       }
       return this.isValid;
  
     }

}