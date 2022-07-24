import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sEducacionService } from 'src/app/service/s-educacion.service';
import { Educacion } from 'src/model/educacion';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {
  educ: Educacion = null;

  constructor(private sEducacion: sEducacionService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sEducacion.detail(id).subscribe(
      data =>{
        this.educ = data;
      }, err =>{
          alert("Error al modificar la educación");
          this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.sEducacion.update(id, this.educ).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
        alert("Error al modificar la educación");
        this.router.navigate(['']);
      }
    )
  }
}
