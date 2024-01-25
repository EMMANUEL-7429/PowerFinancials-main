import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";

@Component({
  selector: "app-view-setup-settings",
  templateUrl: "./view-setup-settings.component.html",
  styleUrls: ["./view-setup-settings.component.scss"],
})
export class ViewSetupSettingsComponent implements OnInit {
  public setupList: Object;
  public temp: Object = false;
  isNodeLoading: boolean = false;
  AutoGenNumberId: any;
  AutoGenNumberText: any;
  NumberingList: [];
  constructor(
    private service: PowerFinancialService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.service.getAllNumbering().subscribe((res) => {
      this.NumberingList = res as [];
    });
  }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.getAllSetup().subscribe((Response) => {
      this.setupList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }

  openForEdit(SetupId: number) {
    this.router.navigate(["/setup-settings/edit/" + SetupId]);
  }
  getPortName(id: any): string {
    var name: string;
    if (this.NumberingList) {
      if (id > 0) {
        this.NumberingList.some((obj) => {
          //var dim=obj as Element;
          if (obj["AutoGenNumberId"] == id) {
            name = obj["AutoGenNumberText"];
            return true;
          }
        });
      }
    }
    return name;
  }
}
