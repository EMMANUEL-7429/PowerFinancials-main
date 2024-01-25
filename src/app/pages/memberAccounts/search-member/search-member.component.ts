import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.scss']
})
export class SearchMemberComponent implements OnInit {
 
  public memberList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  TitleList:[];
  MaritalStatusList:[];
  leveofEducationList:[];
  MemberStatusList:[];
  NationalityList:[];
  BankList:[];
  BankBranchList:[];
  CurrencyList:[];
  QuestionList:[];
  StructureValuesList:[];
 constructor(@Inject(MAT_DIALOG_DATA)public data,
 public dialogRef:MatDialogRef<SearchMemberComponent>,private service:PowerFinancialService,private router:Router,private toastr:ToastrService) {
   this.service.getAllTitles().subscribe(res=>{
       this.TitleList=res as [];
     });
     this.service.getAllMaritalStatus().subscribe(res=>{
       this.MaritalStatusList=res as [];
     });
     this.service.getAllLevelofEducation().subscribe(res=>{
       this.leveofEducationList=res as [];
     });
     this.service.getAllMemberStatus().subscribe(res=>{
       this.MemberStatusList=res as [];
     });
     this.service.getAllNationalities().subscribe(res=>{
       this.NationalityList=res as [];
     });
     this.service.getAllBank().subscribe(res=>{
       this.BankList=res as [];
     });
     this.service.getAllBranches().subscribe(res=>{
       this.BankBranchList=res as [];
     });
     this.service.getAllCurrency().subscribe(res=>{
       this.CurrencyList=res as [];
     });
     this.service.getAllGenders().subscribe(res=>{
       this.QuestionList=res as [];
     });
     this.service.GetAllStructureValues().subscribe(res=>{
       this.StructureValuesList=res as [];
     });
  }
  
 ngOnInit(): void {
  localStorage.setItem('AddMember', 'false');
   this.refreshList();

 }

 refreshList(){
   this.isNodeLoading=true;
   this.service.getAllMembers().subscribe((Response)=>{
     this.memberList=Response;
     this.temp=true;
     this.isNodeLoading=false;
     
   });
 }
 openForEditMember(MemberId:number){
   this.router.navigate(['/member/edit/'+MemberId]);
 }
 GetIdForNextKin(MemberId:number){
   this.router.navigate(['/next-kin-list/get/'+MemberId]); 
 }

 GetIdForContantPerson(MemberId:number){
 this.router.navigate(['/contact-person-list/edit/'+MemberId]);   
 }

 GetIdForBeneficiary(MemberId:number){
   this.router.navigate(['/beneficiary-list/get/'+MemberId]);
 }
 DeleteMember(id:number){
   if(confirm("Are you sure you want to delete this record?"))
   this.service.DeleteMember(id).then((Response) =>{
     this.refreshList();
     this.toastr.warning('Process Succeeded', 'Power Financial System');
        }
     )}
     getTitleName(id: any) : string {
       var name: string;
       if(this.TitleList){
       if(id>0){
       this.TitleList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["TitleId"]==id){
           name=obj["TitleName"];
           return true;
         }
       })}}
       return name;
     }
    
     getMaritalStatusName(id: any) : string {
       var name: string;
       if(this.MaritalStatusList){
       if(id>0){
       this.MaritalStatusList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["MaritalStatusId"]==id){
           name=obj["MaritalStatusName"];
           return true;
         }
       })}}
       return name;
     }
     
     getLevelofEducationName(id: any) : string {
       var name: string;
       if(this.leveofEducationList){
       if(id>0){
       this.leveofEducationList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["LevelofEducationId"]==id){
           name=obj["LevelofEducationName"];
           return true;
         }
       })}}
       return name;
     }
     getMemberStatus(id: any) : string {
       var name: string;
       if(this.MemberStatusList){
       if(id>0){
       this.MemberStatusList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["MemberStatusId"]==id){
           name=obj["MemberStatusName"];
           return true;
         }
       })}}
       return name;
     }
     getNationality(id: any) : string {
       var name: string;
       if(this.NationalityList){
       if(id>0){
       this.NationalityList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["NationalityId"]==id){
           name=obj["NationalityName"];
           return true;
         }
       })}}
       return name;
     }
     
     getBank(id: any) : string {
       var name: string;
       if(this.BankList){
       if(id>0){
       this.BankList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["BankId"]==id){
           name=obj["BankName"];
           return true;
         }
       })}}
       return name;
     }
     
     getBankBranch(id: any) : string {
       var name: string;
       if(this.BankBranchList){
       if(id>0){
       this.BankBranchList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["BranchId"]==id){
           name=obj["BranchName"];
           return true;
         }
       })}}
       return name;
     }
     
     getCurrency(id: any) : string {
       var name: string;
       if(this.CurrencyList){
       if(id>0){
       this.CurrencyList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["CurrencyId"]==id){
           name=obj["CurrencyName"];
           return true;
         }
       })}}
       return name;
     }
     getQuestion(id: any) : string {
       var name: string;
       if(this.QuestionList){
       if(id>0){
       this.QuestionList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["GenderId"]==id){
           name=obj["GenderName"];
           return true;
         }
       })}}
       return name;
     } 
     getMemberHierarchy(id: any) : string {
       var name: string;
       if(this.StructureValuesList){
       if(id>0){
       this.StructureValuesList.some((obj)=>{
         //var dim=obj as Element;
         if(obj["StructureValueId"]==id){
           name=obj["Name"];
           return true;
         }
       })}}
       return name;
     }  
     AddPassMemberDetails(id : number){
      localStorage.setItem('MemberId', id.toString());
      localStorage.setItem('AddMember', 'true');
      console.log(id)
      this.dialogRef.close();
    }  
    
}
