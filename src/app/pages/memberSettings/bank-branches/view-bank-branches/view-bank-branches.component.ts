import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-bank-branches',
  templateUrl: './view-bank-branches.component.html',
  styleUrls: ['./view-bank-branches.component.scss']
})
export class ViewBankBranchesComponent implements OnInit {
  public BankBranchesList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  BankList:[];
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) {
    this.service.getAllBank().subscribe(res=>{
      this.BankList=res as [];
    });
   }

  ngOnInit(): void {
   
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllBranches().subscribe((Response)=>{
      this.BankBranchesList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openforEditBranch(BranchId:number){
    this.router.navigate(['/bank-branches/edit/'+BranchId]);
  }
  DeleteBanch(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteBranch(id).subscribe((Response) =>{
      this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp['isSuccess'];
        this.errDescription = this.loanAppResp['errorDescription'];
        if (this.isSuccess==false && this.errDescription!=''){
          confirm(this.errDescription);          
          return;
         }
      //this.refreshList();
     this.successmsg();
         }
      )}
     
      getBankName(id: any) : string {
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
}
