import { CurrencyPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import { AddProductChargeComponent } from "../../productcharge/add-product-charge/add-product-charge.component";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  ProductId: any;
  Code: any = "";
  Description: any = "";
  MinDeposit: any = 0;
  MaxAmount: any = false;
  UpperLimit: any = 0;
  EarnDividends: any = false;
  DividendRate: any = 0;
  Withdrawn: any = false;
  FixedDeposit: any = false;
  Transferred: any = false;
  GuaranteeLoan: any = false;
  Frequency: any = "Monthly";
  EarnInterest: any = false;
  ChargeDefaulters: any = false;
  MultAccounts: any = false;
  ChargesId: any = 0;
  CallDeposit: any = false;
  MinBalance: any = 0;
  AccrueInterestDaily: any = false;
  Delete: any = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isValid: boolean = true;
  ChargeList: any = [];
  ChargeAllDetailList: any = [];
  formattedAmount;
  formattedBalance;
  ProductChargeId: any = 0;
  Productlist: any;
  productChargeList: any;
  allProductlist: [];
  allChargelist: [];
  formattedUpperLimit;
  CanBeOverdrawn: any = false;
  isDisconnected: boolean = false;

  showTable: boolean = false;
  constructor(
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.isSuccess = false;
    this.errDescription = "";
    this.service.GetAllProduct().subscribe((res) => {
      this.allProductlist = res as [];
    });
    this.service.GetChargeById().subscribe((res) => {
      this.allChargelist = res as [];
    });
  }

  ngOnInit(): void {
    let ProductId = this.currentRoute.snapshot.paramMap.get("id");
    if (ProductId == null) this.resetForm();
    else {
      this.showTable = true;
      this.service.GetProduct(parseInt(ProductId)).subscribe((Response) => {
        this.ProductId = Response.Product.id;
        this.Code = Response.Product.Code;
        this.Description = Response.Product.Description;
        this.MinDeposit = Response.Product.MinDeposit;
        this.MaxAmount = Response.Product.MaxAmount;
        this.UpperLimit = Response.Product.UpperLimit;
        this.EarnDividends = Response.Product.EarnDividends;
        this.DividendRate = Response.Product.DividendRate;
        this.Withdrawn = Response.Product.Withdrawn;
        this.FixedDeposit = Response.Product.FixedDeposit;
        this.Transferred = Response.Product.Transferred;
        this.GuaranteeLoan = Response.Product.GuaranteeLoan;
        this.Frequency = Response.Product.Frequency;
        this.EarnInterest = Response.Product.EarnInterest;
        this.ChargeDefaulters = Response.Product.ChargeDefaulters;
        this.MultAccounts = Response.Product.MultAccounts;
        this.CallDeposit = Response.Product.CallDeposit;
        this.MinBalance = Response.Product.MinBalance;
        this.CanBeOverdrawn = Response.Product.CanBeOverdrawn;
        this.AccrueInterestDaily = Response.Product.AccrueInterestDaily;
        this.service
          .GetAllProductCharge(parseInt(ProductId))
          .subscribe((Response) => {
            this.productChargeList = Response;
            console.log(Response);
          });
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  
  Reload() {
    window.location.reload();
  }
  formValidation() {
    this.isValid = true;
    if (this.Description == "") this.isValid = false;
    if (this.MinDeposit == 0) this.isValid = false;
    return this.isValid;

  }
  
  onSubmit(Code,Description,MinDeposit,MaxAmount,UpperLimit,EarnDividends,DividendRate,Withdrawn,FixedDeposit,Transferred,GuaranteeLoan,Frequency,EarnInterest,ChargeDefaulters,MultAccounts, CallDeposit,MinBalance,CanBeOverdrawn, AccrueInterestDaily){
    if(this.formValidation()){
      this.loading=true;
    let ProductId=this.currentRoute.snapshot.paramMap.get('id');
    if(ProductId==null)
    this.service.AddProduct(Code,Description,MinDeposit,MaxAmount,UpperLimit,EarnDividends,DividendRate,Withdrawn,FixedDeposit,Transferred,GuaranteeLoan,Frequency,EarnInterest,ChargeDefaulters,MultAccounts,CallDeposit,MinBalance,CanBeOverdrawn,AccrueInterestDaily,this.Delete=false).subscribe(Response =>{
      this.loanAppResp = Response;
      console.log(Response)
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        confirm(this.errDescription);
        this.loading=false;
        return;
       }
     if (this.isSuccess==true){
    this.successmsg();
      this.resetForm()
      this.loading=false;
     
     }
    })
    else{
    
      this.service.UpdateProduct(ProductId,Code,Description,MinDeposit,MaxAmount,UpperLimit,EarnDividends,DividendRate,Withdrawn,FixedDeposit,Transferred,GuaranteeLoan,Frequency,EarnInterest,ChargeDefaulters,MultAccounts, CallDeposit,MinBalance,CanBeOverdrawn, AccrueInterestDaily,this.Delete=false).subscribe(Response =>{
        this.loanAppResp = Response;
    this.isSuccess = this.loanAppResp['isSuccess'];
    this.errDescription = this.loanAppResp['errorDescription'];
    if (this.isSuccess==false && this.errDescription!=''){
    confirm(this.errDescription);
      this.loading=false;
      return;
     }
   if (this.isSuccess==true){
   this.successmsg();
    this.resetForm()
    this.loading=false;
    this.router.navigate(['/view-products']); 
   }
      })

  }
    }
  }

 
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.Code = "";
    this.Description = "";
    this.MinDeposit = 0;
    this.MaxAmount = false;
    this.UpperLimit = 0;
    this.EarnDividends = false;
    this.DividendRate = 0;
    this.Withdrawn = false;
    this.FixedDeposit = false;
    this.Transferred = false;
    this.GuaranteeLoan = false;
    this.Frequency = "Monthly";
    this.EarnInterest = false;
    this.ChargeDefaulters = false;
    this.MultAccounts = false;
    this.ChargesId = 0;
  }

  transformAmount(element) {
    this.formattedAmount = this.currencyPipe.transform(
      this.MinDeposit,
      "money="
    );

    element.target.value = this.formattedAmount;
  }
  transformBalance(element) {
    this.formattedBalance = this.currencyPipe.transform(this.MinBalance);

    element.target.value = this.formattedBalance;
  }
  transformUpperLimit(element) {
    this.formattedUpperLimit = this.currencyPipe.transform(this.UpperLimit);

    element.target.value = this.formattedUpperLimit;
  }

  openForEdit(ProductChargeIndex, ProductChargeId) {
    let ProductId = this.currentRoute.snapshot.paramMap.get("id");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { ProductChargeIndex, ProductChargeId, ProductId };
    this.dialog
      .open(AddProductChargeComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.service
          .GetAllProductCharge(parseInt(ProductId))
          .subscribe((Response) => {
            this.productChargeList = Response;
            console.log(Response);
          });
      });

    }
    UpdateProductCharge(ProductChargeId:number){
      this.router.navigate(['/update-charge/edit/'+ProductChargeId]);
    }
    OnDeleteProductCharge(id:number){
      let ProductId=this.currentRoute.snapshot.paramMap.get('id');
      if(confirm("Are you sure you want to delete this record?"))
       this.service.DeleteProductCharge(id).subscribe((Response) =>{
        this.service.GetAllProductCharge(parseInt(ProductId)).subscribe(Response =>{
          this.productChargeList=Response;
         })
        this.successmsg();
         }
      )
    }

  getproductName(id: any): string {
    var name: string;
    if (this.allProductlist) {
      if (id > 0) {
        this.allProductlist.some((obj) => {
          //var dim=obj as Element;
          if (obj["ProductId"] == id) {
            name = obj["Description"];
            return true;
          }
        });
      }
    }
    return name;
  }
  getChargeName(id: any): string {
    var name: string;
    if (this.allChargelist) {
      if (id > 0) {
        this.allChargelist.some((obj) => {
          //var dim=obj as Element;
          if (obj["ChargesId"] == id) {
            name = obj["Description"];
            return true;
          }
        });
      }
    }
    return name;
  }
  getChargeType(id: number) {
    if (id == 1) return "Overdraft";
    if (id == 2) return "Defaulters settings";
    if (id == 3) return "Standing order";
    if (id == 4) return "STO penalty";
    if (id == 5) return "Un-cleared effects";
    if (id == 6) return "Mobile Trx";
    if (id == 7) return "Notifications";
    if (id == 8) return "Cheque";
  }
}
