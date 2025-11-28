import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';       
import { MatButtonModule } from '@angular/material/button';    
import { MatBadgeModule } from '@angular/material/badge';      
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    MatSidenavModule,
    MatIconModule,      
    MatButtonModule,    
    MatBadgeModule,     
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
}