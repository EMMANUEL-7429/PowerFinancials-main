import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-marital-status",
  templateUrl: "./view-marital-status.component.html",
  styleUrls: ["./view-marital-status.component.scss"],
})
export class ViewMaritalStatusComponent implements OnInit {
  public maritalstatusList: Object;
  public temp: Object = false;
  isNodeLoading: boolean = false;
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
    this.service.getAllMaritalStatus().subscribe((Response) => {
      this.maritalstatusList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditMaritalStatus(MaritalStatusId: number) {
    this.router.navigate(["/marital-status/edit/" + MaritalStatusId]);
  }
  OnDeleteMaritalStatus(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteMaritalStatus(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
