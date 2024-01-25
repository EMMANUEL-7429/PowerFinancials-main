import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-currency',
  templateUrl: './view-currency.component.html',
  styleUrls: ['./view-currency.component.scss']
})
export class ViewCurrencyComponent implements OnInit {
  public CurrencyList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllCurrency().subscribe((Response)=>{
      this.CurrencyList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openforEditCurrency(CurrencyId:number){
    this.router.navigate(['/currency/edit/'+CurrencyId]);
  }
 
  DeleteCurrency(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteCurrency(id).then((Response) =>{
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
