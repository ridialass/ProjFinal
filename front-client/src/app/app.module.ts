import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthInterceptor } from './Services/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { RegisterComponent } from './register/register.component';
 

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CarouselComponent,
    NavbarComponent,
    CardComponent,
    HomeComponent,
    ProductComponent,
    BasketComponent,
    PanierComponent,
    TestArticlesCrudComponent,
    LoginComponent,
    ProtectedComponent,
    RegisterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
