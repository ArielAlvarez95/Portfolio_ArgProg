package com.portfolioap.argprog.Repository;

import com.portfolioap.argprog.Entity.Habilidades;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RHabilidades extends JpaRepository<Habilidades, Integer> {
    public Optional <Habilidades> findByNombreH(String nombreH);
    public boolean existsByNombreH(String nombreH);
    
} 