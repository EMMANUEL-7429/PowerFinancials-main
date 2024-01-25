import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-company-branches",
  templateUrl: "./add-company-branches.component.html",
  styleUrls: ["./add-company-branches.component.scss"],
})
export class AddCompanyBranchesComponent implements OnInit {
  CompanyBranchesId:any=0;
  Name:any="";
  Code:any="";
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  isValid:boolean=true;
  public loading: boolean = false;
  isDisconnected: boolean = false;
  Delete:any=false;
  constructor(
    private service: LoanApplicationService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }

  ngOnInit() {
    let CompanyBranchesId = this.currentRoute.snapshot.paramMap.get("id");
    if (CompanyBranchesId == null) this.resetForm();
    else {
      this.service.GetCompanyBranch(parseInt(CompanyBranchesId)).subscribe((Response) => {
        this.CompanyBranchesId = Response.CompanyBranch.id;
        this.Name = Response.CompanyBranch.Name; 
         this.Code = Response.CompanyBranch.Code;  
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(Code,Name) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let CompanyBranchesId = this.currentRoute.snapshot.paramMap.get("id");
      if (CompanyBranchesId == null)
        this.service.AddCompanyBranch(Code,Name,this.Delete=false).subscribe(
          (Response) => {
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
              //this.router.navigate(["/view-company-branches]);
            }
          },
          (error) => {
            this.isDisconnected = true;
            this.loading = false;
          }
        );
      else {
        this.service
          .UpdateCompanyBranch(CompanyBranchesId,Code,Name,this.Delete=false)
          .subscribe(
            (Response) => {
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
                this.router.navigate(["/view-company-branches"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      }
    }
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.Name=""; 
    this.Code="";
  }
  formValidation() {
    this.isValid = true;

    if(this.Name=="")
     this.isValid=false;
     if(this.Code=="")
     this.isValid=false;
    return this.isValid;
  }
}
