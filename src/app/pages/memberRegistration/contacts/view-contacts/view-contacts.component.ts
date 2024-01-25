import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.scss']
})
export class ViewContactsComponent implements OnInit {
  public ContactList: Object;
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
  MemberList:[];
  isValid:boolean=true;
  isDisconnected: boolean = false; 
  constructor(
    public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    private currentRoute:ActivatedRoute,
    private modalService: NgbModal
  ) { 
    this.service.getAllMembers().subscribe(res=>{
      this.MemberList=res as [];
    });
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
  }

  ngOnInit(): void {
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.getData();
    this.ContactList=[];
  }
  Reload(){
    window.location.reload();
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  getData(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.isNodeLoading=true;
    this.service.getMemberContact(MemberId).subscribe(Response => {
      this.ContactList = Response;
      this.temp=true;
      this.isNodeLoading=false;
    })
  }
  passId(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/insert-contact/edit/'+MemberId]);  
  }
  
  
  onUpdate(id : number){
    this.router.navigate(['/insert-contact/edit/'+id]);
  }

  onDelete(id : number){
    if(confirm('Are you sure you want to delete this record??')){
      this.service.DeleteContact(id).subscribe(res=>{
      this.getData();
        this.toastr.warning('Process  succedded', 'Power Financial');
        });
    }
  }
  
  getMemberNo(id: any) : string {
    var name: string;
    if(this.MemberList){
    if(id>0){
    this.MemberList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["MemberId"]==id){
        name=obj["MemberNo"];
        return true;
      }
    })}}
    return name;
  }
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


}
