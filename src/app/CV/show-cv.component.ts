import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../Service/shared.service';
import { CV } from './CV';

@Component({
  selector: 'app-show-cv',
  templateUrl: './show-cv.component.html',
  styleUrls: ['./show-cv.component.css']
})
export class ShowCvComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private service:SharedService) { }
  
  


  formValue!: FormGroup; 

  CVobj: CV = new CV;
  

  allCV: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;
  submitted = false;

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      name:['',Validators.required],
      fullName:['',Validators.required],
      cityName:[''],
      email:['',Validators.email],
      mobileNumber:['',[Validators.required,Validators.pattern(/^([+]\d{2})?\d{10}$/)]],
      companyName:['',  Validators.maxLength(20)],
      city:[''],
      companyField:['']
    })
    this.AllCV();
  }
  get formValueControl() {
    return this.formValue.controls;
  }
  AddCV(){
    this.submitted = true;
    this.CVobj.name = this.formValue.value.name;
    console.log(this.formValue.value.fullName);
    
    this.CVobj.personal_Info.fullName = this.formValue.value.fullName;
    this.CVobj.personal_Info.cityName = this.formValue.value.cityName;
    this.CVobj.personal_Info.email = this.formValue.value.email;
    this.CVobj.personal_Info.mobileNumber = this.formValue.value.mobileNumber;
   
    this.CVobj.experience_Info.CompanyName = this.formValue.value.companyName;
    this.CVobj.experience_Info.City = this.formValue.value.city;
    this.CVobj.experience_Info.CompanyField = this.formValue.value.companyField;

    this.service.addCV(this.CVobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllCV();
      this.formValue.reset();
      this. closeClick()
    } })

  }

  AllCV(){
    this.service.refreshList().subscribe(res => {
      this.allCV = res;
      console.log(res)
      console.log(this.allCV)
    })
  }

  EditCV(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['fullName'].setValue(data.personal_Information.fullName);
    this.formValue.controls['cityName'].setValue(data.personal_Information.cityName);
    this.formValue.controls['email'].setValue(data.personal_Information.email);
    this.formValue.controls['mobileNumber'].setValue(data.personal_Information.mobileNumber);
    this.formValue.controls['companyName'].setValue(data.experience_Information.companyName);
    this.formValue.controls['city'].setValue(data.experience_Information.city);
    this.formValue.controls['companyField'].setValue(data.experience_Information.companyField);
    this.CVobj.id = data.id;
    console.log(this.CVobj);
    this.UpdateShowBtn();
  }

  UpdateCV(){
    this.submitted = true;
    this.CVobj.name = this.formValue.value.name;
    this.CVobj.personal_Info.fullName = this.formValue.value.fullName;
    this.CVobj.personal_Info.cityName = this.formValue.value.cityName;
    this.CVobj.personal_Info.email = this.formValue.value.email;
    this.CVobj.personal_Info.mobileNumber = this.formValue.value.mobileNumber;
    this.CVobj.experience_Info.CompanyName = this.formValue.value.companyName;
    this.CVobj.experience_Info.City = this.formValue.value.city;
    this.CVobj.experience_Info.CompanyField = this.formValue.value.companyField;
    this.service.updateCV(this.CVobj,this.CVobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllCV();
      this.SaveShowBtn();
      this. closeClick()
    })


  }


  DeleteCV(data:any){
    this.service.deleteCV(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllCV();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }
  closeClick(){
    this.AllCV();
  }

}
