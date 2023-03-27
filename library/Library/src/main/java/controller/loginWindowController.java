package controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.io.IOException;

public class loginWindowController {

    @FXML
    private void clickLoginButton() {
        openLibrarianWindow();
        openSubscriberWindow();
    }

    @FXML
    private void openLibrarianWindow() {
        try {
            Stage stage = new Stage();
            stage.setTitle("Librarian");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(loginWindowController.class.getResource("/fxml/librarianWindow.fxml"));

            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));
            librarianWindowController controller = loader.getController();
//        controller.setService(stage, service);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void openSubscriberWindow() {
        try {
            Stage stage = new Stage();
            stage.setTitle("Subscriber");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(loginWindowController.class.getResource("/fxml/subscriberWindow.fxml"));

            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));
            subscriberWindowController controller = loader.getController();
//            controller.setService(stage, service);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
