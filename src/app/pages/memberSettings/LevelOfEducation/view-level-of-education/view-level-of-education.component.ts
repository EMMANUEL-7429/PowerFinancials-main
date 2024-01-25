import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-level-of-education",
  templateUrl: "./view-level-of-education.component.html",
  styleUrls: ["./view-level-of-education.component.scss"],
})
export class ViewLevelOfEducationComponent implements OnInit {
  public levelofeducationList: Object;
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
    this.service.getAllLevelofEducation().subscribe((Response) => {
      this.levelofeducationList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditLevelofEducation(LevelofEducationId: number) {
    this.router.navigate(["/level-of-education/edit/" + LevelofEducationId]);
  }
  OnDeleteLevelofEducation(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteLevelofEducation(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
