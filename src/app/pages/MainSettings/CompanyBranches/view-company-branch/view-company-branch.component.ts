import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-company-branch',
  templateUrl: './view-company-branch.component.html',
  styleUrls: ['./view-company-branch.component.scss']
})
export class ViewCompanyBranchComponent implements OnInit {

  public outletList: Object;
  public temp: Object = false;
  isNodeLoading: boolean = false;

  constructor(private service: PowerFinancialService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.isNodeLoading = true;
    this.service.getAllCompanyOutlets().subscribe((Response) => {
      this.outletList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEdit(outletId: number) {
    this.router.navigate(["/CompanyBranches/edit/" + outletId]);
  }
  OnDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.deleteOutlet(id).subscribe((Response) => {
        console.log(Response);
        this.refreshList();
        this.successmsg();
      });
  }
}
