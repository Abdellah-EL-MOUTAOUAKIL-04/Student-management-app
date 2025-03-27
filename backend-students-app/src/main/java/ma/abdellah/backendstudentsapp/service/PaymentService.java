package ma.abdellah.backendstudentsapp.service;

import ma.abdellah.backendstudentsapp.dtos.NewPaymentDTO;
import ma.abdellah.backendstudentsapp.entities.Payment;
import ma.abdellah.backendstudentsapp.entities.PaymentStatus;
import ma.abdellah.backendstudentsapp.entities.PaymentType;
import ma.abdellah.backendstudentsapp.entities.Student;
import ma.abdellah.backendstudentsapp.repository.PaymentRepository;
import ma.abdellah.backendstudentsapp.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

//cette annotation permet au démarrage de l'application spring va scanner les classes et chercher les classes annotées par @Service et les instancier automatiquement
@Service
//cette annotation permet de gérer les transactions de cette classe cad ouvrir et fermer les transactions automatiquement
@Transactional
public class PaymentService {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public PaymentService(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        Student student = studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Path path= Paths.get(System.getProperty("user.home"),"students-app-files","payments");
        if(Files.notExists(path)){
            Files.createDirectories(path);
        }

        String fileId= UUID.randomUUID().toString();
        Path filePath=Paths.get(System.getProperty("user.home"),"students-app-files","payments",fileId+".pdf");
        Files.copy(file.getInputStream(),filePath);

        Payment payment=Payment.builder()
                .type(newPaymentDTO.getPaymentType())
                .amount(newPaymentDTO.getAmount())
                .date(newPaymentDTO.getDate())
                .student(student)
                .status(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .build();
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus( PaymentStatus status,  Long paymentId){
        Payment payment=paymentRepository.findById(paymentId).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    public byte[] getPaymentFile(Long paymentId) throws IOException {
        Payment payment=paymentRepository.findById(paymentId).get();
        String filePath=payment.getFile();
        return Files.readAllBytes(Path.of(URI.create(filePath)));
    }
}
