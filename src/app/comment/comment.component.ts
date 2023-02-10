import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  // comments$ =this.commentsService.getComments();
  comments$ = this.activatedRoute.data.pipe(
    map((data) => data['comments'])
  )
  constructor(private commentsService: CommentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data => console.log(data['comments']))
  }
}
