import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
import { LoanApplicationService } from 'src/app/shared/service/loan-application.service';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
import { SearchMemberComponent } from '../../memberAccounts/search-member/search-member.component';

@Component({
  selector: 'app-add-deposit',
  templateUrl: './add-deposit.component.html',
  styleUrls: ['./add-deposit.component.scss']
})
export class AddDepositComponent implements OnInit {
  isValid: boolean = true;
  Bank: any = 0;
  FullName: any = "";
  IdNo: any = "";
  MemberNo: any ="";
  BuyRate: any = 0;
  BaseCurrency: any;
  myCurrency: any;  
  
  CurrencyRateList: any;
  MemberShareList: any;
  MemberList: any;
  CurrencyList: any;
  Productlist: any;
  BankList: any;
  BankBranchesList: any;
  PayModeList: any;
  BaseCurrencyId: any;
  public loading: boolean = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  Delete: any = false;
  InsertDelete = true;
  ChargeList: any;
  //DefaultPaymentList: any;
 // DefaultCurrencyLists: any;
  MemberId: any;
  IsAddmember: any;
  memberIdd: any;
  isDisconnected: boolean = false;
  UsingMulticurency: boolean=false;// we will need a global setting to take care of this variable

  constructor(public service: AccountTransactionService,
    private pfService: PowerFinancialService,
    public loanservice: LoanApplicationService,
    public dialog: MatDialog,
    private router: Router,
    private currentRoute: ActivatedRoute) { 
      this.isSuccess = false;
    this.errDescription = "";
    }

