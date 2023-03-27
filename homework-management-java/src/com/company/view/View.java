package com.company.view;

import com.company.domain.Student;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.shape.Box;
import com.company.validation.ValidationException;

import java.awt.event.ActionEvent;

public class View {

    private TableView<Student> tableView;
    private TextField idText;
    private TextField numeText;
    private TextField grupaText;
    private Controller controller;

    //StackPane
    //GreedPane
    //Box
    public View(Controller controller){
        tableView = new TableView<>();
        this.controller = controller;
    }

    public BorderPane getView(){
        BorderPane borderPane = new BorderPane();
        borderPane.setLeft(createTable());
        borderPane.setRight(createTask());
        return borderPane;
    }

    private void initTableView(){
        tableView.setItems(controller.getList());

        TableColumn<Student, String> idColumn = new TableColumn<>("Id");
        TableColumn<Student, String> numeColumn = new TableColumn<>("Nume");
        TableColumn<Student, String> grupaColumn = new TableColumn<>("Grupa");

        tableView.getColumns().addAll(idColumn, numeColumn, grupaColumn);

        idColumn.setCellValueFactory(new PropertyValueFactory<Student, String>("ID"));
        numeColumn.setCellValueFactory(new PropertyValueFactory<Student, String>("Nume"));
        grupaColumn.setCellValueFactory(new PropertyValueFactory<Student, String>("Grupa"));
        tableView.getSelectionModel().selectedItemProperty().addListener((observer, oldData, newData)-> showDetails(newData));
    }

    private void showDetails(Student student){
        if(student != null){
            idText.setText(student.getID());
            numeText.setText(student.getNume());
            grupaText.setText(String.valueOf(student.getGrupa()));
        }
    }

    private StackPane createTable(){
        StackPane stackPane = new StackPane();
        stackPane.getChildren().add(tableView);
        initTableView();
        return stackPane;
    }

    private GridPane createTask(){
        GridPane gridPane = new GridPane();
        gridPane.add(new Label("Id"), 0, 0);
        gridPane.add(idText = new TextField(), 1, 0);
        gridPane.add(new Label("Nume"), 0, 1);
        gridPane.add(numeText = new TextField(), 1, 1);
        gridPane.add(new Label("Grupa"), 0, 2);
        gridPane.add(grupaText = new TextField(), 1, 2);

        HBox buttonsBox = new HBox();
        Button add = new Button("Add");
        add.setOnAction(event -> {
            this.addHandler();
        });
        buttonsBox.getChildren().add(add);
        Button clearAll = new Button("Clear All");
        clearAll.setOnAction(event -> {
            this.clearAllHandler();
        });
        buttonsBox.getChildren().add(clearAll);

        Button update = new Button("Update");
        update.setOnAction(event -> {
            this.updateHandler();
        });
        buttonsBox.getChildren().add(update);
        Button delete = new Button("Delete");
        delete.setOnAction(event -> {
            this.deleteHandler();
        });
        buttonsBox.getChildren().add(delete);
        gridPane.add(buttonsBox, 0, 4,2, 1);
        return gridPane;
    }

    private void addHandler(){
        try {
            controller.addStudent(idText.getText(), numeText.getText(), Integer.parseInt(grupaText.getText()));
        } catch (ValidationException e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setHeaderText("Task error");
            alert.setContentText(e.getMessage());
            alert.show();
        }
    }
    private void deleteHandler(){
        try {
            controller.deleteStudent(idText.getText());
        } catch (ValidationException e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setHeaderText("Task error");
            alert.setContentText(e.getMessage());
            alert.show();
        }
    }

    private void clearAllHandler(){
        idText.setText("");
        numeText.setText("");
        grupaText.setText("");
    }

    private void updateHandler(){
        try {
            controller.updateStudent(idText.getText(), numeText.getText(), Integer.parseInt(grupaText.getText()));
        } catch (ValidationException e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setHeaderText("Task error");
            alert.setContentText(e.getMessage());
            alert.show();
        }
    }
}
