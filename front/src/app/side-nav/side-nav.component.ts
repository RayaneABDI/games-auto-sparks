import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {MatListItem, MatNavList} from "@angular/material/list";
import {OverviewComponent} from "../overview/overview.component";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports: [
    MatSidenavModule,
    MatIcon,
    NgOptimizedImage,
    MatNavList,
    MatListItem,
    OverviewComponent
  ],
  standalone: true
})
export class SideNavComponent {
  showFiller = false;
}
