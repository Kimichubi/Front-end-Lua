import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterOutlet],
  templateUrl: './layout-app.component.html',
  styleUrl: './layout-app.component.css',
})
export class LayoutAppComponent {}
