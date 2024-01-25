import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
// import { SystemuserService } from '../services/systemuser.service'
// import { Systemuser } from '../Models/systemusers.model';
import {  ToastrService } from 'ngx-toastr';
import { Systemuser } from '../../Models/systemuser.model';
import { SystemuserService } from 'src/app/shared/service/system-user.service';
@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {
  myForm: FormGroup;
  userData:Systemuser[]=[]
  formData:Systemuser = {
    id: 0,
    PwdMinAge: 0,
    PwdMaxAge: 0,
    PwdMinLength: 0,
    PwdMaxLength: 0,
    PwdComplex: false,
    PwdHistory: 0,
    LoginAttempts: 0,
    UseMultiFactor: false,
    OTPExpiry: false,
    CreatedOn: new Date,
    CreatedBy: '',
    ModifiedOn: new Date,
    ModifiedBy: ''
  };
  isUpdate:boolean=false;
  ngOnInit() {
    this.getAlldata();

  }
  getAlldata() {
    this.SystemuserService.getdata().subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      if (this.userData.length > 0) {
        this.loadDataForUpdate(this.userData[0]);
      }
    });
  }

    

  savedData: any[] = [];
  selectedRowData: any;
  editedRowIndex: number | null = null; // Track the index of the row being edited

  isEditMode = false;
  constructor(private SystemuserService:SystemuserService,private fb:FormBuilder,private toastr:ToastrService)
{
  this.myForm = this.fb.group({
    PwdMinAge: [''],
    PwdMaxAge: [''],
    PwdMinLength: [''],
    PwdMaxLength: [''],
    PwdComplex: [false],
    PwdHistory: [''],
    LoginAttempts: [''],
    UseMultiFactor: [false],
    OTPExpiry: [false],
    CreatedBy: [''],
    ModifiedBy: [''],
  });
}


// getAlldata(){
//   this.SystemuserService.getdata().subscribe(res => {
//     this.userData[0]=res[0];
//     console.log(this.userData)
//   })
// }
postData(){
  console.log(this.formData)
  this.SystemuserService.saveUserData(this.formData).subscribe(res=>{
    this.getAlldata()
console.log(res)

this.resetForm();
})
}
  saveData() {

    if (this.isEditMode) {
      this.isUpdate=false;
      // Update logic, e.g., send updated data to a service or API
      console.log('Data updated:', this.formData);
      this.SystemuserService.saveUserData(this.formData)
      // Update the data in the savedData array
      if (this.editedRowIndex !== null) {
        this.savedData[this.editedRowIndex] = { ...this.formData };
      }

      // Clear the form and exit edit mode
      this.resetForm();
      this.isEditMode = false;
    } else {
      this.SystemuserService.saveUserData(this.formData)
      // Save logic, e.g., send data to a service or API
      console.log('Data saved:', this.formData);

      // Add the saved data to the array
      this.savedData.push({ ...this.formData });

     
      this.resetForm();
    }
  }

  editRow(index: number) {
    this.isEditMode = true;
    this.editedRowIndex = index;
    this.formData = { ...this.savedData[index] };
  }
  updateData(id:number,systemUser:Systemuser){
    this.SystemuserService.updateUserData(id,systemUser).subscribe
    (res=>{
      this.resetForm()
      this.getAlldata()
      this.isUpdate=false;
      this.toastr.success('User Updated Succesfully')
      
    })
  }
  
  

  private resetForm() {
    // Reset form data
    this.formData = {
      id: 0,
      PwdMinAge: 0,
    PwdMaxAge: 0,
    PwdMinLength: 0,
    PwdMaxLength: 0,
    PwdComplex: false,
    PwdHistory: 0,
    LoginAttempts: 0,
    UseMultiFactor: false,
    OTPExpiry: false,
    CreatedOn: new Date,
    CreatedBy: '',
    ModifiedOn: new Date,
    ModifiedBy: ''
      
    };

    this.editedRowIndex = null;
  }
  pwdMinAge!:number
  pwdMaxAge!:number
  pwdMinLength!: number
  pwdMaxLength!: number
  pwdComplex!: boolean
  pwdHistory!: number
  loginAttempts!: number
  useMultiFactor!: boolean
  oTPExpiry!: boolean
  createdOn?: Date=new Date()
  createdBy!: string
  modifiedOn!: Date
  modifiedBy: Date=new Date()
  loadDataForUpdate(data){
    this.isUpdate=true;
    this.formData = {
      id: data.id,
      PwdMinAge: data.pwdMinAge,
      PwdMaxAge: data.pwdMaxAge,
      PwdMinLength: data.pwdMinLength,
      PwdMaxLength: data.pwdMaxLength,
      PwdComplex: data.pwdComplex,
      PwdHistory: data.pwdHistory,
      LoginAttempts: data.loginAttempts,
      UseMultiFactor: data.useMultiFactor,
      OTPExpiry: data.otpExpiry,
      CreatedOn: new Date,
      CreatedBy: data.createdBy,
      ModifiedOn: new Date,
      ModifiedBy: data.modifiedBy
    };
    console.log(data)


  }

}