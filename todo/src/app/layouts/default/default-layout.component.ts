import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector:    'app-layout',
  templateUrl: './default-layout.component.html',
  styleUrls:   [ './default-layout.component.scss' ]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  options: Options;
  width = window.innerWidth;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this._router = this.router.events
      .filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        // Scroll to top on view load
        document.querySelector('.main-content').scrollTop = 0;
        this.runOnRouteChange();
      });
    this.runOnRouteChange();
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.options = activeRoute.snapshot.data;
    });

    if (this.options.hasOwnProperty('heading')) {
      this.setTitle(this.options.heading);
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle('{^!^} • ' + newTitle);
  }

  @HostListener('window:resize', [ '$event' ])
  onResize(event) {
    if (this.width === event.target.innerWidth) {
      return false;
    }
    this.width = event.target.innerWidth;
  }
}