    ngOnInit(): void {
      let TransactionId = this.currentRoute.snapshot.paramMap.get("id");
      //console.log(TransactionId);
      if (TransactionId == null) this.resetForm();
      else {
        this.service
          .GetDepositTransaction(parseInt(TransactionId))
          .subscribe((Response) => {
            this.service.DepositForm = Response.DepositTransaction;
            this.service.TransactionCharges = Response.accountCharge;
            this.MemberId = Response.AccountTransaction.MemberId;
            this.pfService
              .getMember(parseInt(this.MemberId))
              .subscribe((Response) => {
                this.MemberId = Response.member.id;
                this.FullName = Response.member.FullName;
                this.IdNo = Response.member.IdNo;              
                this.service.DepositForm.PaidBy=this.FullName;
              });
          });
      }
      this.RefreshMemberList();
      this.refreshCurrList();
      this.refreshProductList();
      this.refreshBankList();
      this.refreshBankBranchesList();
      this.refreshPaymentModesList();
      this.refreshCurrRateList();
      this.refreshChargeList();
     // this.GetDefaultPaymentModes();
    //  this.getMainCurrency();
    //  this.refreshMemberShareList();
      this.service.DepositForm.ValueDate = new Date()
        .toISOString()
        .split("T")[0];
      this.service.DepositForm.TransDate = new Date()
        .toISOString()
        .split("T")[0];
      /*this.service.DepositForm.CreatedOn = new Date()
        .toISOString()
        .split("T")[0];
      this.service.DepositForm.ModifiedOn = new Date()
        .toISOString()
        .split("T")[0];*/
    }
    successmsg() {
      Swal.fire("Process Succeeded");
    }
    Reload() {
      window.location.reload();
    }
    resetForm(form?: NgForm) {
      if (form != null) form.resetForm();
      this.service.DepositForm = {
        TransactionId:  null,
        SerialId:  0,
        MemberId: 0,        
        MemberNo:'',
        AccountNumber:'',
        IdNo: '',
        MembershareId:  0,
        Description:  '',
        TransDate:  new Date(),
        ValueDate:  new Date(),
        BaseCurrencyId:  0,
        CurrencyId:  0,
        ExchangeRate:  0,
        Amount:  0,
        LocalCurrencyAmount:  0,
        DocumentNo:  '',
        ModeofPaymentID:  0,
        BranchId:  0,
        TellerId:  0,
        SourceAccountId:  0,
        IsCharge:  0,
        ChargeId:  0,
        IsDeleted:  0,
        IsReversed:  0,
        IsReversal:  0,
        TrxBranchId:  0,
        ExtBranchId:  0,
        TransactionType:  0,
        CreatedBy:  '',
        Commission: false,
        AmountCharge: 0,
        BalanceAmount: 0,        
        Remarks: '',
        PaidBy: '',
      };
      this.service.TransactionCharges = [];
    }
    RefreshMemberList() {
      this.pfService.getAllMembers().subscribe((Response) => {        
        this.MemberList = Response;
      });
    }
    AddorEditCharge(AccountTransactionIndex, TransactionId) {
      /*
      const dialogConfig= new MatDialogConfig();
      dialogConfig.autoFocus=true;
      dialogConfig.disableClose=true;
      dialogConfig.width="50%";
      dialogConfig.data={AccountTransactionIndex,TransactionId,Amount:this.service.DepositForm.LocalCurrencyAmount};
      this.dialog.open(TransactionChargesComponent,dialogConfig).afterClosed().subscribe(Response =>{
        this.updateTotalCharges();
        this.updateBalanceAmount();
      })  */
    }
    onDeleteCharge(
      TransactionChargesId: number,
      i: number,
      TransactionId: number
    ) {
     // this.service.DepositForm.DeleteTransactionsIds +=
      //  TransactionChargesId + ",";
      this.service.TransactionCharges.splice(i, 1);
      this.updateTotalCharges();
      this.updateBalanceAmount();
    }
    createDescription(ctrl){      
      this.service.DepositForm.Description=this.PayModeList[ctrl.selectedIndex].Description + " from " + this.FullName;   
    }
    updateMemberDetails(ctrl) {
     // if (ctrl.selectedIndex == 0) {
        this.IdNo = "";
        this.FullName = "";
        //this.service.DepositForm.PaidBy ="";
     // } else {
        this.IdNo = this.MemberList[ctrl.selectedIndex - 1].IdNo;
        this.FullName = this.MemberList[ctrl.selectedIndex - 1].FullName;
        this.MemberId= this.MemberList[ctrl.selectedIndex - 1].MemberId;        
        this.service.DepositForm.PaidBy=this.FullName;
       // this.service.DepositForm.PaidBy =
         /// this.MemberList[ctrl.selectedIndex - 1].FullName;
          this.service.DepositForm.IdNo =this.IdNo;          
          this.refreshMemberShareList(this.MemberId);
      //}
    }
    updateTotalCharges() {
      /*this.service.DepositForm.AmountCharge =
        this.service.TransactionCharges.reduce((prev, curr) => {
          return prev + curr.Total;
        }, 0);
      this.service.DepositForm.AmountCharge = parseFloat(
        this.service.DepositForm.AmountCharge.toFixed(2)
      );
      this.updateBalanceAmount();*/
    }
    updateBalanceAmount() {
      /*this.service.DepositForm.BalanceAmount = parseFloat(
        (
          this.service.DepositForm.Amount *
            this.service.DepositForm.ExchangeRate -
          this.service.DepositForm.AmountCharge
        ).toFixed(2)
      );*/
      this.service.DepositForm.LocalCurrencyAmount = parseFloat(
        (
          this.service.DepositForm.Amount *
          this.service.DepositForm.ExchangeRate
        ).toFixed(2)
      );
    }
    refreshCurrList() {
      this.pfService.getAllCurrency().subscribe((Response) => {
        this.CurrencyList = Response;
  
        this.service.DepositForm.CurrencyId=0;
        
        var myList=this.CurrencyList as [];
        for(var i=0;i<myList.length;i++){
           var obj=myList[i];

           if(obj['IsMainCurrency']==true)
            {
              this.service.DepositForm.CurrencyId=obj['CurrencyId'];    
              this.service.DepositForm.ExchangeRate = 1;
              this.service.DepositForm.BaseCurrencyId = this.service.DepositForm.CurrencyId;              
              break;
            }         
        }
  
      });
    }
    
