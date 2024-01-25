import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import { FixedDepositsService } from 'src/app/shared/service/fixed-deposits.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-fixed-deposits',
  templateUrl: './view-fixed-deposits.component.html',
  styleUrls: ['./view-fixed-deposits.component.scss']
})
export class ViewFixedDepositsComponent implements OnInit {
  ApplicationDate:any= new Date();
  FullName: any;
  ProductId: any;
  MemberNo: any = 0;
  MemberId: any;
  IdNo: any;
  memberList: any;
  isValid: boolean = true;
  public FixedDepositList: Object;
  public temp: Object = false;  
  isNodeLoading: boolean = false;

  constructor(
    private Fdservice:FixedDepositsService,
    private pfservice: PowerFinancialService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.setItem("AddFixedDeposit", "false");
    this.refreshMemberList();
    this.getData();
    this.FixedDepositList=[];
    
  }
  refreshMemberList() {
    this.pfservice.getAllMembers().subscribe((Response) => {
      this.memberList = Response;
    });
  }
  getData() {
    this.isNodeLoading=true;
    this.Fdservice.GetAllFixedDeposits().subscribe(Response => {
      this.FixedDepositList = Response;
      this.temp = true;
      this.isNodeLoading=false;
    })
  }
  
  successMsg() {
    Swal.fire("Process Succeded");
  }
  onEditFixedDeposits (FixedDepositId: number) {
    this.router.navigate(["/FixedDeposit/edit/" + FixedDepositId]);
  }
  onDeleteFixedDeposits(id : number){
    if(confirm('Are you sure yu want to delete this record?')){
      this.Fdservice.DeleteFixedDeposits(id).subscribe(res=>{
        this.getData();
        this.successMsg();
        });
    }
  }

}

