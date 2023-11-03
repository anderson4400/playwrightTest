import { test, expect } from '@playwright/test';
import PageLogin from './support/Pom/PageLogin';
import { PageDinero } from './support/Pom/PageDinero';
import {PageCerrarSeccion} from './support/Pom/PageCerrarSeccion';

const usuarios = "6643908"
const password = "@And440040"

test.beforeEach(async({page}) =>{
  const pageLogin = new PageLogin(page);
  await pageLogin.goto(usuarios,password);
});


test.afterEach(async({page}) =>{
  await page.close();
});

test('Prueba', async ({ page }) => {
 const pageDinero = new PageDinero(page);
 const pageCerrarSeccion = new PageCerrarSeccion(page);
 await pageDinero.GetDinero();
 await pageCerrarSeccion.cerrarSeccion();
  
});