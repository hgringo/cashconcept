import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { ComparatorService } from 'app/services/comparator.service';
import { IProduct } from 'app/types/product';
import { ButtonModule } from 'primeng/button';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-collapsible-comparator',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FontAwesomeModule,
    TranslateModule
  ],
  templateUrl: './collapsible-comparator.component.html',
  styleUrl: './collapsible-comparator.component.scss'
})
export class CollapsibleComparatorComponent implements OnInit {

  @Input() products: IProduct[] = [];
  @Output() removeProduct = new EventEmitter<string>();
  isOpen: boolean = false;

  faTrash = faTrashCan;
  faXmark = faXmark;

  constructor(
    private comparatorService: ComparatorService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    this.addClassToBody();
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.renderer.addClass(document.body, 'comparator-open') : this.renderer.removeClass(document.body, 'comparator-open');
  }

  onRemoveProduct(productId: string): void {
    this.removeProduct.emit(productId);
  }

  onGoToComparator() {
    localStorage.setItem('previousPageComparator', this.router.url);
    window.location.href = '/comparator';
  }

  onCleanComparator() {
    this.comparatorService.removeAll();
  }

  addClassToBody() {
    this.renderer.addClass(document.body, 'comparator');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'comparator');
  }
}
