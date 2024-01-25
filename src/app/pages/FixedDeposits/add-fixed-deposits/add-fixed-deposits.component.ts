import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FixedDepositsService } from 'src/app/shared/service/fixed-deposits.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import { SearchMemberComponent } from '../../memberAccounts/search-member/search-member.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AccountTransactionService } from 'src/app/shared/service/account-transaction.service';
//import { number } from 'echarts';


@Component({
  selector: 'app-add-fixed-deposits',
  templateUrl: './add-fixed-deposits.component.html',
  styleUrls: ['./add-fixed-deposits.component.scss']
})
export class AddFixedDepositsComponent implements OnInit {
  FixedDepositId: any;
  ApplicationDate:any=new Date();
  MemberId:any='';
  IdNo:any;  
  MemberShareList: any;
  FullName:any;
  TrxBranchId: any;
  EtxBranchId :any;
  ProductId : any;
  Description :any="";
  MemberShareId :any;
  BankId : any;
  AmountToFix: any; 
  ModeOfPaymentID : any;
  NoOfDays : any;
  InterestRate :any;
  InterestAmount :any;
  AmountOnMaturity :any;
  FixedDepositGLAccount:any; 
  WithHoldTax :any;
  WithHoldTaxAmount :any;
  CurrencyId :any;
  LocalCurrencyAmount :any;
  Status :any;
  ActionOnMaturity :any;
  MaturityDate: any=new Date(); 
  ChequeNumber : any;
  ProductOnMaturity :any;
  MatureEveryEndOfMonth:boolean=false;
  ClosedBy : any="Admin";
  ClosedOn :any=new Date();
  CreatedOn: any;
  CreatedBy: any="Admin";
  ModifiedBy :any="Admin";
  ModifiedOn :any=new Date();  
  MemberList: any;
  BankList: any;  
  FixedDepositList:any;
  CurrencyList: any;
  loanResp: any;
  loanAppResp: any;
  isSuccess :any;
  errDescription :any;
  Delete:any=false;


  IsAddmember: any;
  searchText:any;
  ShowForm:any=true;
  SearchName:any="";
  memberIdd: any;
  isValid: boolean = true;
  public loading: boolean = false;
  isDisconnected: boolean = false;

