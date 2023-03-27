package com.company.sample;

import com.company.domain.Student;
import com.company.service.Service;
import com.company.validation.ValidationException;
import com.company.view.ChangeEventType;
import com.company.view.Observer;
import com.company.view.StudentEvent;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class studentWindowController implements Observer<StudentEvent> {
    private Stage stage;
    private Service service;
    private ObservableList<Student> observableList;

    @FXML private TableView<Student> tableView;

    @FXML private Button addButton;
    @FXML private Button removeButton;
    @FXML private Button updateButton;

    @FXML private TableColumn<Student, String> idColumn = new TableColumn<>("ID");
    @FXML private TableColumn<Student, String> numeColumn = new TableColumn<>("Nume");
    @FXML private TableColumn<Student, Integer> grupaColumn = new TableColumn<>("Grupa");

    public studentWindowController(){}

    @FXML
    private void initialize() {
        idColumn.setCellValueFactory(new PropertyValueFactory<Student, String>("ID"));
        numeColumn.setCellValueFactory(new PropertyValueFactory<Student, String>("Nume"));
        grupaColumn.setCellValueFactory(new PropertyValueFactory<Student, Integer>("Grupa"));
    }

    public void setService(Stage stage, Service service) {
        this.stage = stage;
        this.service = service;
        this.service.addObserver(this);
    }

    @Override
    public void update(StudentEvent studentEvent) {
        if(studentEvent.getType() == ChangeEventType.ADD){
            observableList.add(studentEvent.getData());
        }
        if(studentEvent.getType() == ChangeEventType.DELETE){
            observableList.remove(studentEvent.getData());
        }
        if(studentEvent.getType() == ChangeEventType.UPDATE){
            observableList.remove(studentEvent.getOldData());
            observableList.add(studentEvent.getData());
            tableView.refresh();
        }
    }

    @FXML
    private void loadData() {
        observableList = FXCollections.observableList(StreamSupport.stream(service.findAllStudents().spliterator(), false).collect(Collectors.toList()));
        tableView.setItems(observableList);
    }

    @FXML
    private void addHandler() { newWindow(new Student("", "", 0)); }

    @FXML
    private void deleteHandler() {
        Student student = tableView.getSelectionModel().getSelectedItem();

        if (student == null) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Niciun student selectat!");
            alert.show();
        }
        else {
            service.deleteStudent(student.getID());
        }
    }

    @FXML
    private void updateHandler() {
        Student student = tableView.getSelectionModel().getSelectedItem();

        if (student == null) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setContentText("Niciun student selectat!");
            alert.show();
        }
        else {
            newWindow(student);
        }
    }

    private void newWindow(Student student) {
        try {
            Stage stage = new Stage();
            stage.setTitle("Edit Student");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(studentWindowController.class.getResource("editStudent.fxml"));
            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));

            editStudentController controller = loader.getController();
            controller.setService(stage, service, student);

            stage.show();
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
}
