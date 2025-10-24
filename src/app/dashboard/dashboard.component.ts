import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { }
