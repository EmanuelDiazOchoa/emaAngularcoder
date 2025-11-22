import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: true, 
  imports: [CommonModule, RouterModule] 
})
export class SidebarComponent {

  constructor(public auth: AuthService) {}

}
