import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomList[] = [];
  @Input() title: string = '';
  @Input() price = 0;
  @Output() selectRoom = new EventEmitter<RoomList>();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    // if(changes['title']) {
    //   this.title = changes['title'].currentValue.toUpperCase();
    // }
  }

  selectedRoom(room: RoomList) {
    this.selectRoom.emit(room);
  }
  ngOnDestroy(): void {
    console.log("non Destoryed is called")
  }
}
