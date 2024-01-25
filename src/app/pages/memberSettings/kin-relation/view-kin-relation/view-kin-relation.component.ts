import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-kin-relation",
  templateUrl: "./view-kin-relation.component.html",
  styleUrls: ["./view-kin-relation.component.scss"],
})
export class ViewKinRelationComponent implements OnInit {
  public RelationList: Object;
  public temp: Object = false;
  isNodeLoading: boolean = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
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
    this.service.GetAllRelations().subscribe((Response) => {
      this.RelationList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEditRelationship(RelationId: number) {
    this.router.navigate(["/kin-relation/edit/" + RelationId]);
  }
  OnDeleteRelation(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteRelation(id).subscribe((Response) => {
        this.loanAppResp = Response;
        this.isSuccess = this.loanAppResp["isSuccess"];
        this.errDescription = this.loanAppResp["errorDescription"];
        if (this.isSuccess == false && this.errDescription != "") {
          confirm(this.errDescription);
          return;
        }
        this.refreshList();
        this.successmsg();
      });
  }
}
