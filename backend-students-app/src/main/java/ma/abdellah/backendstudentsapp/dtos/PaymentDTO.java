package ma.abdellah.backendstudentsapp.dtos;


import lombok.*;
import ma.abdellah.backendstudentsapp.entities.PaymentStatus;
import ma.abdellah.backendstudentsapp.entities.PaymentType;
import ma.abdellah.backendstudentsapp.entities.Student;

import java.time.LocalDate;
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class PaymentDTO {
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status=PaymentStatus.CREATED;
}
