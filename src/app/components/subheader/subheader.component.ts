import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IBreadcrumb } from 'app/types/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-subheader',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss'
})
export class SubheaderComponent {

  @Input() breadcrumbs: IBreadcrumb[] = [];
  @Input() pageTitle: string = '';
  @Input() displayBreadcrumb: boolean = true;
  @Input() image: string = '';
  @Input() video: string = '';
  @Input() videoPoster: string = '';
  @Input() focusX: string = 'center';
  @Input() focusY: string = '50%';

  videoStarted: boolean = false;

  get objectPosition(): string {
    return `${this.focusX} ${this.focusY}`;
  }

  get hasVideo(): boolean {
    return !!this.video;
  }

}