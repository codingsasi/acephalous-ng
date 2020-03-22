import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() items: any[];
  @ViewChild('buildMenu', {static: true}) public buildMenu;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
