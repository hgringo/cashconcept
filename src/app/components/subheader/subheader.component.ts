import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IBreadcrumb } from 'app/types/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-subheader',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent {

  @Input() breadcrumbs: IBreadcrumb[] = [];
  @Input() pageTitle: string = '';
  @Input() className: string = '';

  constructor() {}

}
