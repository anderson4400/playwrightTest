import { expect, Locator, Page } from '@playwright/test';


export  class PageDinero {
    page : Page;

    constructor (page: Page){
        this.page = page;
    }

    //Locator
    btnMenu = () => this.page.locator("xpath=//uni-view[@class='add-icon']//uni-image//img");
    btnDinero = () => this.page.locator("xpath=//uni-view[@class='center l_inpS l_inpBg pdlr30 text_white f32 mt60']");
    btnRecoger = () => this.page.locator("xpath=//uni-page-body/uni-view/view[@class='nut-overlay']/div[1]/uni-view[1]");
    btnNoDisponible = () => this.page.locator("xpath=//uni-view[@class='center l_inpS mt60 l_inpBg pdlr30 text_white f32']")
    txtPanel = () => this.page.locator("xpath=//uni-view[@class='f36 text_white']");

    public async GetDinero(){

        await this.btnMenu().click();

        await this.delay(5000);
        if(await this.isElementpresente(this.txtPanel())){
            await this.screenshots1("Antes de recolectar el dinero");
            await this.delay(5000);
        }

        if(await this.isElementpresente(this.btnDinero())){ 
            await this.btnDinero().scrollIntoViewIfNeeded();
            await this.btnDinero().click();
            await this.btnRecoger().click();
            await this.screenshots1("Luego de recolectar el dinero");

        }else{
            console.log("No entro 3");
            await this.btnNoDisponible().scrollIntoViewIfNeeded();
            await this.screenshots1("No esta disponible todavia");

        }
    }

     async screenshots1(valor:string){
        const fecha = await this.dateCarpeta();
        await this.page.screenshot({ path:'./screenshots/'+valor+" "+fecha+'.png',timeout:5000});
    }

    public dateCarpeta(){
        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() +1;
        const year = fechaActual.getFullYear();
     
        var fecha = `${day}-${month}-${year}`;
        return fecha;
      }

    public async isElementpresente(valor:Locator){
        var estado = false;
        try {

            if( await valor.count() >0){
                await valor.isVisible({timeout:50000});
                estado = true;
            }
            
        } catch (error) {
            console.error("Ocurrio un error en la clase isElementpresente",error)
        }
        return estado;
    }

    public async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
      

    //   public async generarPDF(){
    //         try {
    //             await this.page.pdf({
    //                 path: './screenshots/reporte.pdf',
    //                 format: 'A4',   
    //                 printBackground: true,
    //             });
    //             console.log('PDF generado con éxito.');
  
    //         } catch (error) {
    //             console.error("Ocurrio un error en la clase PageDinero metodo generarPDF",error);
    //         }
    //   }
}   