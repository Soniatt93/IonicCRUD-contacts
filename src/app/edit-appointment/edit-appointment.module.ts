import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAppointmentPageRoutingModule } from './edit-appointment-routing.module';

import { EditAppointmentPage } from './edit-appointment.page';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAppointmentPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [EditAppointmentPage]
})
export class EditAppointmentPageModule {}
