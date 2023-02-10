import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('roomid');
    console.log('---', id);
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl({ value: id, disabled: true }, { validators: [Validators.required] }),
        guestEmail: ['', { validators: [Validators.required, Validators.email] }],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { validators: [Validators.required] }],
        guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateSpecialChar('*')]],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        guests: this.fb.array([
          this.addGuestControl()
        ]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      }, { updateOn: 'blur', validators: [CustomValidator.ValidateDate] });


    // this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe(data => { })
    // });
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data));
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => console.log(data))
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('09-Feb-2023'),
      checkoutDate: new Date('11-Feb-2023'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: Validators.required }],
      age: new FormControl(''),
    })
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''))
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport')
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}