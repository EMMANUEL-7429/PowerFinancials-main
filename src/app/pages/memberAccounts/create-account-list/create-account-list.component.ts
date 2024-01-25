import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-create-account-list',
  templateUrl: './create-account-list.component.html',
  styleUrls: ['./create-account-list.component.css']
})
export class CreateAccountListComponent implements OnInit {
  public accountList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  MemberList:any;
  ProductList:any;
  Currencylist:any;
  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) {
    this.service.getAllMembers().subscribe(res=>{
      this.MemberList=res as [];
      console.log(this.MemberList)
    });
    this.service.GetAllProduct().subscribe(res=>{
      this.ProductList=res as [];
    });
    this.service.getAllCurrency().subscribe(res=>{
      this.Currencylist=res as [];
    })
   }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    
    this.isNodeLoading=true;
    this.service.GetAllMemberShare().subscribe(Response => {
      this.accountList = Response;
      this.temp=true;
      this.isNodeLoading=false;
    })
  }
  openForEdit(MemberShareId:number){
    this.router.navigate(['/create-account/edit/'+MemberShareId]); 
  }
  onDelete(id:number){
    if(confirm('Are you sure you want to delete this record??')){
      this.service.DeleteMemberShare(id).subscribe(res=>{
      this.refreshList();
        this.toastr.warning('Process  succedded', 'Power Financial');
        });
    }

  }

  getMemberName(id: any) : string {
    var name: string;
    if(this.MemberList){
    if(id>0){
    this.MemberList.some((obj)=>{      
      if(obj["MemberId"]==id){
        name=obj["FullName"];
        console.log(name)
        return true;
      }
    })}}
    return name;
  }
  getProductName(id: any) : string {
    var name: string;
    if(this.ProductList){
    if(id>0){
    this.ProductList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["ProductId"]==id){
        name=obj["Description"];
        return true;
      }
    })}}
    return name;
  }
  getCurrencyName(id: any) : string {
    var name: string;
    if(this.Currencylist){
    if(id>0){
    this.Currencylist.some((obj)=>{
      //var dim=obj as Element;
      if(obj["CurrencyId"]==id){
        name=obj["CurrencyName"];
        return true;
      }
    })}}
    return name;
  }

}