  constructor(public fdservice: AccountTransactionService,
    public Fdservice: FixedDepositsService,
    private pfService: PowerFinancialService,
    public dialog:MatDialog,
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {this.isSuccess = false;
      this.errDescription = ""; }

  ngOnInit(): void {
    let FixedDepositId = this.currentRoute.snapshot.paramMap.get("id");
    if (FixedDepositId == null) 
    {
      console.log('Resetting FD from');
      this.resetForm();
    }
    else 
    {
      console.log('Found somehting and hence trying to load FD from')
      this.Fdservice.getFixedDeposits(parseInt(FixedDepositId)).subscribe((Response) => {
        
        console.log(Response);
        console.log('Displaying conent..');
        this.FixedDepositId = Response.FixedDeposits.FixedDepositId;//our .after response should rhyme with the object being returned from WebAPI..
        this.ApplicationDate = Response.FixedDeposits.ApplicationDate
        this.MemberId= Response.FixedDeposits.MemberId;
        this.IdNo= Response.FixedDeposits.IdNo;        
        this.TrxBranchId = Response.FixedDeposits.TrxBranchId;
        this.EtxBranchId=Response.FixedDeposits.EtxBranchId;
        this.ProductId=Response.FixedDeposits.ProductId;
        this.Description=Response.FixedDeposits.Description;
        this.MemberShareId=Response.FixedDeposits.MemberShareId;
        this.BankId=Response.FixedDeposits.BankId;
        this.AmountToFix=Response.FixedDeposits.AmountToFix;
        this.ModeOfPaymentID=Response.FixedDeposits.ModeOfPaymentID;
        this.NoOfDays=Response.FixedDeposits.NoOfDays;
        this.InterestRate=Response.FixedDeposits.InterestRate;
        this.InterestAmount=Response.FixedDeposits.InterestAmount;
        this.AmountOnMaturity=Response.FixedDeposits.AmountOnMaturity;
        this.FixedDepositGLAccount=Response.FixedDeposits.FixedDepositGLAccount;
        this.WithHoldTax=Response.FixedDeposits.WithHoldTax;
        this.WithHoldTaxAmount=Response.FixedDeposits.WithHoldTaxAmount;
        this.CurrencyId =Response.FixedDeposits.CurrencyId;
        this.LocalCurrencyAmount=Response.FixedDeposits.LocalCurrencyAmount;
        this.Status=Response.FixedDeposits.Status;
        this.ActionOnMaturity=Response.FixedDeposits.ActionOnMaturity;
        this.MaturityDate=Response.FixedDeposits.MaturityDate;
        this.ChequeNumber=Response.FixedDeposits.ChequeNumber;
        this.ProductOnMaturity=Response.FixedDeposits.ProductOnMaturity;
        this.MatureEveryEndOfMonth=Response.FixedDeposits.MatureEveryEndOfMonth;
        this.ClosedBy=Response.FixedDeposits.ClosedBy;
        this.ClosedOn=Response.FixedDeposits.ClosedOn;
        this.CreatedBy=Response.FixedDeposits.CreatedBy;              
        });
    
    }
      this.RefreshMemberList();
      this.refreshBankList(); 
      this.refreshCurrList();    
      this.ApplicationDate = new Date().toISOString().split('T')[0];
      this.MaturityDate = new Date().toISOString().split('T')[0];
      this.ClosedOn=new Date().toISOString().split('T')[0];
      
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(   
    ApplicationDate,
    MemberId, 
    IdNo,       
    TrxBranchId,
    EtxBranchId,
    ProductId,
    Description,
    MemberShareId,
    BankId,
    AmountToFix,
    ModeOfPaymentID,
    NoOfDays,
    InterestRate,
    InterestAmount,
    AmountOnMaturity,
    FixedDepositGLAccount,
    WithHoldTax,
    WithHoldTaxAmount,
    CurrencyId,
    LocalCurrencyAmount,
    Status,
    ActionOnMaturity,
    MaturityDate,
    ChequeNumber,
    ProductOnMaturity,
    MatureEveryEndOfMonth,
    ClosedBy,
    ClosedOn,
    CreatedBy    
  ) 
  {    
    if (this.formValidation()) {       
      this.loading = true;                  
      //console.log("shareid",MemberShareId)
      //console.log("bankid",BankId)
      if(!ProductId){
        alert('Product has not been selected');//catch the possible error before calling the service
        return;
      }
      Description="Fixed Deposit";

      let FixedDepositId = this.currentRoute.snapshot.paramMap.get("id")
      if (FixedDepositId == null)
        this.Fdservice.AddFixedDeposit(
          0,
            ApplicationDate,
            MemberId, 
            IdNo,              
            TrxBranchId,
            EtxBranchId,
            ProductId,
            Description,
            MemberShareId,
            BankId,
            AmountToFix,
            ModeOfPaymentID,
            NoOfDays,
            InterestRate,
            InterestAmount,
            AmountOnMaturity,
            FixedDepositGLAccount,
            WithHoldTax,
            WithHoldTaxAmount,
            CurrencyId,
            LocalCurrencyAmount,
            Status, 
            ActionOnMaturity,
            MaturityDate,
            ChequeNumber,
            ProductOnMaturity,
            MatureEveryEndOfMonth,
            ClosedBy,
            this.ClosedOn,
            CreatedBy,
            this.CreatedOn                                                   
          )
          .subscribe((Response) => {console.log(Response);
              //debugger;
                this.successmsg( );
                this.resetForm();
                this.loading = false;
            },
          );          
      else {
        this.Fdservice
          .UpdateFixedDeposit(
    FixedDepositId,
    ApplicationDate,
    MemberId, 
    IdNo,    
    TrxBranchId,
    EtxBranchId,
    ProductId,
    Description,
    MemberShareId,
    BankId,
    AmountToFix,
    ModeOfPaymentID,
    NoOfDays,
    InterestRate,
    InterestAmount,
    AmountOnMaturity,
    FixedDepositGLAccount,
    WithHoldTax,
    WithHoldTaxAmount,
    CurrencyId,
    LocalCurrencyAmount,
    Status,
    ActionOnMaturity,
    MaturityDate,
    ChequeNumber,
    ProductOnMaturity,
    MatureEveryEndOfMonth,
    ClosedBy,
    ClosedOn,
    this.ModifiedBy,
    false             
               
          )
          .subscribe(
            (Response) =>  {console.log(Response) 
                this.successmsg();
                this.resetForm();
                this.loading = false;
                //this.router.navigate(["/ViewFixedDeposits"]);
            },
          );
      }
    }
  }
  updateMemberDetails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.IdNo = "";
      this.FullName = "";
    } else {
      this.IdNo = this.MemberList[ctrl.selectedIndex - 1].IdNo;
      this.FullName = this.MemberList[ctrl.selectedIndex - 1].FullName;    
        this.MemberList[ctrl.selectedIndex - 1].FullName;

        this.IdNo =this.IdNo;          
          
    }
  }

