import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { _, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from 'app/components/footer/footer.component';
import { SubheaderComponent } from 'app/components/subheader/subheader.component';
import { ProductService } from 'app/services/product.service';
import { IBreadcrumb } from 'app/types/breadcrumb';
import { IProduct } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { faBuilding, faUser, faPaperPlane, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { ProgressBarModule } from 'primeng/progressbar';
import { FieldsetModule } from 'primeng/fieldset';
import { formattedFinancingProduct, IfinancingProduct } from 'app/types/financingProduct';
import { InputNumberModule } from 'primeng/inputnumber';
import { FinancingService } from 'app/services/financing.service';
import { TranslationService } from 'app/services/translation.service';
import { IPosition } from 'app/types/position';
import { AutoSEOService, PageTYPE } from 'app/services/autoSEO.service';


@Component({
  standalone: true,
  selector: 'app-financing',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubheaderComponent,
    FooterComponent,
    StepperModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    ToastModule,
    BadgeModule,
    ProgressBarModule,
    FieldsetModule,
    FontAwesomeModule,
    TranslatePipe
  ],
  templateUrl: './financing.component.html',
  styleUrl: './financing.component.scss',
  providers: [MessageService]
})
export class FinancingPage implements OnInit {

  faUser = faUser;
  faBuilding = faBuilding;
  faPaperPlane = faPaperPlane;
  faFilePDF = faFilePdf;

  pageTitle: string = 'menuFinancingSimulation';
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

  products!: IProduct[];
  selectedProducts: IfinancingProduct[] = [];

  financingForm!: FormGroup;

  profiles: any[] = [
    { name: "profilePhysical", id: "physical", icon: faUser },
    { name: "profileSociety", id: "society", icon: faBuilding }
  ];

  selectedProfile: any = null;

  files : File[] = [];
  totalSize : number = 0;
  totalSizePercent : number = 0;
  acceptedFiles: string = ".pdf, .jpg, .png, .webp";

  totalPrice: number = 0;
  totalLeasingPrice: number = 0;

  isFormSended: boolean = false;

  lastYear!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private financingService: FinancingService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private config: PrimeNG,
    private autoSEOService: AutoSEOService,
    @Inject(DOCUMENT) private document: Document,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {

    this.translationService.initLanguage();

    this.autoSEOService.prepareSEO(PageTYPE.FinancingPage);

    this.products = this.productService.getProducts();

    this.financingForm = this.fb.group({
      products: new FormArray([]),
      profile: new FormControl(null),
      society: new FormControl(''),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      tva: ['', [Validators.required]],
      iban: ['', [Validators.required]]
    });

    var thisYear = (new Date()).getFullYear();
    this.lastYear = thisYear - 1;
  }

  get productControls() {
    return this.financingForm.get('products') as FormArray;
  }

  isProductSelected(product: IProduct) : boolean {
    return this.selectedProducts.find(_ => _.product.id == product.id) ? true : false;
  }

  toggleCheck(product: IProduct) {

    var searchedElement = this.selectedProducts.find(_ => _.product.id === product.id);

    if (!searchedElement) {

      // Add product to selectedProducts with default 'items' value
      const newProduct = { product: product, items: 1 };
      this.selectedProducts.push(newProduct);
      
      // Create FormControl with default 'items' value
      this.productControls.push(new FormControl(newProduct.items));
    } 
    else {
      this.selectedProducts = this.selectedProducts.filter(_ => _.product.id !== product.id); // Remove product

      // Remove corresponding FormControl from productControls
      const formControlIndex = this.productControls.controls.findIndex(ctrl => ctrl.value.id === product.id);
      if (formControlIndex !== -1) {
          this.productControls.removeAt(formControlIndex);
      }
    }

    this.calculatePrice();
  }

  selectProfile(profile: any) {
    this.selectedProfile = profile;

    this.translate.get(_(profile.name)).subscribe((profileName: string) => {
      this.financingForm.get('profile')?.setValue(profileName);
    });
  }

  calculatePrice() {

    this.totalPrice = 0;
    this.totalLeasingPrice = 0;

    this.selectedProducts.forEach(_ => {
      this.totalPrice += _.product.price * _.items;
      this.totalLeasingPrice += _.product.leasingPrice * _.items;
    });
  }

  getProductControl(index: number): FormControl {
      return this.productControls.at(index) as FormControl;
  }

  updateNbItems(nbItem: any, item: IfinancingProduct) {
    item.items = nbItem;
    this.calculatePrice();
  }

  onSubmit() {

    if (this.financingForm.valid) {

      const data = new FormData();

      data.append('Replacements', JSON.stringify(this.formatReplacementsData()));
      data.append('Products', JSON.stringify(this.formatProductsData()));
      data.append('Total', this.totalPrice.toString());

      // Append each selected file
      for (let file of this.files) {
        data.append('Files', file, file.name);
      }

      this.financingService.sendFinancingForm(data).subscribe({
        next: () => {

          // Display confirmation
          this.isFormSended = true;

          // clean form fields
          this.financingForm.reset();
          this.selectedProfile = null;
          this.selectedProducts = [];
          this.files = [];
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert('An error occurred while sending your message. Please try again later.');
        }
      });
    }
  }

  private formatReplacementsData(): any {

    const formData = this.financingForm.value;

    var replacements = {
      profile: formData.profile,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      tva: formData.tva,
      iban: formData.iban,
      street: formData.street,
      number: formData.number,
      postalCode: formData.postalCode,
      municipality: formData.municipality,
      society: formData.society !== '' ? formData.society : '/'
    };

    return replacements;

  }

  private formatProductsData(): formattedFinancingProduct[] {

    var products : formattedFinancingProduct[] = [];

    this.selectedProducts.forEach(_ => {

      products.push({
        Name: _.product.name,
        Price: _.product.price,
        Items: _.items
      });

    });

    return products;
  }

  // File management

  choose(event: any, callback: any) {
      callback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onSelectedFiles(event: any) {

      var set = new Set([...this.files, ...event.currentFiles]);

      this.files = [...set];
  }

  onRemove(event: any) {

    this.files = this.files.filter(file => file !== event.file);
  }

  uploadEvent(callback: any) {
      callback();
  }

  formatSize(bytes: any) {

      const k = 1024;
      const dm = 3;
      const sizes = this.config.translation.fileSizeTypes;

      if (sizes) {

        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }
  
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  
        return `${formattedSize} ${sizes[i]}`;
      }
      else {
        return '';
      }
  }

  isPhysicalPerson() : boolean {
    return this.selectedProfile ? this.selectedProfile.id === 'physical' : false;
  }

  isSociety() : boolean {
    return this.selectedProfile ? this.selectedProfile.id === 'society' : false;
  }

  getPosition(): IPosition | undefined {
  
    const targetElement = this.document.getElementById('stepper');
    
    if (!targetElement) return; 

    const rect = targetElement.getBoundingClientRect();

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

  scrollToStepper() {
    const position = this.getPosition();
    if (position) this.scroller.scrollToPosition([position.left, position.top - 100]);
  }

}
