import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Bookings = [];

  constructor(
    private aptService: AppointmentService
  ) { }

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
    
  } 

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
      console.log(String(res[0]['materia']));
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Seguro que desea eliminar?')) {
      this.aptService.deleteBooking(id)
    }
  }
}