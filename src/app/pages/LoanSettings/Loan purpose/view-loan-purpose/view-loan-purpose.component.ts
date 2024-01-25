import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-loan-purpose",
  templateUrl: "./view-loan-purpose.component.html",
  styleUrls: ["./view-loan-purpose.component.scss"],
})
export class ViewLoanPurposeComponent implements OnInit {
  public loanPurposeList: Object;
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
    this.service.getAllLoanPurposes().subscribe((Response) => {
      this.loanPurposeList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  sucessMsg() {
    Swal.fire("Process Succeded");
  }
  openForEditLoanPurpose(LoanPurposeId: number) {
    this.router.navigate(["/loan-purpose/edit/" + LoanPurposeId]);
  }
  onDeleteLoanPurpose(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteLoanPurpose(id).subscribe((Response) => {
        this.refreshList();
        this.sucessMsg();
      });
  }
}
