import { expect, Page } from '@playwright/test';
import { PageDinero } from './PageDinero';



export  class PageCerrarSeccion {
 page: Page;

 constructor(page: Page){
    this.page = page;
 }

 //locators
 btnMio = () => this.page.locator("xpath=//uni-view[@class='tqb-tabbar']//uni-view[5]//uni-view[1]//uni-view[1]//uni-image[1]//img[1]");
 btnConfigurar = () => this.page.locator("xpath=//uni-view[@class='pdlr30']//uni-view[1]//uni-view[1]//uni-view[1]//uni-image[1]//img[1]");
 btnCerrarSecion = () => this.page.locator("xpath=//uni-page-body/uni-view/uni-view[@class='pdlr45 mt70']/uni-view[5]/uni-view[1]/uni-view[1]/uni-image[1]/div[1]");
 btnConfirmar = () => this.page.locator('xpath=//*[@id="app"]/uni-app/uni-page/uni-page-wrapper/uni-page-body/uni-view/view/div/div/uni-view[3]/uni-view[2]');


 //actions
 public async cerrarSeccion(){
   try {
     const pageDinero = new PageDinero(this.page);
      
        await this.btnMio().click();
        await pageDinero.delay(5000);
        if(await pageDinero.isElementpresente(this.btnConfigurar())){
            await this.btnConfigurar().click();
            await pageDinero.delay(5000);
            if(await pageDinero.isElementpresente(this.btnCerrarSecion())){
                await this.btnCerrarSecion().click();
                await pageDinero.delay(5000);
                if(await pageDinero.isElementpresente(this.btnConfirmar())){
                    await this.btnConfirmar().click();
                }
            }else{
                console.log(`El elemnto a intectuar no esta disponible ${this.btnCerrarSecion()}`);

            }
        }else{
            console.log(`El elemnto a intectuar no esta disponible ${this.btnConfigurar()}`);
        }
        
      } catch (error) {
         console.error("Se muestra un error en la clase PageLogin en el metodo goto",error);
      }
 }

}