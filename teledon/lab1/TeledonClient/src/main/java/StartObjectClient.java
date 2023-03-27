import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import teledon.network.objectprotocol.TeledonServerObjectProxy;
import teledon.services.ITeledonServer;

import java.io.IOException;
import java.util.Properties;

public class StartObjectClient extends Application {
    private static int defaultPort = 55555;
    private static String defaultServer = "localhost";

    public void start(Stage primaryStage) throws Exception {
        System.out.println("In start");
        Properties clientProps = new Properties();

        try {
            clientProps.load(StartObjectClient.class.getResourceAsStream("/teledonclient.properties"));
            System.out.println("Client properties set. ");
            clientProps.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find client.properties " + e);
            return;
        }

        String serverIP = clientProps.getProperty("teledon.server.host", defaultServer);
        int serverPort = defaultPort;

        try {
            serverPort = Integer.parseInt(clientProps.getProperty("teledon.server.port"));
        } catch(NumberFormatException ex) {
            System.err.println("Wrong port number " + ex.getMessage());
            System.out.println("Using default port: " + defaultPort);
        }

        System.out.println("Using server IP " + serverIP);
        System.out.println("Using server port " + serverPort);

        ITeledonServer server = new TeledonServerObjectProxy(serverIP, serverPort);

        try {
            FXMLLoader loginLoader = new FXMLLoader();
            loginLoader.setLocation(StartObjectClient.class.getResource("mainWindow.fxml"));
            Parent root = loginLoader.load();

            mainWindowController loginController = loginLoader.<mainWindowController>getController();
            loginController.setServer(server);


            FXMLLoader cazLoader = new FXMLLoader();
            cazLoader.setLocation(StartObjectClient.class.getResource("cazCaritabilWindow.fxml"));
            Parent croot = cazLoader.load();

            cazCaritabilWindowController cazController = cazLoader.<cazCaritabilWindowController>getController();
            cazController.setServer(server);

            loginController.setTeledonController(cazController);
            loginController.setParent(croot);


            primaryStage.setTitle("Teledon");
            primaryStage.setScene(new Scene(root));
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
