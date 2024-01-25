import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-holiday',
  templateUrl: './view-holiday.component.html',
  styleUrls: ['./view-holiday.component.scss']
})
export class ViewHolidayComponent implements OnInit {

  public holidayList: Object;
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
    this.service.getAllHolidays().subscribe((Response) => {
      this.holidayList = Response;
      this.temp = true;
      this.isNodeLoading = false;
    });
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  openForEdit(HolidayId: number) {
    this.router.navigate(["/Holidays/edit/" + HolidayId]);
  }
  OnDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?"))
      this.service.deleteHoliday(id).subscribe((Response) => {
        console.log(Response);
        this.refreshList();
        this.successmsg();
      });
  }
}


