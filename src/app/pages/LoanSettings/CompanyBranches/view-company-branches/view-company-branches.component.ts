import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-company-branches',
  templateUrl: './view-company-branches.component.html',
  styleUrls: ['./view-company-branches.component.scss']
})
export class ViewCompanyBranchesComponent implements OnInit {

  CompanyId:any=0;
  public BranchList: Object;
  public temp: Object = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  isNodeLoading: boolean = false;  

  constructor(
    private service: LoanApplicationService,
    private router:Router
  
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.GetAllCompanyBranches().subscribe((Response) => {
      this.BranchList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successMsg() {
    Swal.fire("Process Succeded");
  }
  openForEditCompanyBranch(CompanyBranchesId: number) {
    this.router.navigate(["/company-branches/edit/" + CompanyBranchesId]);
  }
  DeleteCompanyBranch(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteCompanyBranch(id).subscribe((Response) => {
        this.refreshList();
        this.successMsg();
      });
  }
}

