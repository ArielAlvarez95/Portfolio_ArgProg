import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sEducacionService } from 'src/app/service/s-educacion.service';
import { Educacion } from 'src/model/educacion';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {
  nombreD: string = '';
  descripcionD: string = '';

  constructor(private sEducacion: sEducacionService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const educ = new Educacion(this.nombreD, this.descripcionD);
    this.sEducacion.save(educ).subscribe(
      data =>{
        alert("Educacion añadida");
        this.router.navigate(['']);
      }, err =>{
        alert("Falló");
        this.router.navigate(['']);
      }
      )
  }
}
