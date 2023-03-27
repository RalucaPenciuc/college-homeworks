import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;
import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;
import teledon.model.Donator;
import teledon.model.Voluntar;
import teledon.services.ITeledonObserver;
import teledon.services.ITeledonServer;
import teledon.services.TeledonException;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class cazCaritabilWindowController implements ITeledonObserver {
    private Stage stage;
    private ITeledonServer server;
    private Voluntar user;
    private ObservableList<CazCaritabil> observableList;

    @FXML private TableView<CazCaritabil> tableViewCaz;
    @FXML private TableView<Donator> tableViewDonator;
    @FXML private TableColumn<CazCaritabil, String> idColumn = new TableColumn<>("ID");
    @FXML private TableColumn<CazCaritabil, Double> sumaColumn = new TableColumn<>("SumaTotala");
    @FXML private TableColumn<Donator, String> idDColumn = new TableColumn<>("IDD");
    @FXML private TableColumn<Donator, String> numeDColumn = new TableColumn<>("Nume");
    @FXML private TableColumn<Donator, String> adresaDColumn = new TableColumn<>("Adresa");
    @FXML private TableColumn<Donator, String> telefonDColumn = new TableColumn<>("Telefon");
    @FXML private Button adaugaDonatieButton;
    @FXML private Button cautaDonatorButton;
    @FXML private Button logoutButton;
    @FXML private TextField idCazCaritabil;
    @FXML private TextField numeDonator;
    @FXML private TextField adresaDonator;
    @FXML private TextField telefonDonator;
    @FXML private TextField sumaDonata;
    @FXML private TextField searchNume;

    public cazCaritabilWindowController() {}

    @FXML private void initialize() {
        idColumn.setCellValueFactory(new PropertyValueFactory<>("ID"));
        sumaColumn.setCellValueFactory(new PropertyValueFactory<>("totalSum"));

        idDColumn.setCellValueFactory(new PropertyValueFactory<>("ID"));
        numeDColumn.setCellValueFactory(new PropertyValueFactory<>("Name"));
        adresaDColumn.setCellValueFactory(new PropertyValueFactory<>("Address"));
        telefonDColumn.setCellValueFactory(new PropertyValueFactory<>("Phone"));
    }

    public void setService(Stage stage, ITeledonServer server) {
        this.stage = stage;
        this.server = server;
        try {
            observableList = FXCollections.observableList(StreamSupport.stream(server.findAllCazuriCaritabile().spliterator(), false)
                    .collect(Collectors.toList()));
        } catch (TeledonException e) {
            e.printStackTrace();
        }
        tableViewCaz.setItems(observableList);
    }

    public void setServer(ITeledonServer server) {
        this.server = server;
    }

    public void setUser(Voluntar user) {
        this.user = user;
    }

    @FXML private void addHandler() {
        int id = Integer.parseInt(idCazCaritabil.getText());
        String nume = numeDonator.getText();
        String adresa = adresaDonator.getText();
        String telefon = telefonDonator.getText();
        double suma = Double.parseDouble(sumaDonata.getText());

        DTODonatie donatieDTO = new DTODonatie(id, nume, adresa, telefon, suma);
        try {
            System.out.println(this);

            server.adaugaDonatie(donatieDTO);

            Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
            alert.setHeaderText("Confirmation Message");
            alert.setContentText("Donatie adaugata cu succes!");
            alert.show();

        } catch (TeledonException e) {
            e.printStackTrace();
        }
    }

    @FXML private void searchHandler(){
        String nume = searchNume.getText();
        Iterable<Donator> donatori;
        try {
            donatori = server.cautaDonatori(nume);
            ObservableList<Donator> obs = FXCollections.observableList(StreamSupport.stream(donatori.spliterator(), false)
                    .collect(Collectors.toList()));
            tableViewDonator.setItems(obs);

        } catch (TeledonException e) {
            e.printStackTrace();
        }
    }

    public void logout() {
        try {
            server.logout(user, this);
        } catch (TeledonException e) {
            System.out.println("Logout error " + e);
        }
    }

    @FXML private void logoutHandler(ActionEvent actionEvent) {
        logout();
        ((Node)(actionEvent.getSource())).getScene().getWindow().hide();
        System.exit(0);
    }

    @FXML private void clickedCazTable() {
        String idCaz = tableViewCaz.getSelectionModel().getSelectedItem().getID().toString();
        idCazCaritabil.setText(idCaz);
    }

    @FXML private void clickedDonatorTable() {
        String nume = tableViewDonator.getSelectionModel().getSelectedItem().getName();
        numeDonator.setText(nume);

        String adresa = tableViewDonator.getSelectionModel().getSelectedItem().getAddress();
        adresaDonator.setText(adresa);

        String telefon = tableViewDonator.getSelectionModel().getSelectedItem().getPhone();
        telefonDonator.setText(telefon);
    }

    @Override
    public void updateCazuriList(Iterable<CazCaritabil> cazuri) throws TeledonException {
        System.out.println("CAZURILE SUNT ");
        for(CazCaritabil caz : cazuri) {
            System.out.println(caz);
        }
        System.out.println(this);

        System.out.println("Update gui - begin");

        observableList = FXCollections.observableList(StreamSupport.stream(cazuri.spliterator(), false).collect(Collectors.toList()));
        tableViewCaz.setItems(observableList);
        tableViewCaz.refresh();

        System.out.println("Updated gui - done");
    }
}
