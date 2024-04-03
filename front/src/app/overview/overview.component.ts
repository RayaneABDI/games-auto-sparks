import { Component } from '@angular/core';
import {ItemListComponent} from "../item-list/item-list.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    ItemListComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
