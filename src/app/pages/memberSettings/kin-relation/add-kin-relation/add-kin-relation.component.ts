import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-kin-relation",
  templateUrl: "./add-kin-relation.component.html",
  styleUrls: ["./add-kin-relation.component.scss"],
})
export class AddKinRelationComponent implements OnInit {
  RelationId: any;
  RelationName: any = "";
  isValid: boolean = true;
  Delete: any = false;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isDisconnected: boolean = false;
  constructor(
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }

  ngOnInit(): void {
    let RelationId = this.currentRoute.snapshot.paramMap.get("id");
    if (RelationId == null) this.resetForm();
    else {
      this.service.GetRelation(parseInt(RelationId)).subscribe((Response) => {
        this.RelationId = Response.relation.id;
        this.RelationName = Response.relation.RelationName;
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(RelationName) {
    if (this.formValidation()) {
      let RelationId = this.currentRoute.snapshot.paramMap.get("id");
      this.loading = true;
      if (RelationId == null)
        this.service
          .AddRelation(RelationName, this.Delete)
          .subscribe((Response) => {
            this.loanAppResp = Response;
            this.isSuccess = this.loanAppResp["isSuccess"];
            this.errDescription = this.loanAppResp["errorDescription"];
            if (this.isSuccess == false && this.errDescription != "") {
              confirm(this.errDescription);
              this.loading = false;
              return;
            }
            if (this.isSuccess == true) {
              this.successmsg();
              this.resetForm();
              this.loading = false;
            }
          });
      else {
        this.service
          .UpdateRelation(RelationId, RelationName, this.Delete)
          .subscribe((Response) => {
            this.loanAppResp = Response;
            this.isSuccess = this.loanAppResp["isSuccess"];
            this.errDescription = this.loanAppResp["errorDescription"];
            if (this.isSuccess == false && this.errDescription != "") {
              confirm(this.errDescription);
              this.loading = false;
              return;
            }
            if (this.isSuccess == true) {
              this.successmsg();
              this.resetForm();
              this.loading = false;
              this.router.navigate(["/view-kin-relation"]);
            }
          });
      }
    }
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.RelationName = "";
  }
  formValidation() {
    this.isValid = true;
    if (this.RelationName == "") this.isValid = false;
    return this.isValid;
  }
}
