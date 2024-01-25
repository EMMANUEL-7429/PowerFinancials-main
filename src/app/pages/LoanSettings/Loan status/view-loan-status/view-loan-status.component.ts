import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";

import Swal from "sweetalert2";
@Component({
  selector: "app-view-loan-status",
  templateUrl: "./view-loan-status.component.html",
  styleUrls: ["./view-loan-status.component.scss"],
})
export class ViewLoanStatusComponent implements OnInit {
  public loanStatusList: Object;
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
  successMsg() {
    Swal.fire("Process Succeeded");
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.getAllLoanStatus().subscribe((Response) => {
      this.loanStatusList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  openForEditLoanStatus(LoanStatusId: number) {
    this.router.navigate(["/loan-status/edit/" + LoanStatusId]);
  }
  onDeleteLoanStatus(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteLoanStatus(id).subscribe((Response) => {
        this.refreshList();

        this.successMsg();
      });
  }
}
