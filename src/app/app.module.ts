import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarberComponent } from './header-barber/header-barber.component';
import { OpisBarberComponent } from './opis-barber/opis-barber.component';
import { RezerwujWizyteComponent } from './rezerwuj-wizyte/rezerwuj-wizyte.component';
import { FormularzOsobowyComponent } from './formularz-osobowy/formularz-osobowy.component';
import { StopkaComponent } from './stopka/stopka.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarberComponent,
    OpisBarberComponent,
    RezerwujWizyteComponent,
    FormularzOsobowyComponent,
    StopkaComponent,
    LoginComponentComponent,
    RegisterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe,
    FormularzOsobowyComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
