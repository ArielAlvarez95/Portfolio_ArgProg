import { Component, OnInit } from '@angular/core';
import { sEducacionService } from 'src/app/service/s-educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { Educacion } from 'src/model/educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educ: Educacion[] = [];

  constructor(private sEducacion: sEducacionService, private tokenService: TokenService) { }

  isLogged = false;
  
  ngOnInit(): void {
      this.cargarEducacion();
      if(this.tokenService.getToken()){
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
  }

  cargarEducacion(): void{
    this.sEducacion.lista().subscribe(
      data => {this.educ = data;})
  }

  delete(id?: number){
    if(id != undefined){
      this.sEducacion.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar la experiencia");
        }
      )
    }
}
}