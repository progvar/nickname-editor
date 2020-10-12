import {
    browser,
    by,
    element,
    ElementArrayFinder,
    ElementFinder,
} from 'protractor';

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        return element(
            by.css('app-root app-details-section span#address'),
        ).getText() as Promise<string>;
    }

    getDescriptionEl(): ElementFinder {
        return element(by.css('app-root app-details-section p#description'));
    }

    getInputEl(): ElementFinder {
        return element(by.css('app-root app-nicknames-section input'));
    }

    getAddBtnEl(): ElementFinder {
        return element(by.css('app-root app-nicknames-section button#add-btn'));
    }

    getSaveBtnEl(): ElementFinder {
        return element(
            by.css('app-root app-nicknames-section button#save-btn'),
        );
    }

    getMatHintEl(): ElementFinder {
        return element(by.css('app-root app-nicknames-section mat-hint'));
    }

    getMatErrorEl(): ElementFinder {
        return element(by.css('app-root app-nicknames-section mat-error'));
    }

    getNicknameElements(): ElementArrayFinder {
        return element.all(
            by.css('app-root app-nicknames-section mat-card.nickname-card'),
        );
    }
}
