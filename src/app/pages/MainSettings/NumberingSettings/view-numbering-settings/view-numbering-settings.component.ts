import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-numbering-settings",
  templateUrl: "./view-numbering-settings.component.html",
  styleUrls: ["./view-numbering-settings.component.scss"],
})
export class ViewNumberingSettingsComponent implements OnInit {
  public empData: Object;
  public temp: Object = false;
  isNodeLoading: boolean = false;
  numberingList: Object;
  constructor(
    private service: PowerFinancialService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.service.getAllPrefixes().subscribe((res) => {
      this.numberingList = res as [];
    });
  }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.getAllNumbering().subscribe((Response) => {
      this.numberingList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditNumbering(AutoGenNumberId: number) {
    this.router.navigate(["/numbering-settings/edit/" + AutoGenNumberId]);
  }
  OnDeleteNumbering(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteNumbering(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
