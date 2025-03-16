package ma.abdellah.backendstudentsapp.web;

import ma.abdellah.backendstudentsapp.entities.Payment;
import ma.abdellah.backendstudentsapp.entities.PaymentStatus;
import ma.abdellah.backendstudentsapp.entities.PaymentType;
import ma.abdellah.backendstudentsapp.entities.Student;
import ma.abdellah.backendstudentsapp.repository.PaymentRepository;
import ma.abdellah.backendstudentsapp.repository.StudentRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
public class StudentRestController {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public StudentRestController(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/payments")
    public List<Payment> allPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/payments/{id}")
    public Payment findById(@PathVariable Long id){
        return paymentRepository.findById(id).get();
    }

    @GetMapping("/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/students/{id}")
    public Student findById(@PathVariable String Id){
        return studentRepository.findById(Id).get();
    }

    @GetMapping("/students/{code}/payments")
    public List<Payment> findByStudentCode(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }

    @PostMapping(value = "/payments",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam MultipartFile file,
                               @RequestParam LocalDate date,@RequestParam  double amount,@RequestParam PaymentType type,@RequestParam String studentCode) throws IOException {
        Student student = studentRepository.findByCode(studentCode);
        Path path= Paths.get(System.getProperty("user.home"),"students-app-files","payments");
        if(Files.notExists(path)){
            Files.createDirectories(path);
        }

        String fileId= UUID.randomUUID().toString();
        Path filePath=Paths.get(System.getProperty("user.home"),"students-app-files","payments",fileId+".pdf");
        Files.copy(file.getInputStream(),filePath);

        Payment payment=Payment.builder()
                .type(type)
                .amount(amount)
                .date(date)
                .student(student)
                .status(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .build();
        return paymentRepository.save(payment);
    }

    @GetMapping(value = "/paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        Payment payment=paymentRepository.findById(paymentId).get();
        String filePath=payment.getFile();
        return Files.readAllBytes(Path.of(URI.create(filePath)));
    }
}
