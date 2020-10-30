import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
 _user : User;
 galleryOptions: NgxGalleryOptions[];
 galleryImages: NgxGalleryImage[];
  constructor(private _userService: UserService, private _alertify: AlertifyService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(data =>{
      this._user = data['user']
    });

    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          thumbnailsColumns: 4,
          imagePercent: 100,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }
    ];

    this.galleryImages = this.getImages()

  }

  getImages(){
    const imgUrl = [];
    for (const photo of this._user.photo) {
      imgUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      })
    }
    return imgUrl;
  }

  // no longer require since we have resolvers
  // loadUser(){
  //   this._userService.getUser(+this._activatedRoute.snapshot.params['id'])//add + to convert string 'id' to integer
  //   .subscribe((userDetail: User) =>{
  //     this._user = userDetail
  //   }, error =>{
  //     this._alertify.error(error);
      
  //   })
  // }

}
