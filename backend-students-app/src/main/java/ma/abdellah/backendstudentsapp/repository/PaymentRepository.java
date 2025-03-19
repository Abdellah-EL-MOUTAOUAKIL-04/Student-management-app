package ma.abdellah.backendstudentsapp.repository;

import ma.abdellah.backendstudentsapp.entities.Payment;
import ma.abdellah.backendstudentsapp.entities.PaymentStatus;
import ma.abdellah.backendstudentsapp.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);
}