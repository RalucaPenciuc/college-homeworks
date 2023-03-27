import controller.mainWindowController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import repository.*;
import service.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {
        Logger log = LogManager.getLogger();
        log.traceEntry();
        System.out.println("OK");
        log.traceExit();

        Properties serverProperties = new Properties();
        try {
            serverProperties.load(new FileReader("bd.config"));
            System.out.println("Properties set.");

        } catch(IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }

//        Validator<Student> studentValidator = new StudentValidator();
//        Validator<Tema> temaValidator = new TemaValidator();
//        Validator<Nota> notaValidator = new NotaValidator();

        IVoluntarRepository<String, Voluntar> vrepo = new VoluntarRepository(serverProperties);
        ICazCaritabilRepository<String, CazCaritabil> ccrepo = new CazCaritabilRepository(serverProperties);
        IDonatorRepository<String, Donator> drepo = new DonatorRepository(serverProperties);
        IDonatieRepository<Pair<CazCaritabil, Donator>, Donatie> ddrepo = new DonatieRepository(serverProperties);

        Service service = new Service(vrepo, ccrepo, drepo, ddrepo);

        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(Main.class.getResource("fxml/mainWindow.fxml"));
        Parent root = loader.load();
        mainWindowController controller = loader.getController();
        controller.setController(service);

        primaryStage.setTitle("Teledon: Login voluntar");
        primaryStage.setScene(new Scene(root));
        primaryStage.show();

    }

    public static void main(String[] args) {
        launch(args);
    }
}
