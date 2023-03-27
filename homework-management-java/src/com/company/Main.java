package com.company;

import com.company.domain.Nota;
import com.company.domain.Student;
import com.company.domain.Tema;
import com.company.repository.NotaXMLRepository;
import com.company.repository.StudentXMLRepository;
import com.company.repository.TemaXMLRepository;
import com.company.service.Service;
import com.company.service.ServiceNota;
import com.company.validation.NotaValidator;
import com.company.validation.StudentValidator;
import com.company.validation.TemaValidator;
import com.company.validation.Validator;
import com.company.view.Controller;
import com.company.view.View;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.time.LocalDate;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        Validator<Student> studentValidator = new StudentValidator();
        Validator<Tema> temaValidator = new TemaValidator();
        Validator<Nota> notaValidator = new NotaValidator();

        StudentXMLRepository studentXMLRepo = new StudentXMLRepository(studentValidator, "studenti.xml");
        TemaXMLRepository temaXMLRepo = new TemaXMLRepository(temaValidator, "teme.xml");
        NotaXMLRepository notaXMLRepo = new NotaXMLRepository(notaValidator, "note.xml");

        Service service = new Service(studentXMLRepo, temaXMLRepo, notaXMLRepo);
        ServiceNota serviceNota = new ServiceNota(studentXMLRepo, temaXMLRepo, notaXMLRepo);

        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(Main.class.getResource("sample/mainWindow.fxml"));
        Parent root = loader.load();
        com.company.sample.mainWindowController controller = loader.getController();
        controller.setController(service, serviceNota);

        primaryStage.setTitle("Catalog");
        primaryStage.setScene(new Scene(root));
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
