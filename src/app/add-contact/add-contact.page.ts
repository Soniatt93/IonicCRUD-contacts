import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})

export class AddContactPage implements OnInit {
  
  contactId = null;
  Contacts = [];
  newContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl(''),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')])),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.([a-zA-Z0-9-]+)')])),
    date: new FormControl('',Validators.compose([Validators.required, Validators.pattern('((0[1-9])|([1-2][0-9])|(3[0-1]))/((1[0-2])|(0[1-9]))/[0-9]{4}')])),
    id: new FormControl('')
  });

  constructor(
    private aptService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newContactForm.setValue({
      id: '',
      name: '',
      img: 'https://ji.gob.do/wp-content/uploads/2020/09/User.jpg',
      phone: '',
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

  newContact(form) {
    if (!this.newContactForm.valid) {
      return false;
    } else {
      const data = {
        name: form.name,
        img: form.img,
        phone: form.phone,
        mail: form.mail,
        date: form.date
      };
      this.aptService.createContact(data).then(() => {
        console.log('Contacto añadido exitósamente!')
        this.newContactForm.setValue({
          id: '',
          name: '',
          img: '',
          phone: '',
          mail: '',
          date: ''
        });
        this.router.navigate(['/home']);
      }, (error) => {
        console.error(error);
      });
    }
  }
}