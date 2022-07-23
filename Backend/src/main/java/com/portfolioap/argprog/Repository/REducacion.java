
package com.portfolioap.argprog.Repository;

import com.portfolioap.argprog.Entity.Educacion;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface REducacion extends JpaRepository<Educacion, Integer> {
    public Optional<Educacion> findByNombreD(String nombreD);
    public boolean existsByNombreD(String nombreD);
}
