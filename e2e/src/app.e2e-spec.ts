import { AppPage } from './app.po';
import { browser, ExpectedConditions, Key, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Nickname Editor', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display the address header', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('30 St Mary Axe, London');
    });

    it('should display the description paraghraph', () => {
        page.navigateTo();
        expect(page.getDescriptionEl).toBeDefined();
    });

    it('should enable the add button when a valid input is entered', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);
    });

    it('should disable the add button when an invalid input is entered', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('g');

        expect(inputEl.getAttribute('value')).toEqual('g');

        browser.wait(EC.not(EC.elementToBeClickable(buttonEl)), 1000);
    });

    it('should enable then disable the add button when first entering a valid then an invalid input', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const EC = ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        inputEl.sendKeys(Key.BACK_SPACE);
        inputEl.sendKeys('g');

        expect(inputEl.getAttribute('value')).toEqual('g');
        browser.wait(EC.not(EC.elementToBeClickable(buttonEl)), 1000);
    });

    it('should add a new nickname to the list', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const nicknameElements = page.getNicknameElements();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(1);
    });

    it('should reset the input value after a new nickname is added', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const nicknameElements = page.getNicknameElements();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(1);
        expect(inputEl.getAttribute('value')).toBe('');
    });

    it('should not add the same nickname twice', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const nicknameElements = page.getNicknameElements();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(1);

        inputEl.sendKeys(Key.BACK_SPACE);
        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(1);
    });

    it('should add two different but valid nicknames', () => {
        page.navigateTo();

        const inputEl = page.getInputEl();
        const buttonEl = page.getAddBtnEl();
        const nicknameElements = page.getNicknameElements();
        const EC = protractor.ExpectedConditions;

        inputEl.sendKeys('a');

        expect(inputEl.getAttribute('value')).toEqual('a');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(1);

        inputEl.sendKeys('aaa');

        expect(inputEl.getAttribute('value')).toEqual('aaa');

        browser.wait(EC.elementToBeClickable(buttonEl), 1000);

        buttonEl.click();

        expect(nicknameElements.count()).toBe(2);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE,
            } as logging.Entry),
        );
    });
});
