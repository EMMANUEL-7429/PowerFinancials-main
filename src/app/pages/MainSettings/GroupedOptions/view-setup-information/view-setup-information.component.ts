import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-setup-information',
  templateUrl: './view-setup-information.component.html',
  styleUrls: ['./view-setup-information.component.scss']
})
export class ViewSetupInformationComponent implements OnInit {

  public SetupInformationList: Object;
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
      this.service.getAllSetupInformation().subscribe((Response) => {
        this.SetupInformationList = Response;
        this.temp = true;
        this.isNodeLoading = false;
      });
    }
    successmsg() {
      Swal.fire("Process Succeeded");
    }
    openForEdit(OptionId: number) {
      this.router.navigate(["/SetupInformation/edit/" + OptionId]);
    }
}
