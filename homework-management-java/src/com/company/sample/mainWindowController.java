package com.company.sample;

import com.company.service.Service;
import com.company.service.ServiceNota;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.IOException;

public class mainWindowController {
    private Service service;
    private ServiceNota serviceNota;

    public void setController(Service service, ServiceNota serviceNota) {
        this.service = service;
        this.serviceNota = serviceNota;
    }

    @FXML
    private void clickStudentButton() {
        newWindowStudent();
    }

    @FXML
    private void newWindowStudent() {
        try {
            Stage stage = new Stage();
            stage.setTitle("Studenti");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(mainWindowController.class.getResource("studentWindow.fxml"));

            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));
            studentWindowController controller = loader.getController();
            controller.setService(stage, service);
            stage.show();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    @FXML
    private void clickNoteButton() { newWindowNote(); }

    private void newWindowNote() {
        try {
            Stage stage = new Stage();
            stage.setTitle("Note");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(mainWindowController.class.getResource("notaWindow.fxml"));

            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));
            notaWindowController controller = loader.getController();
            controller.setService(stage, service, serviceNota);
            stage.show();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
}