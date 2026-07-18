import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef,
  PLATFORM_ID, inject
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPalette, faWandMagicSparkles, faPuzzlePiece,
  faAward, faShieldHalved, faHandshakeAngle, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export interface ICashboxColor {
  id: string;
  name: string;
  color: string;   // accent hex used to theme the stage
  soft: string;     // soft background hex
  tone: string;     // translate key — colour label
  env: string;      // translate key — environment caption
  image: string;    // asset path
}

export interface IBenefit {
  icon: any;
  title: string;    // translate key
  desc: string;     // translate key
}

@Component({
  standalone: true,
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  imports: [CommonModule, NgOptimizedImage, TranslateModule, FontAwesomeModule],
})
export class CustomizationComponent implements OnInit, OnDestroy {

  faArrowRight = faArrowRight;
  faPalette = faPalette;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  private rotateTimer: any = null;
  private readonly ROTATE_MS = 2000;

  selectedIndex = 0;

  models: ICashboxColor[] = [
    { id: 'cashbox5',    name: 'CashBox 5',   color: '#7c8a52', soft: '#e9eede', tone: 'persoToneGreen',  env: 'persoEnvWellness',  image: 'assets/personalisation/cashbox5.webp' },
    { id: 'cashbox3',    name: 'CashBox 3',   color: '#e3a9b6', soft: '#f7e7eb', tone: 'persoTonePink',   env: 'persoEnvBeauty',    image: 'assets/personalisation/cashbox3.webp' },
    { id: 'cashboxpro',  name: 'CashBox Pro', color: '#c2acdf', soft: '#efe8f7', tone: 'persoToneLilac',  env: 'persoEnvPerfume',   image: 'assets/personalisation/cashboxpro.webp' },
    { id: 'cashboxs',    name: 'CashBox S',   color: '#bba884', soft: '#f1ece2', tone: 'persoToneSand',   env: 'persoEnvFashion',   image: 'assets/personalisation/cashboxs.webp' },
    { id: 'cashbox5plus',name: 'CashBox 5+',  color: '#9fb0a0', soft: '#eef1ee', tone: 'persoToneWhite',  env: 'persoEnvPharmacy',  image: 'assets/personalisation/cashbox5plus.webp' },
  ];

  sectors: string[] = [
    'persoSecBakery', 'persoSecPastry', 'persoSecButcher', 'persoSecFries', 'persoSecSnack',
    'persoSecRestaurant', 'persoSecSandwich', 'persoSecPizza', 'persoSecBarber', 'persoSecNight',
    'persoSecPharmacy', 'persoSecFood', 'persoSecGrocery', 'persoSecProximity', 'persoSecMini',
    'persoSecGas', 'persoSecDealer', 'persoSecFashion', 'persoSecHoreca', 'persoSecRetail',
  ];

  benefits: IBenefit[] = [
    { icon: faWandMagicSparkles, title: 'persoBenefitDesignT',   desc: 'persoBenefitDesignD' },
    { icon: faPalette,           title: 'persoBenefitColorT',    desc: 'persoBenefitColorD' },
    { icon: faPuzzlePiece,       title: 'persoBenefitFitT',      desc: 'persoBenefitFitD' },
    { icon: faAward,             title: 'persoBenefitImageT',    desc: 'persoBenefitImageD' },
    { icon: faShieldHalved,      title: 'persoBenefitSecureT',   desc: 'persoBenefitSecureD' },
    { icon: faHandshakeAngle,    title: 'persoBenefitTurnkeyT',  desc: 'persoBenefitTurnkeyD' },
  ];

  get selected(): ICashboxColor {
    return this.models[this.selectedIndex];
  }

  ngOnInit(): void {
    // IMPORTANT: never run the timer during SSR — a perpetual setInterval keeps
    // the Angular app "unstable" and blocks server rendering / hydration.
    if (isPlatformBrowser(this.platformId)) {
      this.startAuto();
    }
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  /** Manual click: switch + restart the auto-rotation timer. */
  select(i: number): void {
    this.selectedIndex = i;
    if (isPlatformBrowser(this.platformId)) {
      this.startAuto();
    }
  }

  /** Pause while the visitor hovers the showcase, resume on leave. */
  pauseAuto(): void {
    this.stopAuto();
  }
  resumeAuto(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAuto();
    }
  }

  private startAuto(): void {
    this.stopAuto();
    // Run the interval OUTSIDE Angular's zone so it doesn't trigger change
    // detection on every tick; we re-enter the zone only to apply the change.
    this.zone.runOutsideAngular(() => {
      this.rotateTimer = setInterval(() => {
        this.zone.run(() => {
          this.selectedIndex = (this.selectedIndex + 1) % this.models.length;
          this.cdr.markForCheck();
        });
      }, this.ROTATE_MS);
    });
  }

  private stopAuto(): void {
    if (this.rotateTimer) {
      clearInterval(this.rotateTimer);
      this.rotateTimer = null;
    }
  }
}