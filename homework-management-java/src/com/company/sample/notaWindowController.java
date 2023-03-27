package com.company.sample;

import com.company.domain.Nota;
import com.company.domain.Pair;
import com.company.domain.Student;
import com.company.domain.Tema;
import com.company.service.Service;
import com.company.service.ServiceNota;
import com.company.view.ChangeEventType;
import com.company.view.NotaEvent;
import com.company.view.Observer;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import org.controlsfx.control.textfield.TextFields;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class notaWindowController implements Observer<NotaEvent> {
    private Stage stage;
    private Service service;
    private ServiceNota serviceNota;
    private ObservableList<Nota> observableList;

    @FXML private TextField numeText;
    @FXML private TextField notaText;

    @FXML private TextArea feedbackText;

    @FXML private CheckBox motivatCheck;

    @FXML private Button addButton;
    @FXML private Button resultFilter1;
    @FXML private Button resultFilter2;
    @FXML private Button resultFilter3;
    @FXML private Button resultFilter4;

    @FXML private ComboBox<Tema> comboTema = new ComboBox<>();
    @FXML private ComboBox<Tema> comboTemaFilter1;
    @FXML private ComboBox<Student> comboStudentFilter2;
    @FXML private ComboBox<Integer> comboGrupaFilter3;
    @FXML private ComboBox<Tema> comboTemaFilter3;

    @FXML private DatePicker beginDate;
    @FXML private DatePicker endDate;

    public notaWindowController() {}

    @FXML private void initialize() {}

    public void setService(Stage stage, Service service, ServiceNota serviceNota) {
        this.stage = stage;
        this.service = service;
        this.serviceNota = serviceNota;
        this.serviceNota.addObserver(this);
    }

    @Override
    public void update(NotaEvent notaEvent) {
        if (notaEvent.getType() == ChangeEventType.ADD) {
            observableList.add(notaEvent.getData());
        }
    }

    @FXML
    private void loadData() {
        observableList = FXCollections.observableList(StreamSupport.stream(serviceNota.findAllNote().spliterator(), false).collect(Collectors.toList()));

        comboTema.setItems(FXCollections.observableList(toTemeList()));
        comboTema.getSelectionModel().select(getTemaCurenta());
        comboTemaFilter1.setItems(FXCollections.observableList(toTemeList()));
        comboStudentFilter2.setItems(FXCollections.observableList(toStudentsList()));
        comboTemaFilter3.setItems(FXCollections.observableList(toTemeList()));
        comboGrupaFilter3.setItems(FXCollections.observableList(getGrupe()));

        beginDate.setValue(LocalDate.of(2018,12,17));
        endDate.setValue(LocalDate.of(2018,12,23));
    }

    @FXML
    private void searchBar() { TextFields.bindAutoCompletion(numeText, toStudentsList()); }

    @FXML
    private void setFeedback() {
        if (getPenalizare() > 0) {
            feedbackText.setText("Nota a fost diminuata cu " + getPenalizare() + " puncte datorita intarzierilor!");
        }
    }

    @FXML
    private void addNota() {
        try {
            Stage stage = new Stage();
            stage.setTitle("Preview Adauga Nota");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(notaWindowController.class.getResource("previewAddWindow.fxml"));

            AnchorPane root = loader.load();

            Student student = toObject(numeText.getText());
            Tema tema = comboTema.getSelectionModel().getSelectedItem();

            double valNota = Double.parseDouble(notaText.getText());
            setFeedback();
            Nota nota = new Nota(new Pair(student.getID(), tema.getID()), valNota, getCurrentWeek(), feedbackText.getText());

            double penalizare = getPenalizare();
            boolean motivat = motivatCheck.isSelected();

            if (motivat) penalizare = penalizare - 2.5;

            if (penalizare > 5) showPopup("Tema nu mai poate fi predata!", Alert.AlertType.ERROR);
            else {
                stage.setScene(new Scene(root));
                previewAddWindowController controller = loader.getController();
                controller.setService(stage, serviceNota, tema, student, nota, penalizare, motivat);
                stage.show();
            }

        }
        catch (IOException ioe) {
            ioe.printStackTrace();
        }
        catch (NumberFormatException nfe) {
            showPopup("Valoarea notei invalida!", Alert.AlertType.ERROR);
        }
    }

    @FXML
    private void setResultFilter1() {
        List<Nota> result = new ArrayList<>();
        Tema tema = comboTema.getSelectionModel().getSelectedItem();

        for (Nota nota : toNoteList()) {
            if (nota.getID().getObject2().equals(tema.getID())) {
                result.add(nota);
            }
        }
        openResultWindow(result);
    }

    @FXML
    private void setResultFilter2() {
        List<Nota> result = new ArrayList<>();
        Student student = comboStudentFilter2.getSelectionModel().getSelectedItem();

        for (Nota nota : toNoteList()) {
            if (nota.getID().getObject1().equals(student.getID())) {
                result.add(nota);
            }
        }
        openResultWindow(result);
    }

    @FXML
    private void setResultFilter3() {
        List<Nota> result = new ArrayList<>();
        int grupa = comboGrupaFilter3.getSelectionModel().getSelectedItem();
        Tema tema = comboTemaFilter3.getSelectionModel().getSelectedItem();

        for (Student student : toStudentsList()) {
            if (student.getGrupa() == grupa) {
                for (Nota nota : toNoteList()) {
                    if (nota.getID().getObject1().equals(student.getID()) && nota.getID().getObject2().equals(tema.getID())) {
                        result.add(nota);
                    }
                }
            }
        }
        openResultWindow(result);
    }

    @FXML
    private void setResultFilter4() {
        List<Nota> result = new ArrayList<>();

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int beginWeek = adaptWeek(beginDate.getValue().get(weekFields.weekOfWeekBasedYear()));
        int endWeek = adaptWeek(endDate.getValue().get(weekFields.weekOfWeekBasedYear()));

        for (Nota nota : toNoteList()) {
            if (beginWeek <= nota.getSaptamanaPredare() && nota.getSaptamanaPredare() <= endWeek) {
                result.add(nota);
            }
        }
        openResultWindow(result);
    }

    private void showPopup(String message, Alert.AlertType alertType) {
        Alert alert = new Alert(alertType);
        alert.setContentText(message);
        alert.show();
    }

    private List<Student> toStudentsList() {
        List<Student> studenti = new ArrayList<>();
        for (Student student : service.findAllStudents()) {
            studenti.add(student);
        }
        return studenti;
    }

    private List<Tema> toTemeList() {
        List<Tema> teme = new ArrayList<>();
        for (Tema tema : service.findAllTeme()) {
            teme.add(tema);
        }
        return teme;
    }

    private List<Nota> toNoteList() {
        List<Nota> note = new ArrayList<>();
        for(Nota nota: serviceNota.findAllNote()) {
            note.add(nota);
        }
        return note;
    }

    private List<Integer> getGrupe() {
        List<Integer> grupe = new ArrayList<>();
        for (Student student : toStudentsList()) {
            if (!grupe.contains(student.getGrupa())) {
                grupe.add(student.getGrupa());
            }
        }
        Collections.sort(grupe);
        return grupe;
    }

    private int getCurrentWeek() {
        LocalDate date = LocalDate.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int currentWeek = date.get(weekFields.weekOfWeekBasedYear());

        if (currentWeek >= 39) currentWeek = currentWeek - 39;
        else currentWeek = currentWeek + 12;

        return currentWeek;
    }

    private Tema getTemaCurenta() {
        Tema temaCurenta = new Tema("", "", 0, 0);
        for (Tema tema : toTemeList()) {
            if (tema.getDeadline() == getCurrentWeek()) {
                temaCurenta = tema;
            }
        }
        return temaCurenta;
    }

    private Student toObject(String studentString) {
        Student student = new Student("", "", 0);

        String[] result = studentString.split(";");
        for(String e : result) {
            String[] resultt = e.split("=");
            if (resultt[0].equals("idStudent")) student.setID(resultt[1]);
            if (resultt[0].equals("nume")) student.setNume(resultt[1]);
            if (resultt[0].equals("grupa")) student.setGrupa(Integer.parseInt(resultt[1]));
        }

        return student;
    }

    private double getPenalizare() {
        double penalizare = 0;

        if (!comboTema.getSelectionModel().getSelectedItem().equals(getTemaCurenta())) {
            Tema tema = comboTema.getSelectionModel().getSelectedItem();
            int intarziere = getCurrentWeek() - tema.getDeadline();
            penalizare = 2.5 * intarziere;
        }
        return penalizare;
    }

    private void openResultWindow(List<Nota> note) {
        try {
            Stage stage = new Stage();
            stage.setTitle("Filter Result");

            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(notaWindowController.class.getResource("filterResultWindow.fxml"));

            AnchorPane root = loader.load();

            stage.setScene(new Scene(root));
            filterResultWindowController controller = loader.getController();
            controller.setService(stage, note);
            stage.show();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    private int adaptWeek(int week) {
        if (week >= 39) week = week - 39;
        else week = week + 12;

        return week;
    }
}