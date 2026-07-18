import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {

  private readonly platform = inject(PLATFORM_ID);
  private languageSubject!: BehaviorSubject<string>;
  language$!: Observable<string>;
  private initialized = false;

  constructor(private translate: TranslateService) {
    const initialLang = this.resolveInitialLang();
    this.languageSubject = new BehaviorSubject<string>(initialLang);
    this.language$ = this.languageSubject.asObservable();
    // NB : on ne fait plus l'init ici, on la déclenche depuis AppComponent
  }

  initLanguage(): void {
    if (this.initialized) { return; }
    this.initialized = true;

    this.translate.addLangs(['fr', 'en', 'nl']);

    const lang = this.resolveInitialLang();
    this.translate.setDefaultLang('fr');
    this.translate.use(lang);               // ← appelé serveur ET client
    this.languageSubject.next(lang);

    if (isPlatformBrowser(this.platform) && !this.getStoredLanguage()) {
      localStorage.setItem('language', lang);
    }
  }

  private resolveInitialLang(): string {
    const stored = this.getStoredLanguage();
    if (stored) { return stored; }
    if (isPlatformBrowser(this.platform)) {
      const browserLang = this.translate.getBrowserLang();
      if (browserLang?.match(/en|fr|nl/)) { return browserLang; }
    }
    return 'fr'; // valeur sûre côté serveur
  }

  private getStoredLanguage(): string | null {
    return isPlatformBrowser(this.platform) ? localStorage.getItem('language') : null;
  }

  switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platform) && /en|fr|nl/.test(lang)) {
      this.translate.use(lang);
      localStorage.setItem('language', lang);
      this.languageSubject.next(lang);
    }
  }
}