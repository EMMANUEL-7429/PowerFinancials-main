import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-add-structure-value',
  templateUrl: './add-structure-value.component.html',
  styleUrls: ['./add-structure-value.component.scss']
})
export class AddStructureValueComponent implements OnInit {
  StructureValueId: any=0;
  StructureId: any=0;
  Name: any="";
  ParentId: any=0;
  IsGroup: boolean=false;
  Remarks: any="";
  Delete: boolean=false;
  IsAddStruct: any;
  isValid: boolean=true;
  myStructureValue:any;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  structurelist:any;
  Show:boolean=false;
  structurevaluelist:any;
  public loading: boolean = false;
  ParentName: any=0;
  ParentStructureId:any=0;
  structurelist1:any;
  StructureId1:any
  s1:boolean=false;
  s2:boolean=false



  constructor( private currentRoute:ActivatedRoute,
    public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar) {
      this.isSuccess=false;
      this.errDescription=''
     }

    ngOnInit(): void {
      this.IsAddStruct = localStorage.getItem('AddStructureValue');

    if(this.IsAddStruct == 'true'){
      this.s1=true;
      
      this.Show=true;
      this.ParentId = parseInt(localStorage.getItem('StructureValueId'));
      this.ParentName = localStorage.getItem('StructureValueName')
      this.ParentStructureId = parseInt(localStorage.getItem('StructureId'));
      this.service.GetFilterStructure(this.ParentStructureId).subscribe((Response)=>{
        this.structurelist=Response;
      })  
      

    }else{
     
        let StructureValueId=this.currentRoute.snapshot.paramMap.get('id');
        if(StructureValueId==null)
        this.ClearData();
        else{
          this.s2=true;
            this.service.GetStructureValue(parseInt(StructureValueId)).subscribe(Response =>{
            this.StructureValueId=Response.structureValue.StructureValueId;
            this.StructureId1=Response.structureValue.StructureId;
            this.Name=Response.structureValue.Name;
            this.ParentId=Response.structureValue.ParentId;
            this.IsGroup=Response.structureValue.IsGroup;
            this.Remarks=Response.structureValue.Remark
        })
        }
      }
      this.service.GetAllStructure().subscribe((Response)=>{
        this.structurelist1=Response;
      }) 
       
    }
  
    openSnackBar(message){
      this._snackBar.open(message, 'Ok',{
        duration:4000,
        horizontalPosition: 'center',
        verticalPosition:'top'
      });
    }
  
    //Save data
    onSubmit(StructureId,StructureId1, Name, ParentId, IsGroup,Remarks){
  
      if(this.formValidation()){
  
        this.loading=true;
        let StructureValueId=this.currentRoute.snapshot.paramMap.get('id');
        if(StructureValueId==null){
    
          //Add Contact
             
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
            this.toastr.success('Process Succeeded', 'Power Financial System');
            this.loading=false;
            this.ClearData();
            this.router.navigate(['/structurevalue-list']);
            localStorage.setItem('AddStructureValue', 'false');
            localStorage.setItem('StructureValueName', '');
            
          }
           
        
          })
    
        }else{
     
          this.service.UpdateStructureValue(StructureValueId,StructureId1, Name, ParentId, IsGroup,Remarks,"Admin",this.Delete
        
           ).subscribe(Response =>{
             
            this.loanAppResp = Response;
            this.isSuccess = this.loanAppResp['isSuccess'];
            this.errDescription = this.loanAppResp['errorDescription'];
            if (this.isSuccess==false && this.errDescription!=''){
              this.openSnackBar(this.errDescription);
              this.loading=false;
              return;
            }
          if (this.isSuccess==true){
            this.toastr.info('Process Succeeded', 'Power Financial System');
             
            this.loading=false;
            this.ClearData();
            this.router.navigate(['/structurevalue-list']);
            localStorage.setItem('AddStructureValue', 'false');
            localStorage.setItem('StructureValueName', '');
            
          }
           
         
           })
    
    
        }
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
    
     getParentId(ctrl){
      if(ctrl.selectedIndex==0){
       // this.ParentId=0;  
        
      }
      else{
        //this.ParentId=this.structurevaluelist[ctrl.selectedIndex-1].ParentId; 
      }
  
    }
   
}
