package com.company.view;

import com.company.domain.Student;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import com.company.service.Service;
import com.company.validation.ValidationException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class Controller implements Observer<StudentEvent>  {
    private Service service;
    private ObservableList<Student> observableList;

    public Controller(Service service) {
        this.service = service;
        this.service.addObserver(this);
        observableList = FXCollections.observableList(StreamSupport.stream(service.findAllStudents().spliterator(), false).collect(Collectors.toList()));
    }

    @Override
    public void update(StudentEvent StudentEvent) {
        if(StudentEvent.getType() == ChangeEventType.ADD){
            observableList.add(StudentEvent.getData());
        }
        if(StudentEvent.getType() == ChangeEventType.DELETE){
            observableList.remove(StudentEvent.getData());
        }
        if(StudentEvent.getType() == ChangeEventType.UPDATE){
            observableList.remove(StudentEvent.getOldData());
            observableList.add(StudentEvent.getData());
        }
    }

    public ObservableList getList(){
        return observableList;
    }

    public void addStudent(String id, String nume, int grupa) throws ValidationException {
        service.saveStudent(id, nume, grupa);
    }

    public void deleteStudent(String id) {
        service.deleteStudent(id);
    }

    public void updateStudent(String id, String nume_nou, int grupa_noua) {
        service.updateStudent(id, nume_nou, grupa_noua);
    }
}
