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
        this.menuArray = this.buildMenu(menu.linkset[0].item);
      }
    );
  }

  buildMenu(menu: any) {
    const menuItems: Array<any> = [];
    menu.forEach(item => {
      menuItems.push({
        title: item.title,
        link: item.href,
        below: (item['drupal-submenu-linkset']) ? this.buildMenu(item['drupal-submenu-linkset'].item) : false
      });
    });
    return menuItems;
  }

  // @todo Need to refine the implementation and position of site info.
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
