package com.company.sample;

import com.company.domain.Nota;
import com.company.domain.Student;
import com.company.domain.Tema;
import com.company.service.ServiceNota;
import com.company.validation.ValidationException;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class previewAddWindowController {
    private Stage stage;
    private ServiceNota serviceNota;
    private Tema tema;
    private Student student;
    private Nota nota;
    private double penalizare;
    private boolean motivat;

    @FXML private Button addButton;
    @FXML private Button cancelButton;

    @FXML private TextField temaText;
    @FXML private TextField studentText;
    @FXML private TextField notaText;
    @FXML private TextField penalizareText;
    @FXML private TextField motivatText;

    public previewAddWindowController() {}

    @FXML private void initialize() {}

    public void setService(Stage stage, ServiceNota serviceNota, Tema tema, Student student, Nota nota, double penalizare, boolean motivat) {
        this.stage = stage;
        this.serviceNota = serviceNota;
        this.tema = tema;
        this.student = student;
        this.nota = nota;
        this.penalizare = penalizare;
        this.motivat = motivat;

        fillWithData();
    }

    private void fillWithData() {
        temaText.setText(tema.toString());
        temaText.setEditable(false);

        studentText.setText(student.toString());
        studentText.setEditable(false);

        notaText.setText(String.valueOf(nota.getNota()));
        notaText.setEditable(false);

        if (penalizare > 0) {
            penalizareText.setText(String.valueOf(penalizare));
            penalizareText.setEditable(false);
        }

        if (motivat) {
            motivatText.setText("Studentul a lipsit motivat.");
            motivatText.setEditable(false);
        }
    }

    @FXML
    private void setAddButton() {
        String idTema = tema.getID();
        String idStudent = student.getID();
        double valNota = nota.getNota();
        int saptamanaPredare = nota.getSaptamanaPredare();
        String feedback = nota.getFeedback();

        try {
            int result = serviceNota.saveNota(idStudent, idTema, valNota, saptamanaPredare, feedback);
            if (result == 0) showPopup("Nota existenta!", Alert.AlertType.ERROR);
            else if (result == 1) showPopup("Nota adaugata cu succes!", Alert.AlertType.CONFIRMATION);
        }
        catch(ValidationException ve) {
            showPopup("Nota invalida!", Alert.AlertType.ERROR);
        }
    }

    @FXML
    private void setCancelButton() {
        stage.close();
    }

    private void showPopup(String message, Alert.AlertType alertType) {
        Alert alert = new Alert(alertType);
        alert.setContentText(message);
        alert.show();
    }
}
