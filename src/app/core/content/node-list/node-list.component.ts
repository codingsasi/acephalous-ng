import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResolveService } from '../../services/resolve.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent implements OnInit, OnDestroy {
  public nodes: any[];
  public rowHeight = '600px'; // To set rowHeight for responsive displays
  watcher: Subscription;

  constructor(private resolveService: ResolveService, private mediaObserver: MediaObserver) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.rowHeight = '350px';
      }
      if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.rowHeight = '400px';
      }
      if (change.mqAlias === 'lg') {
        this.rowHeight = '400px';
      }
      if (change.mqAlias === 'xl') {
        this.rowHeight = '450px';
      }
    });
  }
  private baseUrl = environment.apiUrl;

  ngOnInit() {
    this.resolveService.getNodes().subscribe(
      nodes => {
        this.nodes = this.buildnodesObject(nodes);
      },
    )
  }

  buildnodesObject(nodes) {
    const nodesArray: Array<any> = [];
    nodes.forEach(node => {
      nodesArray.push({
        id: node.nid[0].value,
        type: node.type[0].target_id,
        title: node.title[0].value,
        summary: (node.body[0].summary.length === 0) ?
          node.body[0].value.substr(0, 500).replace(/<\/?[^>]+(>|$)/g, '')
          : node.body[0].summary,
        created: node.created[0].value,
        image: node.field_image[0].url,
        tags: this.getTags(node.field_tags),
        user: '',
        path: (node.path[0].alias.length === 0) ? 'node/' + node.nid[0].value
          : node.path[0].alias,
      });
    });
    return nodesArray;
  }

  buildUserUrl() {
    const nodes = this.nodes;
    nodes.forEach((node, i) => {
      this.resolveService.getUser(node.id, node.type).subscribe(
        user => {
          this.nodes[i].user = user.data.attributes.name;
        }
      )
    });
  }

  private getTags(tagsArray: any) {
    const tags: Array<any> = [];
    tagsArray.forEach(tag => {
      this.resolveService.getTag(tag.url).subscribe(
        _tag => {
          tags.push({
            title: _tag.name[0].value,
            url: _tag.path[0].alias,
          });
        }
      )
    });
    return tags;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