  udateLocalCurrenyAmount(){
    this.LocalCurrencyAmount = parseFloat((
      this.AmountToFix));
  }
  
  updateInterestAmount(){
    this.InterestAmount=parseFloat(((((this.InterestRate/360)*this.NoOfDays) * this.AmountToFix)/100).toFixed())
  }
  updateWithHoldTaxAmount(){
    this.WithHoldTaxAmount=parseFloat(((this.WithHoldTax/100)*this.InterestAmount).toFixed())
  }
  updateAmountOnMaturity(){
    this.AmountOnMaturity= (parseFloat((((this.AmountToFix)*-1) - ((parseFloat(((((this.InterestRate/360)*this.NoOfDays) * this.AmountToFix)/100).toFixed()))-(parseFloat(((this.WithHoldTax/100)*this.InterestAmount).toFixed())))).toFixed())*-1) 
  }
  updateMaturityDate(){
    this.MaturityDate=(new Date(new Date(this.ApplicationDate).getTime() +(parseInt(this.NoOfDays)*24*60*60*1000)).toISOString().split('T')[0])
  }
    
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.FixedDepositId=0,
    this.ApplicationDate= new Date(),
    this.MemberId=0, 
    this.FullName='';
    this.IdNo='',      
    this.TrxBranchId= 0,
    this.EtxBranchId=0,
    this.ProductId=0,
    this.Description='',
    this.MemberShareId=0,
    this.BankId= '',
    this.AmountToFix=0, 
    this.ModeOfPaymentID='',
    this.NoOfDays=0,
    this.InterestRate=0,
    this.InterestAmount=0,
    this.AmountOnMaturity=0,
    this.FixedDepositGLAccount= '', 
    this.WithHoldTax =0,
    this.WithHoldTaxAmount =0,
    this.CurrencyId ='',
    this.LocalCurrencyAmount =0,
    this.Status =0,
    this.ActionOnMaturity=0,
    this.MaturityDate=new Date(), 
    this.ChequeNumber =0,
    this.ProductOnMaturity =0,
    this.MatureEveryEndOfMonth =false,
    this.ClosedBy = 'Admin',
    this.ClosedOn =new Date(),
    this.CreatedBy='Admin' 
  }
  RefreshMemberList() {
    this.pfService.getAllMembers().subscribe((Response) => {
      this.MemberList = Response;
    });
  }
  refreshBankList() {
    this.pfService.getAllBank().subscribe((Response) => {
      this.BankList = Response;
    });
  } 
  refreshCurrList(){
    this.pfService.getAllCurrency().subscribe((Response) => {
      this.CurrencyList = Response;

      this.CurrencyId=0;
      
      var myList=this.CurrencyList as [];
      for(var i=0;i<myList.length;i++){
         var obj=myList[i];
                 
      }

    });
  }
  
  formValidation() {
    this.isValid = true;
    if (this.MemberId == 0) this.isValid = false;
    if(this.AmountToFix <=0) this.isValid=false;    
    if (this.IdNo=="") this.isValid = false;
    
    return this.isValid;

}
OnDelete(id: number) {
  let FixedDepositId = this.currentRoute.snapshot.paramMap.get("id");
  if (confirm("Are you sure you want to delete this record?"))
    this.Fdservice
      .DeleteFixedDeposits(id)
      .subscribe((Response) => {
        this.Fdservice
          .GetAllFixedDeposits()
          .subscribe((Response) => {
            this.FixedDepositList = Response;
          });
        this.successmsg();
      });
}
refreshMemberShareList(MemberId: number) {
  //debugger;
  this.Fdservice.GetMemberShareById(MemberId).subscribe((Response) => {
    this.MemberShareList = Response;
    console.log(Response);
    //debugger;
  });
}

onsearchTextEntered(searchValue:any){
  this.searchText=searchValue;
  console.log(this.searchText)
  }

openForSeachMember(ViewMembereIndex) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width = "60%";
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
        this.Fdservice.getMember(parseInt(this.memberIdd)).subscribe(
          (Response) => {
            //console.log(Response);
            this.MemberId = this.memberIdd;
            this.FullName = Response.member.FullName;              
            this.IdNo = Response.member.IdNo;
            //console.log(this.IdNo);
            // this.IdNo = Response.IdNo;
            //this.fdservice.FixedDepositForm.MemberNo = this.memberIdd;

             //console.log(this.memberIdd);
             this.refreshMemberShareList(this.memberIdd); 
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
