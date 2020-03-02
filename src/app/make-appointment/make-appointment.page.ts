import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})

export class MakeAppointmentPage implements OnInit {
  
  docId = null;
  Bookings = [];
  newBookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    date: new FormControl('',Validators.compose([Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$')])),
    id: new FormControl('')
  });

  constructor(
    private aptService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newBookingForm.setValue({
      id: '',
      img: '',
      name: '',
      speciality: '',
      date: ''
    });
    this.aptService.getBookingList().subscribe((bookingsSnapshot) => {
      this.Bookings = [];
      bookingsSnapshot.forEach((bData: any) => {
        this.Bookings.push({
          id: bData.payload.doc.id,
          data: bData.payload.doc.data()
        });
      });
    });
  }

  newBooking(form) {
    if (!this.newBookingForm.valid) {
      return false;
    } else {
      const data = {
        img: form.img,
        name: form.name,
        speciality: form.speciality,
        date: form.date
      };
      this.aptService.createBooking(data).then(() => {
        console.log('Reserva creada exitósamente!')
        this.newBookingForm.setValue({
          id: '',
          img: '',
          name: '',
          speciality: '',
          date: ''
        });
        this.router.navigate(['/home']);
      }, (error) => {
        console.error(error);
      });
    }
  }
}