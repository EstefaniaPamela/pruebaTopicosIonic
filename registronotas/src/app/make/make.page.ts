import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-make',
  templateUrl: './make.page.html',
  styleUrls: ['./make.page.scss'],
})
export class MakePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}


@Component({
  selector: 'app-make',
  templateUrl: './make.page.html',
  styleUrls: ['./make.page.scss'],
})

export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      materia: [''],
      nota1: [''],
      nota2: ['']
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }
}