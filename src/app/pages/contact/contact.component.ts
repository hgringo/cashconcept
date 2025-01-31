import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'app/components/footer/footer.component';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { ContactService } from 'app/services/contact.service';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'environments/environment';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SubheaderComponent,
    TranslateModule,
    FooterComponent,
    FontAwesomeModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage implements OnInit {

  environment = environment;

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faPaperPlane = faPaperPlane;

  contactForm!: FormGroup;
  formStartTime!: number;

  pageTitle: string = 'menuContact';
  breadcrumbs: IBreadcrumb[] = [
    {
      label : "menuHome",
      url: '/'
    }, 
    {
      label : this.pageTitle,
      active: true
    }
  ];

  isFormSended: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private autoSEOService: AutoSEOService
  ) {}

  ngOnInit() {

    this.autoSEOService.prepareSEO(PageTYPE.ContactPage);

    this.formStartTime = Date.now();

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      society: ['', []],
      tva: ['', []],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      name: [''] // Honeypot field for spam detection
    });
  }

  onSubmit() {

    const timeTaken = Date.now() - this.formStartTime;

    // Spam prevention: Check honeypot field and form timing
    if (this.contactForm.value.firstname || timeTaken < 3000) {
      return;
    }

    if (this.contactForm.valid) {

      const formData = this.contactForm.value;

       // Create replacements for the template
       const mailData = {
        Subject: formData.subject,
        Replacements: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          societyName: formData.society,
          tva: formData.tva,
          message: formData.message,
        },
      };
      
      this.contactService.sendContactForm(mailData).subscribe({
        next: () => {

          // Display confirmation
          this.isFormSended = true;

          // clean form fields
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert('An error occurred while sending your message. Please try again later.');
        }
      });
    }
  }
}
