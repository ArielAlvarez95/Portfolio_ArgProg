package com.portfolioap.argprog.Controller;

import com.portfolioap.argprog.Dto.dtoEducacion;
import com.portfolioap.argprog.Entity.Educacion;
import com.portfolioap.argprog.Service.SEducacion;
import com.portfolioap.argprog.security.Controller.Mensaje;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("educ")
@CrossOrigin(origins = "http://localhost:4200")
public class CEducacion {
    @Autowired
    SEducacion sEducacion;
    
    @GetMapping("/lista")
    public ResponseEntity<List<Educacion>> list(){
        List<Educacion> list = sEducacion.list();
        return new ResponseEntity(list, HttpStatus.OK);
    } 
    
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody dtoEducacion dtoeduc){
        if(StringUtils.isBlank(dtoeduc.getNombreD()))
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(sEducacion.existsByNombreD(dtoeduc.getNombreD()))
            return new ResponseEntity(new Mensaje("Ese estudio ya existe"), HttpStatus.BAD_REQUEST);
        
        Educacion educacion = new Educacion(dtoeduc.getNombreD(), dtoeduc.getDescripcionD());
        sEducacion.save(educacion);
        
        return new ResponseEntity(new Mensaje("Educacion añadida"), HttpStatus.OK);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody dtoEducacion dtoeduc){
        if(!sEducacion.existsById(id))
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        if(sEducacion.existsByNombreD(dtoeduc.getNombreD()) && sEducacion.getByNombreD(dtoeduc.getNombreD()).get().getId() != id)
            return new ResponseEntity(new Mensaje("Ese estudio ya existe"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(dtoeduc.getNombreD()))
            return new ResponseEntity(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        
        Educacion educacion = sEducacion.getOne(id).get();
        educacion.setNombreD(dtoeduc.getNombreD());
        educacion.setDescripcionD((dtoeduc.getDescripcionD()));
        
        sEducacion.save(educacion);
        return new ResponseEntity(new Mensaje("Educacion actualizada"), HttpStatus.OK);
    }
    
    public ResponseEntity<?> delete(@PathVariable("id") int id){
        if(!sEducacion.existsById(id))
            return new ResponseEntity(new Mensaje("El id no existe"), HttpStatus.BAD_REQUEST);
        
        sEducacion.delete(id);
        
        return new ResponseEntity(new Mensaje("Educacion eliminada"), HttpStatus.OK);
    }
}
