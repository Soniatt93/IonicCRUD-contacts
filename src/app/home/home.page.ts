import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  docId = null; 
  Bookings = [];

  public newBookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
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


  editBooking(docId) {
    this.router.navigate(['/edit-appointment/', docId]);
    console.log(docId);
  }

  deleteBooking(docId) {
    this.aptService.deleteBooking(docId).then(() => {
      console.log('Cita eliminada!');
    }, (error) => {
      console.error(error);
    });
    /*console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }*/
  }
}