    refreshCurrRateList() {
      this.pfService.getAllCurrencyRate().subscribe((Response) => {
        this.CurrencyRateList = Response;
      });
    }
  
    updateCurrencyDetails(ctrl) {
      /*if (ctrl.selectedIndex == 0) {
        this.service.DepositForm.CurrencySymbol = "";
      } else {
        this.service.DepositForm.CurrencySymbol =
          this.CurrencyList[ctrl.selectedIndex - 1].CurrencySymbol;
      }
      for (var items of this.DefaultCurrencyList) {
        this.service.DepositForm.ExchangeRate = items.ExchangeRate;
        this.service.DepositForm.BaseCurrencyId = items.BaseCurrencyId;
      }*/
    }
    refreshMemberShareList(MemberId: number) {
      //debugger;
      this.pfService.GetMemberShareById(MemberId).subscribe((Response) => {
        this.MemberShareList = Response;
        console.log(Response);
        debugger;
      });
    }
    refreshProductList() {
      this.pfService.GetAllProduct().subscribe((Response) => {
        this.Productlist = Response;
      });
    }
    refreshBankBranchesList() {
      this.pfService.getAllBranches().subscribe((Response) => {
        this.BankBranchesList = Response;
        var myList=this.BankBranchesList as [];
        for(var i=0;i<myList.length;i++){
           var obj=myList[i];

           if(obj['IsDefault']==true)
            {
              this.service.DepositForm.BranchId=obj['BranchId'];  
              this.service.DepositForm.Description=obj['Name'];
              if(this.FullName!="") this.service.DepositForm.Description=obj['Name'] + " from " + this.FullName;
              break;
            }         
        }
      });
    }
    refreshBankList() {
      this.pfService.getAllBank().subscribe((Response) => {
        this.BankList = Response;
      });
    }
    refreshChargeList() {
      this.service.getAllTransactionCharges().subscribe((Response) => {
        this.ChargeList = Response;
      });
    }
    refreshPaymentModesList() {
      this.service.GetAllPaymentModes().subscribe((Response) => {
        this.PayModeList = Response;

        var myList=this.PayModeList as [];
        for(var i=0;i<myList.length;i++){
           var obj=myList[i];

           if(obj['IsDefault']==true)
            {
              this.service.DepositForm.ModeofPaymentID=obj['PaymentModeId'];  
              this.service.DepositForm.Description=obj['Name'];
              if(this.FullName!="") this.service.DepositForm.Description=obj['Name'] + " from " + this.FullName;
              break;
            }         
        }

      });
    }
  
