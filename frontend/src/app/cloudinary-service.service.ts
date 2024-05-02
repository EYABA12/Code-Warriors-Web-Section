import { Injectable } from '@angular/core';
// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';
import {CloudConfig, URLConfig} from '@cloudinary/url-gen';


// Import the Cloudinary classes.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryServiceService {

  constructor(private cloudinary: Cloudinary ) {
    // Configuration de Cloudinary avec votre cloudName
    const cloudConfig = new CloudConfig({cloudName: 'dxcoxu3bn'});
    const urlConfig = new URLConfig({secure: true});


  }
}