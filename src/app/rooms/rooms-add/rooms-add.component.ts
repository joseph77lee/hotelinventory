import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0
  }

  successMessage: string = '';

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {

  }

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.resetForm(
        {
          roomType: '',
          amenities: '',
          checkinTime: new Date(),
          checkoutTime: new Date(),
          photos: '',
          price: 0,
          rating: 0
        }

      );
    })
  }
}
