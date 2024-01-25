import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-credit-officer',
  templateUrl: './view-credit-officer.component.html',
  styleUrls: ['./view-credit-officer.component.scss']
})
export class ViewCreditOfficerComponent implements OnInit {
  public CreditOfficerList: Object;
  public temp: Object = false;  
  isNodeLoading: boolean = false;

  constructor(private service: PowerFinancialService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.CreditOfficerList=[];
    
  }
  getData() {
    this.isNodeLoading=true;
    this.service.GetAllCreditOfficers().subscribe(Response => {
      this.CreditOfficerList = Response;
      this.temp = true;
      this.isNodeLoading=false;
  })
}
successMsg() {
  Swal.fire("Process Succeded");
}
onEditCreditOfficer (CreditOfficerId: number) {
  this.router.navigate(["/credit-officer/edit/" + CreditOfficerId]);
}
onDeleteCreditOfficer(id : number){
  if(confirm('Are you sure yu want to delete this record?')){
    this.service.DeleteCreditOfficer(id).subscribe(res=>{
      this.getData();
      this.successMsg();
      });
  }
}

}