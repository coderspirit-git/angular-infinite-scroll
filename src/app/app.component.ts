import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
 }
 allpost;
 notEmptyPost = true;
 notscrolly = true;
  ngOnInit() {
    this.loadInitPost();
 }
 // load the Initial 6 posts
 loadInitPost() {
  const url = 'http://tlino.96.lt/api/getblogpost';
  this.http.get(url).subscribe(data => {
    console.log(data);
    this.allpost = data[0];
  });
}
onScroll() {
if (this.notscrolly && this.notEmptyPost) {
  this.spinner.show();
  this.notscrolly = false;
  this.loadNextPost();
 }
}
// load th next 6 posts
loadNextPost() {
  const url = 'http://tlino.96.lt/api/getnextpost';
  // return last post from the array
  const lastPost = this.allpost[this.allpost.length - 1];
  // get id of last post
  const lastPostId = lastPost.id;
  // sent this id as key value pare using formdata()
  const dataToSend = new FormData();
  dataToSend.append('id', lastPostId);
  // call http request
  this.http.post(url, dataToSend)
  .subscribe( (data: any) => {
     const newPost = data[0];
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allpost = this.allpost.concat(newPost);
     this.notscrolly = true;
   });
}
}
