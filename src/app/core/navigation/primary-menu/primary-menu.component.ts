import { Component, OnInit } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';

@Component({
  selector: 'app-primary-menu',
  templateUrl: './primary-menu.component.html',
  styleUrls: ['./primary-menu.component.scss']
})
export class PrimaryMenuComponent implements OnInit {
  menuArray: any[];
  siteInfo: any;

  constructor(private resolveService: ResolveService) { }

  ngOnInit() {
    this.resolveService.getMainMenu().subscribe(
      menu => {
        this.menuArray = this.buildMenu(menu);
      }
    );
  }

  buildMenu(menu: any) {
    let menuItems: Array<any> = [];
    menu.forEach(item => {
      menuItems.push({
        key: item.key,
        title: item.title,
        link: item.relative,
        below: (item.below) ? this.buildMenu(item.below) : false
      })
    });
    return menuItems;
  }

  // @TODO
  // Need to refine the implementation and position of site info.
  addSiteInfo() {
    this.resolveService.getSiteInfo().subscribe(
      site => {
        this.siteInfo = {
          name: site.name,
          slogan: site.slogan
        };
      }
    )
  }

}
