package ma.abdellah.backendstudentsapp.dtos;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.abdellah.backendstudentsapp.entities.PaymentType;

import java.time.LocalDate;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class NewPaymentDTO {
    private double amount;
    private PaymentType paymentType;
    private LocalDate date;
    private String studentCode;
}
