// src/app/core/layout/main-layout/main-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [RouterOutlet, NavbarComponent, SidebarComponent]
})
export class MainLayoutComponent implements OnInit {
  sidebarOpen = true;

  ngOnInit() {
    // en mobile arranca cerrado
    if (window.innerWidth < 768) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onLinkClicked() {
    if (window.innerWidth < 768) {
      this.sidebarOpen = false;
    }
  }
}