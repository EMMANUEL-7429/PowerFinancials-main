import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member-documents',
  templateUrl: './add-member-documents.component.html',
  styleUrls: ['./add-member-documents.component.scss']
})
export class AddMemberDocumentsComponent implements OnInit {
  imageUrl:string="/assets/img/finance1.jpg";
  fileToUpload:File=null;
  MemberNo:any=0;
  FullName:any='';
  IdNo:any='';
  MemberId:any=0;
  MemberList:any;
  IsAddmember:any;
  memberIdd:any;
  DocumentList:any;
  isDisconnected: boolean = false;
  isValid: boolean = true;
  memberList:any;
  DocumentTypeId:any;
  public loading: boolean = false;
    constructor( public service:PowerFinancialService,public dialog:MatDialog) { }
  
    ngOnInit() {
      this.refreshMemberList();
      this. refreshDocumentTypeList();
    }
    handleFileInput(file:FileList){
      this.fileToUpload=file.item(0);
      //show image preview
       var reader=new FileReader();
       reader.onload=(event:any)=>{
         this.imageUrl=event.target.result;
       }
       reader.readAsDataURL(this.fileToUpload);
  
    }
    refreshMemberList(){
      this.service.getAllMembers().subscribe((Response)=>{
        this.memberList=Response; 
        console.log(Response)    
      });
    }
    successmsg() {
      Swal.fire("Process Succeeded");
    }
    Reload() {
      window.location.reload();
    }
    onSubmit(Caption,Image){
      this.loading=true;
      this.service.UploadFile(Caption.value,this.fileToUpload).subscribe(
        Response =>{
           console.log(Response);
           Caption.value="";         
           Image.value=null;
           this.imageUrl="../assets/images/upload.png"
           this.successmsg(); 
           this.DocumentTypeId=0; 
           this.MemberId=0;
           this.FullName="";
           this.IdNo="";
           this.loading=false;        
        }
      )
  
    }
  
    refreshDocumentTypeList(){
      this.service.getAllDocumentTypes().subscribe(Response=>{
        this.DocumentList=Response;
      })
    }
    openForSeachMember(ViewMembereIndex){/*
    
      const dialogConfig= new MatDialogConfig();
      dialogConfig.autoFocus=true;
      dialogConfig.disableClose=true;
      dialogConfig.data={ViewMembereIndex};
      this.dialog.open(ViewMemberComponent,dialogConfig).afterClosed().subscribe(Response =>{
        this.IsAddmember = localStorage.getItem('AddMember');
      if(this.IsAddmember == 'true' && localStorage.getItem('MemberId')!=""){
        this.memberIdd= parseInt(localStorage.getItem('MemberId'));
        this.service.getMember(parseInt(this.memberIdd)).subscribe(Response =>{
          this.MemberId= this.memberIdd;
          this.FullName=Response.member.FullName;
          this.IdNo=Response.member.IdNo;
          localStorage.setItem('MemberId', "");
        },(error)=>{
          //Clear
          //Hebu test sasa I hope iko sawa
          localStorage.setItem('MemberId', "");
  
        });
          
      }
        
         })
     
      
        */}
          
  getMemberDetails(ctrl){
    if(ctrl.selectedIndex==0){ 
      this.FullName='';
     this.IdNo='';
    }
    else{
      this.FullName=this.memberList[ctrl.selectedIndex-1].FullName;
      this.IdNo=this.memberList[ctrl.selectedIndex-1].IdNo;
   
    }
  }
}
