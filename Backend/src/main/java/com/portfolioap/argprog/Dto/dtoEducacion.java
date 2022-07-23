package com.portfolioap.argprog.Dto;

import javax.validation.constraints.NotBlank;

public class dtoEducacion {
    @NotBlank
    private String nombreD;
    @NotBlank
    private String descripcionD;

    public dtoEducacion() {
    }

    public dtoEducacion(String nombreD, String descripcionD) {
        this.nombreD = nombreD;
        this.descripcionD = descripcionD;
    }

    public String getNombreD() {
        return nombreD;
    }

    public void setNombreD(String nombreD) {
        this.nombreD = nombreD;
    }

    public String getDescripcionD() {
        return descripcionD;
    }

    public void setDescripcionD(String descripcionD) {
        this.descripcionD = descripcionD;
    }
    
}
