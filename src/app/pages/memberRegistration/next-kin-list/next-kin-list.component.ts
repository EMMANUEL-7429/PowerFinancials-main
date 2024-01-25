
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-next-kin-list',
  templateUrl: './next-kin-list.component.html',
  styleUrls: ['./next-kin-list.component.css']
})
export class NextKinListComponent implements OnInit {
  public KinList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  MemberList:[];
  RelationList:[];
  constructor(private service :PowerFinancialService,private router:Router,private toastr:ToastrService,
    private currentRoute:ActivatedRoute) { }
 
  ngOnInit() {
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.service.getAllMembers().subscribe(res=>{
      this.MemberList=res as [];
    });
    this.service.GetAllRelations().subscribe(res=>{
      this.RelationList=res as [];
    });
   
    this.refreshList();
  }
  refreshList(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.isNodeLoading=true;
    this.service.GetAllKins(MemberId).subscribe((Response)=>{
      this.KinList=Response;
      this.temp=true;
      this.isNodeLoading=false;
    });
  }
  openForEditkin(KinId :number){
    this.router.navigate(['/next-kin/edit/'+KinId]);
    
    
  }
  passIdToInsert(){
    let MemberId=this.currentRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/insert-next-kin/get/'+MemberId]); 
  }
  OnDeleteKin(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteKin(id).subscribe((Response) =>{
      this.refreshList();
      this.toastr.warning('Process Succeeded', 'Power Financial System');
         }
      )}
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

