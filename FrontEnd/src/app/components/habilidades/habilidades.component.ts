import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from 'src/app/service/s-habilidades.service';
import { TokenService } from 'src/app/service/token.service';
import { Habilidades } from 'src/model/habilidades';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidad: Habilidades[] = [];
  
  constructor(private sHabilidades: HabilidadesService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarSkills(): void {
    this.sHabilidades.lista().subscribe(data => { this.habilidad = data; });
  }

  delete(id?: number) {
    if (id != undefined) {
      this.sHabilidades.delete(id).subscribe(
        data => {
          this.cargarSkills();
        }, err => {
          alert("no se pudo borrar la 'habilidad'");

        }
      )
    }
  }
}