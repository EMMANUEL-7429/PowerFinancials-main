import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
import { ViewLoantypeChargesComponent } from "../view-loantype-charges/view-loantype-charges.component";

@Component({
  selector: "app-view-loantype",
  templateUrl: "./view-loantype.component.html",
  styleUrls: ["./view-loantype.component.scss"],
})
export class ViewLoantypeComponent implements OnInit {
  public LoanTypesList: Object; //change to Object if using data tables
  public temp: Object = false;
  spinnerContent: any;
  isDisconnected: boolean = false;

  IsSuccess: any;
  ErrorDescription: any;
  Resp: any;
  isNodeLoading: boolean = false;

  constructor(
    public service: LoanApplicationService,
    private router: Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.spinnerContent = "";
    this.IsSuccess = false;
    this.isDisconnected = false;
    this.ErrorDescription = "";
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isNodeLoading = true;
    this.service.getAllLoanTypes().subscribe((Response) => {
      this.LoanTypesList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }

  onUpdate(LoanTypeId: any) {
    this.router.navigate(["/loan-type/edit/" + LoanTypeId]);
  }

  addToList() {
    this.router.navigate(["/loan-type"]);
  }

  onListCharges(LoanTypeId: any) {
    window.localStorage.setItem("LoanTypeId-V", LoanTypeId);
    const dialogRef = this.dialog.open(ViewLoantypeChargesComponent, {
      width: '800px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      window.localStorage.setItem("LoanTypeId-V", "null");
    });
  }

  onDelete(LoanTypeId: any) {
    if (confirm("Are you sure yu want to delete this record?")) {
      this.service.DeleteLoanTYpe(LoanTypeId).subscribe((res) => {
        this.getData();
        this.successmsg();
      });
    }
  }
  onView() {}
  Reload() {
    window.location.reload();
  }
}
