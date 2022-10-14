import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarModule } from './navbar/navbar.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { NotificadorService } from 'src/shared/notificador.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,


    CoreModule,
    AuthModule,
    NavbarModule,
    ToastrModule.forRoot(),
  ],
  providers: [NotificadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
