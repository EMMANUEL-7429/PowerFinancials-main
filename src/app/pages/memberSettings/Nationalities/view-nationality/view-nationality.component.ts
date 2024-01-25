import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-nationality",
  templateUrl: "./view-nationality.component.html",
  styleUrls: ["./view-nationality.component.scss"],
})
export class ViewNationalityComponent implements OnInit {
  public nationalityList: Object;
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
    this.service.getAllNationalities().subscribe((Response) => {
      this.nationalityList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditNationality(NationalityId: number) {
    this.router.navigate(["/nationality/edit/" + NationalityId]);
  }
  OnDeleteNationality(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteNationatity(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
