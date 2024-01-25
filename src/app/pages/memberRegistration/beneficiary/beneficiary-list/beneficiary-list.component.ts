import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent implements OnInit {
  public BeneficiaryList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  MemberList:[];
  RelationList:[];

  constructor(public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService,
    private currentRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.service.getAllMembers().subscribe(res=>{
      this.MemberList=res as [];
    });
    this.service.GetAllRelations().subscribe(res=>{
      this.RelationList=res as [];
    });
    this.getData();
  }

  getData(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.isNodeLoading=true;
    this.service.GetAllBeneficiaries(MemberId).subscribe(Response => {
    this.BeneficiaryList = Response;
    this.temp=true;
    this.isNodeLoading=false;
    })
  }
  
  onUpdate(id : number){
    this.router.navigate(['/beneficiary/edit/'+id]);
   
  }

  onDelete(id : number){
    if(confirm('Are you sure yu want to delete this record?')){
      this.service.DeleteBeneficiary(id).subscribe(res=>{
        this.getData();
        this.toastr.warning('Deleted Successfully', 'Angular Maps');
        });
    }
  }
  addBeneficiary(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/Create-beneficiary/edit/'+MemberId]); 
    
  }
  addNewBeneficiary(){
    this.router.navigate(['/member-list']); 
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
  getRelationShip(id: any) : string {
    var name: string;
    if(this.RelationList){
    if(id>0){
    this.RelationList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["RelationId"]==id){
        name=obj["RelationName"];
        return true;
      }
    })}}
    return name;
  }

}
