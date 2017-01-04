import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import {Camera} from 'ionic-native';


@Injectable()
export class ImageUploadService {
  constructor (private http: Http) {

  }

  takePicture(){
    return Camera.getPicture({
      quality : 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(imageData => {
      return imageData;
    });
  }

  getPicture(){
    return  Camera.getPicture({
      quality : 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit : true,
    }).then(imageData => {
      return imageData;
    });
  }
}
