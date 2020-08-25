import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})

export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      materia: [''],
      nota1: [''],
      nota2: ['']
    })
  }


  async formSubmit() {
    if (!this.bookingForm.valid) {
      console.log('Ingrese todos los valores')
      if (window.confirm('Debe llenar todos los campos')) {
        return false;
      }
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        var n1 = document.getElementById('nota1');
        console.log(n1);
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}