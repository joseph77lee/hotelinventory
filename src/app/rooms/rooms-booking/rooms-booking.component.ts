import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css']
})
export class RoomsBookingComponent implements OnInit {

  id!: number;
  // id$ !: Observable<number>;
  // id$ = this.router.params.pipe(
  //   map(params => params['id'])
  // );

  id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
    // this.id$ = this.router.params.pipe(
    //   map(params => params['id'])
    // );
    // this.router.paramMap.subscribe((params) => { params.get('id')})
    // this.router.params.subscribe((param) => { this.id = param['id'] })
  }
}
