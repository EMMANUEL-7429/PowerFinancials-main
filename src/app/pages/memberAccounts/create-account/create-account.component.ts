import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { createTranslateLoader } from 'src/app/app.module';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
import { SearchMemberComponent } from '../search-member/search-member.component';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  MemberShareId:any;
  //member
  MemberId:any=0
  FullName:any="";
  SearchName:any="";
  PhoneNumber:any="";  
  CurrencyName:any;
  //product
  ProductId :any=0;
  ContributionRate:any=0; 
  MinBalance:any=0;
  //
  TransactionDate:any=new Date; 
  HideBalance:any=false;
  ExemptMobileCharges:any=false;
  Delete:any=false;
  memberList:any;
  Productlist:any;
  isValid:boolean=true;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  MemberSharedList:any;
  ShowForm:any=true;
  showTable:any=false;
  CurrencyId:any;
  public loading: boolean = false;
  CurrencyList:any;
  MemberNo:any;
  IdNo:any;
  IsAddmember:any;
  AccountNumber:any;
  memberIdd:any;
  isDisconnected: boolean = false; 
  entersearchValue:any;
  searchText:any;
  MemberList:any;

  
  constructor(private service:PowerFinancialService,private currentRoute:ActivatedRoute,
    public dialog:MatDialog,private router:Router) {
      
    this.isSuccess=false;
    this.errDescription=''
   }
  ngOnInit(): void {
    let MemberShareId=this.currentRoute.snapshot.paramMap.get('id');
    if(MemberShareId==null)
    this.resetForm();
   
      else{
        this.showTable=true;
        this.ShowForm=false;
        this.service.GetMemberShare(parseInt(MemberShareId)).subscribe(Response =>{
          this.MemberShareId=Response.MemberShare.id;
          this.MemberId=Response.MemberShare.MemberId;
          this.ProductId=Response.MemberShare.ProductId;
          this.ContributionRate=Response.MemberShare.ContributionRate; 
          this.MinBalance=Response.MemberShare.MinBalance;  
          this.TransactionDate=Response.MemberShare.TransactionDate;  
          this.HideBalance=Response.MemberShare.HideBalance; 
          this.ExemptMobileCharges=Response.MemberShare.ExemptMobileCharges;
          this.CurrencyId=Response.MemberShare.CurrencyId; 
          console.log(Response.MemberShare.AccountNumber)
          this.AccountNumber=Response.MemberShare.AccountNumber;
          this.service.GetMemberSharedById(this.MemberId).subscribe(Response =>{
            console.log(Response)
            this.MemberSharedList=Response;
            this.service.getMember(parseInt(this.MemberId)).subscribe(Response =>{
              this.MemberId=Response.member.id;
              this.FullName=Response.member.FullName;
              this.PhoneNumber=Response.member.PhoneNo;
              this.SearchName=Response.member.SearchName;          
            this.service.getMemberByMemberNo(this.MemberNo).subscribe(Response =>{             
            this.MemberId=Response.member.MemberId   
            this.FullName=Response.member.FullName;      
            this.PhoneNumber=Response.member.PhoneNo;
            this.SearchName=Response.member.SearchName;
          })
          })      
        })     
      })
    }

    this.refreshMemberList();
    this.refreshProductList();
    this.refreshCurrencyList();
    this.TransactionDate = new Date().toISOString().split('T')[0]; 
  }
  refreshMemberList(){
    this.service.getAllMembers().subscribe((Response)=>{
      this.memberList=Response;     
    });
  }
  refreshProductList(){
    this.service.GetAllProduct().subscribe((Response)=>{
      this.Productlist=Response;
      
    })
  }
  refreshCurrencyList(){
    this.service.getAllCurrency().subscribe((Response)=>{
      this.CurrencyList=Response;
      this.CurrencyId=0;
      
      var myList=this.CurrencyList as [];
      for(var i=0;i<myList.length;i++){
         var obj=myList[i];
         console.log('Checking main currency')
         if(obj['IsMainCurrency']==true)
          {
            this.CurrencyId=obj['CurrencyId'];            
            break;
          }         
      }
      
    })
  }
  
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  onChange(event) {
    this.FullName = event.srcElement.memberList[0].FullName;
    console.log(this.FullName)
  }
  getMemberDetails(e){
    if(e === ''){ 
      this.FullName='';
      this.SearchName='';
      this.PhoneNumber='';
      this.CurrencyId=0;
    }
    else{
      this.FullName=this.memberList[e.target.value].FullName;
      this.SearchName=this.memberList[e.target.value].SearchName;
      this.PhoneNumber=this.memberList[e.target.value].PhoneNo;      
      for(var items of this.CurrencyList){
        this.CurrencyId=this.memberList[e.target.value].CurrencyId;
             }
             
  }}
  Reload(){
    window.location.reload();
  }
  
