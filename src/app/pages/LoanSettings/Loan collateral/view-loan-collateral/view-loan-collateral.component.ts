import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-loan-collateral",
  templateUrl: "./view-loan-collateral.component.html",
  styleUrls: ["./view-loan-collateral.component.scss"],
})
export class ViewLoanCollateralComponent implements OnInit {
  public collateralList: Object;
  public temp: Object = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  isNodeLoading: boolean = false;
  constructor(
    private service: LoanApplicationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.getAllCollateral().subscribe((Response) => {
      this.collateralList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  sucessMsg() {
    Swal.fire("Process Succeded");
  }
  openForEditCollateral(CollateralId: number) {
    this.router.navigate(["/loan-collateral/edit/" + CollateralId]);
  }
  onDeleteCollateral(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteCollateral(id).subscribe((Response) => {
        this.refreshList();
        this.sucessMsg();
      });
  }
}
