import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { PanierComponent } from './panier/panier.component';
import { TestArticlesCrudComponent } from './TestCrud/test-articles-crud/test-articles-crud.component';
import { AuthGuard } from './Services/auth.guard';
import { ProtectedComponent } from './protected/protected.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
 // { path: 'footer', component: FooterComponent },
 // { path: 'header', component: HeaderComponent },
 // { path: 'carousel', component: CarouselComponent },
 // { path: 'navbar', component: NavbarComponent },
 // { path: 'card', component: CardComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
  { path: 'product/:id', component: ProductComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'testcrudart', component: TestArticlesCrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
