import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-security-question',
  templateUrl: './view-security-question.component.html',
  styleUrls: ['./view-security-question.component.scss']
})
export class ViewSecurityQuestionComponent implements OnInit {
  public genderList: Object;
  public temp: Object=false;
  isNodeLoading: boolean= false;
  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.getAllGenders().subscribe((Response)=>{
      this.genderList=Response;
      this.temp=true;
      this.isNodeLoading=false;
      
    });

  }
  openForEditGender(GenderId:number){
    this.router.navigate(['/security-question/edit/'+GenderId]);   
  }
  OnDeleteGender(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteGender(id).then((Response) =>{
      this.refreshList();
      this.toastr.warning('Process Succeeded', 'Power Financial System');
         }
      )}

  }

