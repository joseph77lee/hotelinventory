import { HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, Head, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, AfterViewInit, OnDestroy {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  roomList: RoomList[] = [];
  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedrooms: 5,
  };
  selectedRoom!: RoomList;
  title = "Room List";

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error')
  });

  totalBytes = 0;
  subscription!: Subscription;

  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService) {
  }


  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has benen made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          // console.log(event.body);
        }
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }

  ngDoCheck(): void {
  }

  ngAfterViewInit(): void {
    if (this.headerComponent) this.headerComponent.title = "Rooms View"
    if (this.headerChildrenComponent.length > 0) {
      this.headerChildrenComponent.last.title = "Last title"
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Private Suite',
      amenities: 'Air conditioner, Free Wi fi',
      price: 500,
      photos: 'https://unsplash.com/photos/lAx4E6Gl06s',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 6.6,
    };

    this.roomsService.addRooms(room).subscribe(data => {
      this.roomList = data;
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '2',
      roomType: 'Private Suite',
      amenities: 'Air conditioner, Free Wi fi',
      price: 500,
      photos: 'https://unsplash.com/photos/lAx4E6Gl06s',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 6.6,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data
    })
  }

  deleteRoom() {
    this.roomsService.delteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }
}
