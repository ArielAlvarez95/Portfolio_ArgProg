import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { persona } from 'src/model/persona.model';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage'
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona("", "", "");
  images: string[];

  constructor(public personaService: PersonaService, private storage: Storage, private tokenService: TokenService) {
    this.images = [];
  }

  isLogged = false;

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => { this.persona = data })
    this.getImages();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.uploadImage;
    }
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagesRef = ref(this.storage, 'images');
    const imgRef = ref(this.storage, `images/${file.name}`);
    console.log(imgRef);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
        this.getImages();
      })
      .catch(error => console.log(error));

    listAll(imagesRef)
      .then(response => {
        console.log(response);
        if (response.items.length > 0) {
          const oldImage = response.items[0]
          const oldImg = ref(this.storage, `images/${oldImage.name}`);
          deleteObject(oldImg)
            .then(response => {
              console.log(response);
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];

        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }

      })
      .catch(error => console.log(error));

  }

}