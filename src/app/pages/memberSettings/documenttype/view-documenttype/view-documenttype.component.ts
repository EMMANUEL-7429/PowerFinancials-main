import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-documenttype',
  templateUrl: './view-documenttype.component.html',
  styleUrls: ['./view-documenttype.component.scss']
})
export class ViewDocumenttypeComponent implements OnInit {
  public DocumentTypeList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  loanResp:any;
  loanAppResp:any;
  isSuccess:any;
  errDescription:any;
  constructor( private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshDocumentTypeList();
  }
  refreshDocumentTypeList(){
    this.isNodeLoading=true;
    this.service.getAllDocumentTypes().subscribe((Response)=>{
      this.DocumentTypeList=Response;      
      this.temp=true;
      this.isNodeLoading=false;
      
    });
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  openForEditDocumentType(DocumentTypeId :number){
    this.router.navigate(['/document-type/edit/'+DocumentTypeId]);

  }
  DeleteDocumentType(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteBank(id).then((Response) =>{
      this.loanAppResp = Response;
      this.isSuccess = this.loanAppResp['isSuccess'];
      this.errDescription = this.loanAppResp['errorDescription'];
      if (this.isSuccess==false && this.errDescription!=''){
        confirm(this.errDescription);          
        return;
       }
      this.refreshDocumentTypeList();
      this.successmsg();
         }
      )}

}
