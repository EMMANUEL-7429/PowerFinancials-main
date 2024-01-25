import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-paymodes',
  templateUrl: './view-paymodes.component.html',
  styleUrls: ['./view-paymodes.component.scss']
})
export class ViewPaymodesComponent implements OnInit {

  public paymodeList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;

  constructor(private service:AccountTransactionService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.GetAllPaymentModes().subscribe((Response)=>{
      this.paymodeList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openforPaymentMode(id:number){
    this.router.navigate(['/Paymodes/edit/'+id]);
  }
 
  DeletePaymode(id:number){
   /* if(confirm("Are you sure you want to delete this record?"))
    this.service.GetDefaultPaymentModes(id).then((Response) =>{
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
        )*/}

}
