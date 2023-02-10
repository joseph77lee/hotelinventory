import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationSkippedCode, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'hotelinventoryapp';
  @ViewChild('name', { static: true }) name !: ElementRef;
  // role = 'Admin';
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(@Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router) {
    console.log(this.initService.config)
  }
  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log("Navigation Started")
    })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log("Navigation Ended")
    })
    this.loggerService?.log('AppComponent.ngOnInit()')
    this.name.nativeElement.innerText = "Hilton Hotels";
    this.localStorage.setItem('name', "hilton hotel")
  }

  ngAfterViewInit() {
    // const componentRef = this.vcr.createComponent(RoomsComponent);
    //   componentRef.instance.numberOfRooms = 50;
  }

}
