import { Component, inject } from '@angular/core';
import { languageService } from '../../../../services/language-service';

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
    private readonly langService = inject(languageService);

    readonly currentLang = this.langService.currentLang;
    readonly isRTL = this.langService.isRTL;

    changeLanguage() {
        const newLang = this.currentLang() === 'en' ? 'ar' : 'en';
        this.langService.changeLanguage(newLang);
    }
}