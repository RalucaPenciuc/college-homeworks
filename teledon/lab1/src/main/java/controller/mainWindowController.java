package controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import service.Service;

import java.io.IOException;

public class mainWindowController {
    private Service service;

    @FXML private TextField numeUtilizator;
    @FXML private PasswordField parolaUtilizator;
    @FXML private Button loginButton;

    public void setController(Service service) {
        this.service = service;
    }

    @FXML
    private void clickLoginButton() {
        openVoluntarWindow();
    }

    @FXML
    private void openVoluntarWindow() {
        try {
            String nume = numeUtilizator.getText();
            String parola = parolaUtilizator.getText();
            int result = service.login(nume, parola);

            if (result == 1) {
                Stage stage = new Stage();
                stage.setTitle("Teledon");

                FXMLLoader loader = new FXMLLoader();
                loader.setLocation(mainWindowController.class.getResource("/fxml/cazCaritabilWindow.fxml"));

                AnchorPane root = loader.load();

                stage.setScene(new Scene(root));
                cazCaritabilWindowController controller = loader.getController();
                controller.setService(stage, service);
                stage.show();
            }
            else if (result == 0) {
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setHeaderText("Error Message");
                alert.setContentText("Parola gresita!");
                alert.show();
            }
            else {
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setHeaderText("Error Message");
                alert.setContentText("Utilizator inexistent!");
                alert.show();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
}
