import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-member-title",
  templateUrl: "./view-member-title.component.html",
  styleUrls: ["./view-member-title.component.scss"],
})
export class ViewMemberTitleComponent implements OnInit {
  public membertitleList: Object;
  public temp: Object = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
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
    this.service.getAllTitles().subscribe((Response) => {
      this.membertitleList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditTitle(TitleId: number) {
    this.router.navigate(["/member-titles/edit/" + TitleId]);
  }
  OnDeleteTitle(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteTitle(id).then((Response) => {
        this.refreshList();
        this.successmsg();
      });
  }
}