getCurrencyName(id: any) : string {
  var name: string;
  if(this.CurrencyList){
  if(id>0){
  this.CurrencyList.some((obj)=>{
  if(obj["CurrencyId"]==id){
  name=obj["CurrencyName"];
  return true;
  }
  })}}
  return name;
  }
  getProductDetails(ctrl){
    if(ctrl.selectedIndex==0){ 
      this.ContributionRate='';
      this.MinBalance='';
      
    }
    else{
      this.ContributionRate=this.Productlist[ctrl.selectedIndex-1].MinDeposit;
      this.MinBalance=this.Productlist[ctrl.selectedIndex-1].MinBalance;      
      
    }

  }

  formValidation(){
    this.isValid=true;
    if(this.MemberId==0)
    this.isValid=false;
    if(this.ProductId==0)
    this.isValid=false;
    if(this.AccountNumber=='')
    this.isValid=false;
    return this.isValid;
   }
  onSubmit(MemberId,ProductId,ContributionRate,MinBalance,TransactionDate,HideBalance,ExemptMobileCharges,CurrencyId,AccountNumber){
    if(this.formValidation()){
      if(this.isDisconnected==false){
      }
      this.loading=true;
     
    let MemberShareId=this.currentRoute.snapshot.paramMap.get('id');
    if(MemberShareId==null){
      //debugger;
    this.service.AddMemberShare(MemberId,ProductId,ContributionRate,MinBalance,TransactionDate,HideBalance,ExemptMobileCharges,CurrencyId,AccountNumber,this.Delete=false).subscribe(Response =>{
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
     
    } ,(error)=>{
      this.isDisconnected=true;
      this.loading=false})
    }
    else
    {
      this.service.UpdateMemberShare(MemberShareId,MemberId,ProductId,ContributionRate,MinBalance,TransactionDate,HideBalance,ExemptMobileCharges,CurrencyId,AccountNumber,this.Delete=false).subscribe(Response =>{
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
      this.FullName="";
      this.IdNo="";    
      this.router.navigate(['/create-account-list']); 
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
    this.MemberId=0;
    this.FullName='';
    this.SearchName='';
    this.PhoneNumber='';
    //product
    this.ProductId =0;
    this.ContributionRate=0; 
    this.MinBalance=0;
    //
    this.TransactionDate=new Date; 
    this.HideBalance=false;
    this.ExemptMobileCharges=false;
    this.AccountNumber='';

    
   }
   openForUpdate(){
     this.showTable=false;
     this.resetForm();
     this.ShowForm=true;

   } 
   
onsearchTextEntered(searchValue:any){
this.searchText=searchValue;
console.log(this.searchText)
}
openForSeachMember(ViewMembereIndex){    
  const dialogConfig= new MatDialogConfig();
  dialogConfig.autoFocus=true;
  dialogConfig.disableClose=true;
  dialogConfig.width = "60%";
  dialogConfig.data={ViewMembereIndex};
  this.dialog.open(SearchMemberComponent,dialogConfig).afterClosed().subscribe(Response =>{
    this.IsAddmember = localStorage.getItem('AddMember');
  if(this.IsAddmember == 'true' && localStorage.getItem('MemberId')!=""){
    this.memberIdd= parseInt(localStorage.getItem('MemberId'));
    this.service.getMember(parseInt(this.memberIdd)).subscribe(Response =>{
      this.MemberId= this.memberIdd;
      this.FullName=Response.member.FullName;
      this.PhoneNumber=Response.member.PhoneNo;
      this.SearchName=Response.member.SearchName;
      localStorage.setItem('MemberId', "");
    },(error)=>{
      //Clear
      //Hebu test sasa I hope iko sawa
      localStorage.setItem('MemberId', "");

    });
      
  }
    
})
 }

 onKey(MemberId:number){ 
  this.service.getMember(parseInt(this.MemberId)).subscribe(Response =>{    
    this.FullName=Response.member.FullName;
    
    this.PhoneNumber=Response.member.PhoneNo;
    this.SearchName=Response.member.SearchName;
      
 });
}

}
 
 

