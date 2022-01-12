import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RestaurentModel } from './restaurent.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  restaurentData: RestaurentModel = new RestaurentModel();
  allRestaurentData: any;
  showAddBtn!: boolean;
  showEditBtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      restaurent_name: [],
      email: [],
      mobile: [],
      address: [],
      services: [],
      action: [],
    });
    this.getAllData()
  }
  
  clickAddRest(){
    this.formValue.reset();
    this.showAddBtn=true;
    this.showEditBtn=false;
    
  }

  // subscribing data
  addRestaurent(){
    this.restaurentData.restaurent_name = this.formValue.value.restaurent_name;
    this.restaurentData.address = this.formValue.value.address;
    this.restaurentData.email = this.formValue.value.email;
    this.restaurentData.mobile = this.formValue.value.mobile;
    this.restaurentData.services = this.formValue.value.services;

    this.api.postRestaurentData(this.restaurentData).subscribe(
      (res) => {
        alert('Added Restaurent!!');
        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('something is wrong!!!');
        // // {err:console.error}
      }
    );
  }

  getAllData(){
    this.api.getRestaurentData().subscribe((res) => {
      this.allRestaurentData = res;
    });
  }

  delRestaurent(data: any){
    const answer = window.confirm("Are you sure?")
    if(answer){
      this.api.deleteRestaurentData(data.id).subscribe((res) => {
        this.getAllData(); //to update intantly
      });
    }

  }

  editRestaurent(data:any){
    this.showAddBtn = false;
    this.showEditBtn = true;
    this.restaurentData.id = data.id;
    this.formValue.controls['restaurent_name'].setValue(data.restaurent_name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);  
  }

  updateRestaurent(){
    this.restaurentData.restaurent_name = this.formValue.value.restaurent_name
    this.restaurentData.email = this.formValue.value.email;
    this.restaurentData.mobile = this.formValue.value.mobile;
    this.restaurentData.address = this.formValue.value.address;
    this.restaurentData.services = this.formValue.value.services;

    this.api
      .updateRestaurentData(this.restaurentData, this.restaurentData.id)
      .subscribe((res:any) => {
        alert('Data Updated');
        this.formValue.reset();
        this.getAllData();
      });
  }
}
