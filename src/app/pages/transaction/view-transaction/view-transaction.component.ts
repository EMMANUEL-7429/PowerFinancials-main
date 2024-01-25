import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountTransactionService } from "src/app/shared/service/account-transaction.service";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import { TransactionrecieptService } from "src/app/shared/service/transactionreciept.service";

@Component({
  selector: "app-view-transaction",
  templateUrl: "./view-transaction.component.html",
  styleUrls: ["./view-transaction.component.scss"],
})
export class ViewTransactionComponent implements OnInit {
  FullName: any;
  ProductId: any;
  MemberNo: any = 0;
  MemberId: any;
  IdNo: any;
  memberList: any;
  isValid: boolean = true;
  allProductlist: any;
  ContributionRate: any;
  MinBalance: any;
  MemberSharedList: any;
  Productlist: any;
  AccountTransactionList: any;
  ShowTable: any = false;
  Description: any;
  Id: any;
  name: any;
  Date: any = new Date();
  IsAddmember: any;
  memberIdd: any;
  isNodeLoading: boolean = false;

  constructor(
    public service: AccountTransactionService,
    private pfservice: PowerFinancialService,
    public SERVICE: TransactionrecieptService,
    public dialog: MatDialog,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem("AddTransactions", "false");
    this.refreshMemberList();
    this.pfservice.GetAllProduct().subscribe((res) => {
      this.allProductlist = res as [];
    });
    this.Date = new Date().toISOString().split("T")[0];
  }

  refreshMemberList() {
    this.pfservice.getAllMembers().subscribe((Response) => {
      this.memberList = Response;
    });
  }

  getMemberDetails(ctrl) {
    this.ShowTable = true;
    if (ctrl.selectedIndex == 0) {
      this.MemberId = 0;
      this.FullName = "";
      this.IdNo = 0;
    } else {
      this.MemberId = this.memberList[ctrl.selectedIndex - 1].MemberId;
      this.FullName = this.memberList[ctrl.selectedIndex - 1].FullName;
      this.IdNo = this.memberList[ctrl.selectedIndex - 1].IdNo;
      this.name = this.FullName;
      this.Id = this.IdNo;

      this.service.GetMemberAccountById(this.MemberId).subscribe((Response) => {
        this.MemberSharedList = Response;
      });
    }
  }
  getproductName(id: any): string {
    var name: string;
    if (this.allProductlist) {
      if (id > 0) {
        this.allProductlist.some((obj) => {
          if (obj["ProductId"] == id) {
            name = obj["Description"];
            return true;
          }
        });
      }
    }
    return name;
  }

  AddPassTransaction(id: number, idone: number, account: string) {
    localStorage.setItem("MemberId", id.toString());
    localStorage.setItem("ProductId", idone.toString());
    localStorage.setItem("AccountNo", account);
    localStorage.setItem("AddTransactions", "true");
    this.router.navigate(["/member-account-list"]);
  }
  pdfMemberAccounts() {
    for (var items of this.memberList) {
      for (var item of this.MemberSharedList) {
        for (var prod of this.allProductlist) {
          //this.SERVICE.getTransactionPDF(this.tthis.FullName,this.MemberNo,this.IdNo,prod.Description,item.ContributionRate,item.MinBalance)
          //console.log(TransactionDate,FullName,MemberNo,IdNo,DocumentNo,ValueDate,Amount,Description,PaidBy)
        }
      }
    }
  }
  openForSeachMember(ViewMembereIndex) {
    /*    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.data={ViewMembereIndex};
    this.dialog.open(ViewMemberComponent,dialogConfig).afterClosed().subscribe(Response =>{
      this.IsAddmember = localStorage.getItem('AddMember');
    if(this.IsAddmember == 'true' && localStorage.getItem('MemberId')!=""){
      this.memberIdd= parseInt(localStorage.getItem('MemberId'));
      this.pfservice.getMember(parseInt(this.memberIdd)).subscribe(Response =>{
        this.MemberNo= this.memberIdd;
        this.FullName=Response.member.FullName;
        this.IdNo=Response.member.IdNo;
        this.service.GetMemberAccountById(this.memberIdd).subscribe(Response=>{
          this.MemberSharedList=Response;
          })
        localStorage.setItem('MemberId', "");
      },(error)=>{
        //Clear
        //Hebu test sasa I hope iko sawa
        localStorage.setItem('MemberId', "");
  
      });
        
    }
      
  })
   
    
  } */
  }
}
