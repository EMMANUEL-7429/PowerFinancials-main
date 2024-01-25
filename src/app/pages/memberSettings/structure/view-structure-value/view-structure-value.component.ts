import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';

@Component({
  selector: 'app-view-structure-value',
  templateUrl: './view-structure-value.component.html',
  styleUrls: ['./view-structure-value.component.scss']
})
export class ViewStructureValueComponent implements OnInit {
  public  StructureValueList: Object;//change to Object if using data tables
  public temp: Object=false;
  StructureList:any;
  isNodeLoading: boolean= false;
  StructureValList:any

  constructor(public service : PowerFinancialService,
    private router:Router,
    private toastr: ToastrService) { 
      this.service.GetAllStructure().subscribe(res=>{
        this.StructureList=res as [];
        
      });
      this.service.GetAllStructureValues().subscribe(res=>{
        this.StructureValList=res as [];
        
      });
    }
    
  ngOnInit(): void {
  
    this.getData();
    this.StructureValueList=[];
    localStorage.setItem('AddStructureValue', 'false');
    localStorage.setItem('StructureValueName', '');
    
  }
  getData(){
    this.isNodeLoading=true
    this.service.GetAllStructureValues().subscribe(Response => {
      this.StructureValueList = Response;
      this.temp = true;
      this.isNodeLoading=false;
    })
  }
  onUpdate(id : number){
    this.router.navigate(['/structure-value/edit/'+id]);
   
  }

  onDelete(id : number){
    if(confirm('Are you sure yu want to delete this record?')){
      this.service.DeleteStructureValue(id).subscribe(res=>{
        this.getData();
        this.toastr.warning('Process Succeeded', 'Power Financial System');
        });
    }
  }
  addStructureValue(){
    this.router.navigate(['/Parent-structure-value']);
  }
  getStructure(id: any) : string {
    var name: string;
    if(this.StructureList){
    if(id>0){
    this.StructureList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["StructureId"]==id){
        name=obj["Description"];
        return true;
      }
    })}}
    return name;
  }
  
  getparent(id: any) : string {
    var name: string;
    if(this.StructureValList){
    if(id>0){
    this.StructureValList.some((obj)=>{
      //var dim=obj as Element;
      if(obj["StructureValueId"]==id){
        name=obj["Name"];
        return true;
      }
    })}}
    return name;
  }
  onAddStructure(id : number, name : string,structureID:number){
    localStorage.setItem('StructureValueId', id.toString());
    localStorage.setItem('StructureId', structureID.toString());
    localStorage.setItem('StructureValueName', name);
   // console.log(localStorage.setItem('StructureValueId', id.toString()));
    //console.log(localStorage.setItem('StructureValueName', name));
    localStorage.setItem('AddStructureValue', 'true');
    this.router.navigate(['/structure-value']);
  }




}