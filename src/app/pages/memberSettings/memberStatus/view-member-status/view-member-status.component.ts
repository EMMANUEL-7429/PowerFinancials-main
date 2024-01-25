import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-member-status',
  templateUrl: './view-member-status.component.html',
  styleUrls: ['./view-member-status.component.scss']
})
export class ViewMemberStatusComponent implements OnInit {
  public MemberStatusList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllMemberStatus().subscribe((Response)=>{
      this.MemberStatusList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  openForEditMemberStatus(MemberStatusId:number){
    this.router.navigate(['/member-status/edit/'+MemberStatusId]);

  }
  OnDeleteMemberStatus(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteMemberStatus(id).then((Response) =>{
      this.refreshList();
      this.toastr.warning('Process Succeeded', 'Power Financial System');
         }
      )}

}
