import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  isNodeLoading: boolean= false;
  public Productlist: Object;
  public temp: Object=false;
  isDisconnected: boolean = false;
  isValid:boolean=true;
  constructor( private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  Reload(){
    window.location.reload();
  } 
  refreshList(){
    this.isNodeLoading=true;
    this.service.GetAllProduct().subscribe((Response)=>{
      this.Productlist=Response;
      this.temp=true;
      this.isNodeLoading=false;
    })
  }
  successmsg() {
    Swal.fire('Process Succeeded')
  }
  UpdateProject(ProductId:number){
    this.router.navigate(['/products/edit/'+ProductId]);
  }
  OnDeleteProduct(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteProduct(id).subscribe((Response) =>{
      this.refreshList();
     this.successmsg();
         }
      )

  }
}
