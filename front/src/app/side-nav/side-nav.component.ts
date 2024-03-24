import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports: [
    MatSidenavModule,MatButtonModule
  ],
  standalone: true
})
export class SideNavComponent {
  showFiller = false;
}
