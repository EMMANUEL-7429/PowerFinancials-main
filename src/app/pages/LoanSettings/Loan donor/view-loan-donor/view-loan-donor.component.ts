import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-loan-donor",
  templateUrl: "./view-loan-donor.component.html",
  styleUrls: ["./view-loan-donor.component.scss"],
})
export class ViewLoanDonorComponent implements OnInit {
  public loanDonorList: Object;
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
    this.service.getAllLoanDonor().subscribe((Response) => {
      this.loanDonorList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successMsg() {
    Swal.fire("Process Succeded");
  }
  openForEditLoanDonor(DonorId: number) {
    this.router.navigate(["/loan-donor/edit/" + DonorId]);
  }
  onDeleteLoanDonor(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteLoanDonor(id).subscribe((Response) => {
        this.refreshList();
        this.successMsg();
      });
  }
}
