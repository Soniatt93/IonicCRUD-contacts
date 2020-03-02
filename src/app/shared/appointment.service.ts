import { Injectable } from '@angular/core';
import { Appointment } from './Appointment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private firestore: AngularFirestore) { }

  // Create
  createBooking(data: any) {
    return this.firestore.collection('appointment').add(data);
  }

  // Get Single
  getBooking(id: string) {
    return this.firestore.collection('appointment').doc(id).snapshotChanges();
  }

  // Get List
  getBookingList() {
    return this.firestore.collection('appointment').snapshotChanges();
  }

  // Update
  updateBooking(id: string, data: any) {
    return this.firestore.collection('appointment').doc(id).set(data);
  }

  // Delete
  deleteBooking(id: string) {
    return this.firestore.collection('appointment').doc(id).delete();
  }
}
