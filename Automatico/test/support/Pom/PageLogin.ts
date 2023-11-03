import { expect, Page } from '@playwright/test';
import { PageDinero } from './PageDinero';
import { Console } from 'console';


export default class PageLogin {
 page: Page;

 constructor(page: Page){
    this.page = page;
 }

 //locators
 inputTelefono = () => this.page.locator("xpath=//input[@type='number']");
 inputPassword = () => this.page.locator("xpath=//input[@type='password']");
 btnLogin = () => this.page.locator('xpath=//*[@id="app"]/uni-app/uni-page/uni-page-wrapper/uni-page-body/uni-view/uni-view[2]/uni-view[2]/uni-view[4]');
 imgValidate = () => this.page.locator("xpath=//div[@class='normalContent desc']//uni-view//p//img");
 btnImg = () => this.page.locator("xpath=//uni-view[@class='center mt20']//uni-image//img");


 //actions
 public async goto(valor:string, valor1: string){
   try {
      
       const pageDinero = new PageDinero(this.page);
       
      //   await this.page.setViewportSize({ width: 1920, height: 1032 })
        await this.page.goto("https://domi-pv.com/#/pages/login/login");
        await this.inputTelefono().fill(valor);
        await this.inputPassword().fill(valor1);
        await this.btnLogin().click();
        await expect(this.imgValidate()).toBeVisible({timeout:200000});

        if(await pageDinero.isElementpresente(this.btnImg())){
         pageDinero.screenshots1("Inicio de seccion de manera correcta");
         await this.btnImg().click();
        }else{
         console.log(`El elemento ${this.btnImg()}, no esta disponible`);
        }
        
      } catch (error) {
         console.error("Se muestra un error en la clase PageLogin en el metodo goto",error);
      }
 }

}