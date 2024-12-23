import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { employeemodel } from './model/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  employeeForm: FormGroup = new FormGroup({});
  
  employeeObj: employeemodel = new employeemodel();
  employeelist: employeemodel[]= [];
  
  constructor(){
    this.createform()
    const olddata = localStorage.getItem("empdata");
    if(olddata != null){
      const parsedata = JSON.parse(olddata);
      this.employeelist = parsedata;
    }
  }
reset()
{
  this.employeeObj = new employeemodel();
  this.createform()
}
  createform(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empid),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      contact: new FormControl(this.employeeObj.contact),
      address: new FormControl(this.employeeObj.address),
      email: new FormControl(this.employeeObj.email),
      pincode: new FormControl(this.employeeObj.pincode,[Validators.required,Validators.minLength(6)]),
    })
  }
 
  
  onSave()
  {
    const olddata = localStorage.getItem("empdata");
    if(olddata != null){
      const parsedata = JSON.parse(olddata);
      this.employeeForm.controls['empid'].setValue(parsedata.length +1);
      this.employeelist.unshift(this.employeeForm.value);
    }else
    {
      this.employeelist.unshift(this.employeeForm.value);
    }
    localStorage.setItem("empdata", JSON.stringify( this.employeelist)) 

  }

  onEdit(item: employeemodel){
      this.employeeObj = item;
      this.createform()
  }

  onUpdate()
  {
    const record = this.employeelist.find(e=>e.empid == this.employeeForm.controls['empid'].value);
    if(record != undefined)
    {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.email = this.employeeForm.controls['email'].value;
      record.contact = this.employeeForm.controls['contact'].value;

    }
    localStorage.setItem("empdata", JSON.stringify( this.employeelist)) 
    this.employeeObj = new employeemodel();
    this.createform()

  }

  onDelete(id: number)
  {
    const isdelete = confirm("are you sure you want to delete");
    if(isdelete){
      const index =  this.employeelist.findIndex(e=>e.empid == id);
      this.employeelist.splice(index,1)
    localStorage.setItem("empdata", JSON.stringify( this.employeelist)) 

    }

  }

  

}
