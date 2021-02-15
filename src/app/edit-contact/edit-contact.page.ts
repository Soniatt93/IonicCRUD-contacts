import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ContactService } from '../shared/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})

export class EditContactPage implements OnInit {
  updateContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.compose([Validators.required, Validators.pattern('(http|ftp|https)://[a-zA-Z0-9_.+-/]+(.jpg|.png)')])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')])),
    mail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.([a-zA-Z0-9-]+)')])),
    date: new FormControl('',Validators.compose([Validators.required, Validators.pattern('((0[1-9])|([1-2][0-9])|(3[0-1]))/((1[0-2])|(0[1-9]))/[0-9]{4}')])),
    id: new FormControl('')
  });

  constructor(
    private aptService: ContactService,
    private router: Router,
    private routeAct: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.routeAct.snapshot.paramMap.get('id');
    console.log(id);
    const editSubscribe = this.aptService.getContact(id).subscribe((contac) => {
      this.updateContactForm.setValue({
        id: id,
        name: contac.payload.data()['name'],
        img: contac.payload.data()['img'],
        phone: contac.payload.data()['phone'],
        mail: contac.payload.data()['mail'],
        date: contac.payload.data()['date']
      });
      editSubscribe.unsubscribe();
    });
  }

  idB = this.routeAct.snapshot.paramMap.get('id');
  editContact(form, contactId = this.idB) {
    if (!this.updateContactForm.valid) {
      return false;
    } else {
      this.router.navigate(['/home']);
      const data = {
        name: form.name,
        img: form.img,
        phone: form.phone,
        mail: form.mail,
        date: form.date
      };
      this.aptService.updateContact(contactId, data).then(() => {
        console.log('Contacto editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

}