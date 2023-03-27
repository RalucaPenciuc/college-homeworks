package controller;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;
import model.CazCaritabil;
import model.Donator;
import service.Service;
import utils.CazCaritabilEvent;
import utils.ChangeEventType;
import utils.Observer;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class cazCaritabilWindowController implements Observer<CazCaritabilEvent> {
    private Stage stage;
    private Service service;
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

    public void setService(Stage stage, Service service) {
        this.stage = stage;
        this.service = service;
        this.service.addObserver(this);
        observableList = FXCollections.observableList(StreamSupport.stream(service.findAllCazuriCaritabile().spliterator(), false)
                .collect(Collectors.toList()));
        tableViewCaz.setItems(observableList);
    }

    @Override
    public void update(CazCaritabilEvent cazCaritabilEvent) {
        if (cazCaritabilEvent.getType() == ChangeEventType.UPDATE) {
            observableList.remove(cazCaritabilEvent.getOldData());
            observableList.add(cazCaritabilEvent.getData());
            observableList = FXCollections.observableList(StreamSupport.stream(service.findAllCazuriCaritabile().spliterator(), false).collect(Collectors.toList()));
            tableViewCaz.setItems(observableList);
        }
    }

    @FXML private void addHandler() {
        String id = idCazCaritabil.getText();
        String nume = numeDonator.getText();
        String adresa = adresaDonator.getText();
        String telefon = telefonDonator.getText();
        double suma = Double.parseDouble(sumaDonata.getText());

        int result = service.adaugaDonatie(id, nume, adresa, telefon, suma);
        if (result == 1) {
            Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
            alert.setHeaderText("Confirmation Message");
            alert.setContentText("Donatie adaugata cu succes!");
            alert.show();
        }
        observableList = FXCollections.observableList(StreamSupport.stream(service.findAllCazuriCaritabile().spliterator(), false).collect(Collectors.toList()));
        tableViewCaz.setItems(observableList);
    }

    @FXML private void searchHandler(){
        String nume = searchNume.getText();
        Iterable<Donator> donatori = service.cautaDonatori(nume);
        ObservableList<Donator> obs = FXCollections.observableList(StreamSupport.stream(donatori.spliterator(), false)
                .collect(Collectors.toList()));
        tableViewDonator.setItems(obs);
    }

    @FXML private void logoutHandler() {
        stage.close();
    }

    @FXML private void clickedCazTable() {
        String id = tableViewCaz.getSelectionModel().getSelectedItem().getID();
        idCazCaritabil.setText(id);
    }

    @FXML private void clickedDonatorTable() {
        String nume = tableViewDonator.getSelectionModel().getSelectedItem().getName();
        numeDonator.setText(nume);

        String adresa = tableViewDonator.getSelectionModel().getSelectedItem().getAddress();
        adresaDonator.setText(adresa);

        String telefon = tableViewDonator.getSelectionModel().getSelectedItem().getPhone();
        telefonDonator.setText(telefon);
    }
}
