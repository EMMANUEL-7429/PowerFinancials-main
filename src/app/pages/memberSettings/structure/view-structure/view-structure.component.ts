import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-structure',
  templateUrl: './view-structure.component.html',
  styleUrls: ['./view-structure.component.scss']
})
export class ViewStructureComponent implements OnInit {
  isNodeLoading: boolean= false;
  public structurelist: Object;
  public temp: Object=false;
  

  constructor(private service:PowerFinancialService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    localStorage.setItem('AddStructure', 'false');
    this.refreshList();
  
  }
  refreshList(){
    this.isNodeLoading=true;
    this.service.GetAllStructure().subscribe((Response)=>{
      this.structurelist=Response;
      this.temp=true;
      this.isNodeLoading=false;
    })

  }
  
  PassStructureId(StructureId:number){
    this.router.navigate(['/structure/edit/'+StructureId]);
  }
   AddPassStructure(id : number,name:string){
    localStorage.setItem('StructId', id.toString());
    localStorage.setItem('StructName', name);
    localStorage.setItem('AddStructure', 'true');
    this.router.navigate(['/structure']);
  }
  onDeleteStructureId(id:number){
    if(confirm("Are you sure you want to delete this record?"))
    this.service.DeleteStructure(id).subscribe((Response) =>{
      this.toastr.warning('Process Succeeded', 'Power Financial System');
         this.refreshList();
         }
      )}

  }


