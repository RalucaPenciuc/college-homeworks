package com.company.sample;

import com.company.domain.Nota;
import com.company.service.Service;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.stage.Stage;

import java.util.List;

public class filterResultWindowController {
    private Stage stage;
    private List<Nota> note;

    @FXML private TableView filterTable;

    @FXML private TableColumn<Nota, String> idStudentColumn = new TableColumn<>("IdStudent");
    @FXML private TableColumn<Nota, String> idTemaColumn = new TableColumn<>("IdTema");
    @FXML private TableColumn<Nota, Double> notaColumn = new TableColumn<>("Nota");
    @FXML private TableColumn<Nota, Integer> saptPredColumn = new TableColumn<>("SaptamanaPredare");

    @FXML private Button loadDataButton;
    @FXML private Button closeButton;

    public filterResultWindowController() {}

    @FXML private void initialize() {
        idStudentColumn.setCellValueFactory(new PropertyValueFactory<Nota, String>("IdStudent"));
        idTemaColumn.setCellValueFactory(new PropertyValueFactory<Nota, String>("IdTema"));
        notaColumn.setCellValueFactory(new PropertyValueFactory<Nota, Double>("Nota"));
        saptPredColumn.setCellValueFactory(new PropertyValueFactory<Nota, Integer>("SaptamanaPredare"));
    }

    public void setService(Stage stage, List<Nota> note) {
        this.stage = stage;
        this.note = note;
    }

    @FXML
    private void loadData() { filterTable.setItems(FXCollections.observableList(note)); }

    @FXML
    private void close() { stage.close(); }
}
