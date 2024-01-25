import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.scss']
})
export class ViewBankComponent implements OnInit {
  public BankList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  public loading: boolean = false;
  constructor( private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllBank().subscribe((Response)=>{
      this.BankList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openForEditBank(BankId :number){
    this.router.navigate(['/bank/edit/'+BankId]);

  }
  DeleteBank(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteBank(id).then((Response) =>{
      this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp['isSuccess'];
        this.errDescription = this.loanAppResp['errorDescription'];
        if (this.isSuccess==false && this.errDescription!=''){
          confirm(this.errDescription);          
          return;
         }
      this.refreshList();
      this.successmsg();
         }
      )}

}
