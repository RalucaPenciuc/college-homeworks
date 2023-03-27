package com.company.sample;

import com.company.domain.Student;
import com.company.service.Service;
import com.company.validation.ValidationException;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class editStudentController {
    private Stage stage;
    private Service service;
    private Student currentStudent;

    @FXML private Button functionButton;
    @FXML private Button clearAllButton;
    @FXML private Button cancelButton;

    @FXML private TextField idText;
    @FXML private TextField numeText;
    @FXML private TextField grupaText;

    public editStudentController(){}

    @FXML private void initialize() {}

    public void setService(Stage stage, Service service, Student student) {
        this.stage = stage;
        this.service = service;
        this.currentStudent = student;

        fillWithData();
    }

    private void fillWithData() {
        if (currentStudent.getID().equals("")) {
            functionButton.setText("Adaugare");
        }
        else {
            functionButton.setText("Modificare");

            idText.setText(currentStudent.getID());
            idText.setEditable(false);

            fillTextFields();
        }
    }

    private void fillTextFields() {
        numeText.setText(currentStudent.getNume());
        grupaText.setText(String.valueOf(currentStudent.getGrupa()));
    }

    @FXML
    private void functionButtonHandler() {
        try {
            if (currentStudent.getID().equals("")) {
                service.saveStudent(idText.getText(), numeText.getText(), Integer.parseInt(grupaText.getText()));
            }
            else {
                service.updateStudent(idText.getText(), numeText.getText(), Integer.parseInt(grupaText.getText()));

            }
        }
        catch (ValidationException ve) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setHeaderText("Error Message");
            alert.setContentText(ve.getMessage());
            alert.show();
        }
    }

    @FXML
    private void clearAllHandler() {
        if (functionButton.getText().equals("Adaugare")) {
            idText.setText("");
            numeText.setText("");
            grupaText.setText("");
        }
        else {
            fillTextFields();
        }
    }

    @FXML
    private void cancelHandler() {
        stage.close();
    }
}
