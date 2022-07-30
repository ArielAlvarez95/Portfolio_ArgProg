import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabilidadesService } from 'src/app/service/s-habilidades.service';
import { Habilidades } from 'src/model/habilidades';

@Component({
  selector: 'app-new-habilidad',
  templateUrl: './new-habilidad.component.html',
  styleUrls: ['./new-habilidad.component.css']
})
export class NewHabilidadComponent implements OnInit {

  nombreH: string = '';
  porcentajeH: string = '';
  imagenH: string = '';

  constructor(private sHabilidad: HabilidadesService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {    
    const habilidad = new Habilidades(this.nombreH, this.porcentajeH, this.imagenH);
    this.sHabilidad.save(habilidad).subscribe(
      data => {
      alert("Habilidad añadida");
      this.router.navigate(['']);
    }, err => {
      alert("Falló la creación de una nueva habilidad");
      this.router.navigate(['']);
    }
    )
  }
}
