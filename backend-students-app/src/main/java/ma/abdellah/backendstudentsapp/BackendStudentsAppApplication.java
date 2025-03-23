package ma.abdellah.backendstudentsapp;

import ma.abdellah.backendstudentsapp.entities.Payment;
import ma.abdellah.backendstudentsapp.entities.PaymentStatus;
import ma.abdellah.backendstudentsapp.entities.PaymentType;
import ma.abdellah.backendstudentsapp.entities.Student;
import ma.abdellah.backendstudentsapp.repository.PaymentRepository;
import ma.abdellah.backendstudentsapp.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class BackendStudentsAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendStudentsAppApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository) {
		return args -> {
			studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112233").firstName("Abdellah").programId("BDCC").build());
			studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112244").firstName("Ahmed").programId("GLSID").build());
			studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112255").firstName("Zahra").programId("SDIA").build());

			PaymentType[] paymentTypes = PaymentType.values();
			Random random=new Random();

			studentRepository.findAll().forEach(st->{
				int index=random.nextInt(paymentTypes.length);
				for (int i = 0; i < 10; i++) {
					Payment payment=Payment.builder()
							.amount(1000+(int)(Math.random()*1000))
							.date(LocalDate.now())
							.type(paymentTypes[index])
							.status(PaymentStatus.CREATED)
							.file(UUID.randomUUID().toString())
							.student(st)
							.build();
					paymentRepository.save(payment);
				}
			});
		};
	}
}
