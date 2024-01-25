import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-prefix-settings",
  templateUrl: "./view-prefix-settings.component.html",
  styleUrls: ["./view-prefix-settings.component.scss"],
})
export class ViewPrefixSettingsComponent implements OnInit {
  public prefixesList: Object;
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
    this.service.getAllPrefixes().subscribe((Response) => {
      this.prefixesList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditPrefix(AutoPrefixId: number) {
    this.router.navigate(["/prefix-settings/edit/" + AutoPrefixId]);
  }
  OnDeletePrefix(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeletePrefixe(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
