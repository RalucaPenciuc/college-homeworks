import controller.loginWindowController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {
        Logger log = LogManager.getLogger();
        log.traceEntry();
        System.out.println("OK");
        log.traceExit();

//        Properties serverProperties = new Properties();
//        try {
//            serverProperties.load(new FileReader("bd.config"));
//            System.out.println("Properties set.");
//
//        } catch(IOException e) {
//            System.out.println("Cannot find bd.config " + e);
//        }

        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(Main.class.getResource("fxml/loginWindow.fxml"));
        Parent root = loader.load();
        loginWindowController controller = loader.getController();
//        controller.setController(service);

        primaryStage.setTitle("Library");
        primaryStage.setScene(new Scene(root));
        primaryStage.show();

    }

    public static void main(String[] args) {
        launch(args);
    }
}