    /*onSubmit(form: NgForm){

    
      
    }*/
    onSubmit(form: NgForm) {
      if (this.service.DepositForm.Commission == true) {
        if (this.service.TransactionCharges.length == 0) {
          if (confirm("Please add Charges this transaction!!!!")) return;
        } else {
          if (this.formValidation()) {
            this.loading = true;
            this.service.PosttblTransaction().subscribe((Response) => {
              console.log(Response);
              this.resetForm();
              this.successmsg();
              this.loading = false;
              this.FullName = "";
              this.IdNo = "";
              this.router.navigate(["/view-transaction"]);
              
            });
          }
        }
      } else {
        if (this.formValidation()) {
          this.loading = true;
          this.service.PosttblTransaction().subscribe((Response) => {
            this.resetForm();
            this.successmsg();
            this.loading = false;
            this.FullName = "";
            this.IdNo = "";
            //this.router.navigate(["/transaction"]);
          });
        }
      }
    }
    convertCurrency(CurrencyId) {
            
      if(CurrencyId==this.service.DepositForm.BaseCurrencyId){
        this.service.DepositForm.ExchangeRate = 1;
        this.service.DepositForm.LocalCurrencyAmount = parseFloat(
          (
            this.service.DepositForm.Amount *1             
          ).toFixed(2)
        );
      }
      else
      {
      this.service
        .GetExchangeRateByCurrencyId(CurrencyId)
        .subscribe((response) => {
          console.log(response);
          this.CurrencyRateList = response;
          this.service.DepositForm.ExchangeRate =
            this.CurrencyRateList["BuyRate"];
          this.service.DepositForm.BaseCurrencyId =
            this.CurrencyRateList["BaseCurrencyId"];
         /* this.service.DepositForm.BalanceAmount = parseFloat(
            (
              this.service.DepositForm.Amount *
                this.service.DepositForm.ExchangeRate -
              this.service.DepositForm.AmountCharge
            ).toFixed(2)
          );*/
          this.service.DepositForm.LocalCurrencyAmount = parseFloat(
            (
              this.service.DepositForm.Amount *
              this.service.DepositForm.ExchangeRate
            ).toFixed(2)
          );
        });
      }
    }
    formValidation() {
      this.isValid = true;
     // if (this.service.DepositForm.MemberNo == 0) this.isValid = false;
     // if (this.service.DepositForm.ProductId == 0) this.isValid = false;
      if (this.service.DepositForm.CurrencyId == 0) this.isValid = false;
      if (this.service.DepositForm.Amount <= 0) this.isValid = false;
      if (this.service.DepositForm.Description=="") this.isValid = false;
      return this.isValid;
    }
  
    /*GetDefaultPaymentModes() {
      this.service.GetDefaultPaymentModes().subscribe((Response) => {
        this.DefaultPaymentList = Response;
      });
    }*/

   /* getMainCurrency() {
      this.service.getMainCurrency().subscribe((Response) => {
        this.DefaultCurrencyLists = Response;
      });
    }*/
    
    MemberAccounts(memberId) {
      this.service
        .GetMemberSharedByMemberId(
          memberId
        )
        .subscribe((Response) => {
          this.MemberShareList = Response;
          for (var items of this.MemberShareList) {
            this.service.DepositForm.MembershareId = items.MemberShareId;
          }
        });
    }
    /*ProductDetails(ProductId) {
      this.service
        .GetAccountNumberByProductId(
          ProductId,
          this.service.DepositForm.MemberNo
        )
        .subscribe((Response) => {
          this.MemberShareList = Response;
          for (var items of this.MemberShareList) {
            this.service.DepositForm.AccountNumber = items.AccountNumber;
          }
        });
    }*/
    //
    openForSeachMember(ViewMembereIndex) {
      //console.log("Opening dialog..");
      //debugger;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.data = { ViewMembereIndex };
      this.dialog
        .open(SearchMemberComponent, dialogConfig)
        .afterClosed()
        .subscribe((Response) => {
          this.IsAddmember = localStorage.getItem("AddMember");
          if (
            this.IsAddmember == "true" &&
            localStorage.getItem("MemberId") != ""
          ) {
            this.memberIdd = parseInt(localStorage.getItem("MemberId"));
            this.pfService.getMember(parseInt(this.memberIdd)).subscribe(
              (Response) => {                

                this.service.DepositForm.MemberId = this.memberIdd;
                this.FullName = Response.member.FullName;
                this.service.DepositForm.IdNo = Response.member.IdNo;                                                              
                this.service.DepositForm.DocumentNo=Response.DocumentNo;                                                                                                
                this.service.DepositForm.PaidBy=this.FullName;
                //console.log(this.memberIdd);
                this.refreshMemberShareList(this.memberIdd);                              
                               
                
                // this.IdNo = Response.IdNo;
               // this.service.DepositForm.MemberNo = this.memberIdd;
  
                // this.FullName = Response.member.FullName;
  
                // this.IdNo = Response.member.IdNo;
  
                localStorage.setItem("MemberId", "");
              },
              (error) => {
                //Clear
                //Hebu test sasa I hope iko sawa
                localStorage.setItem("MemberId", "");
              }
            );
          }
        });
    }
  }
  