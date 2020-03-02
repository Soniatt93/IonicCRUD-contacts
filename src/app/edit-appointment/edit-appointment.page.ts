import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.page.html',
  styleUrls: ['./edit-appointment.page.scss'],
})

export class EditAppointmentPage implements OnInit {
  updateBookingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    date: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(((0[1-9]|[12][0-9]|30)[-]?(0[13-9]|1[012])|31[-]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$')])),
    id: new FormControl('')
  });

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    private routeAct: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.routeAct.snapshot.paramMap.get('id');
    console.log(id);
    const editSubscribe = this.aptService.getBooking(id).subscribe((booking) => {
      this.updateBookingForm.setValue({
        id: id,
        name: booking.payload.data()['name'],
        speciality: booking.payload.data()['speciality'],
        date: booking.payload.data()['date']
      });
      editSubscribe.unsubscribe();
    });
  }

  idB = this.routeAct.snapshot.paramMap.get('id');
  editBooking(form, docId = this.idB) {
    if (!this.updateBookingForm.valid) {
      return false;
    } else {
      this.router.navigate(['/home']);
      const data = {
        name: form.name,
        speciality: form.speciality,
        date: form.date
      };
      this.aptService.updateBooking(docId, data).then(() => {
        console.log('Reserva editada exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

}