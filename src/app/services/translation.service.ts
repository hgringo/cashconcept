import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

    private readonly platform = inject(PLATFORM_ID);

    constructor(
        private translate: TranslateService
    ) {}

    initLanguage() {

        if (isPlatformBrowser(this.platform)) { 

            this.translate.setDefaultLang('fr');
            const storedLang = localStorage.getItem('language');
        
            if (storedLang) {
                this.translate.setDefaultLang(storedLang);
                this.translate.use(storedLang);
            } 
            else {  
                const browserLang = this.translate.getBrowserLang();
                const defaultLang = browserLang?.match(/en|fr|nl/) ? browserLang : 'fr';

                this.translate.setDefaultLang(defaultLang);
                this.translate.use(defaultLang);
                localStorage.setItem('language', defaultLang);
            }
        }
    }
}