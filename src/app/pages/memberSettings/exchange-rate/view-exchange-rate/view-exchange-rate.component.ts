import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-exchange-rate',
  templateUrl: './view-exchange-rate.component.html',
  styleUrls: ['./view-exchange-rate.component.scss']
})
export class ViewExchangeRateComponent implements OnInit {
  public CurrencyRateList: Object;
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
    this.service.getAllCurrencyRate().subscribe((Response)=>{
      this.CurrencyRateList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openforEditCurrencyRate(ExchangeRateId:number){
    this.router.navigate(['/exchange-rate/edit/'+ExchangeRateId]);
  }
  DeleteCurrencyRate(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteCurrencyRate(id).then((Response) =>{
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
