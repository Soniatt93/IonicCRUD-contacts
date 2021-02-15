import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../shared/Contact';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  contactId = null; 
  Contacts = [];

  public newContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(
    private aptService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newContactForm.setValue({
      id: '',
      img: '',
      name: '',
      mail: '',
      date: ''
    });
    this.aptService.getContactList().subscribe((contactsSnapshot) => {
      this.Contacts = [];
      contactsSnapshot.forEach((bData: any) => {
        this.Contacts.push({
          id: bData.payload.doc.id,
          data: bData.payload.doc.data()
        });
      });
    });
  }


  editContact(contactId) {
    this.router.navigate(['/edit-contact/', contactId]);
    console.log(contactId);
  }

  deleteContact(contactId) {
    this.aptService.deleteContact(contactId).then(() => {
      console.log('Conacto eliminado!');
    }, (error) => {
      console.error(error);
    });
    /*console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteContact(id)
    }*/
  }
}