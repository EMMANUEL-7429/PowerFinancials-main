import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import { DecimalPipe } from "@angular/common";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-charges",
  templateUrl: "./view-charges.component.html",
  styleUrls: ["./view-charges.component.scss"],
})
export class ViewChargesComponent implements OnInit {
  public chargesList: Object;
  public temp: Object = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  isNodeLoading: boolean = false;
  ChargesId: any;
  Code: string;
  Description: string;
  IsPercent: any = false;
  Value: any = 0;
  Tariff: any = false;
  TariffAmount: any = 0;
  IgnoreLowLimit: boolean;
  LowerLimit: any;
  UpperLimit: any;
  constructor(
    private service: PowerFinancialService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.GetAllCharge().subscribe((Response) => {
      this.chargesList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successMsg() {
    Swal.fire("Process Succeded");
  }
  openForEditCharges(ChargesId: number) {
    this.router.navigate(["/charges/edit/" + ChargesId]);
  }
  onDeleteCharge(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteCharge(id).subscribe((Response) => {
        this.refreshList();
        this.successMsg();
      });
  }
}
