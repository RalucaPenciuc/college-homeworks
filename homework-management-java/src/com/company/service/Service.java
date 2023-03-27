package com.company.service;

import com.company.domain.*;
import com.company.repository.*;
import com.company.view.*;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Locale;

public class Service implements Observable<StudentEvent> {
    private StudentXMLRepository studentXmlRepo;
    private TemaXMLRepository temaXmlRepo;
    private ArrayList<Observer<StudentEvent>> observer;

    public Service(StudentXMLRepository studentXmlRepo, TemaXMLRepository temaXmlRepo, NotaXMLRepository notaXmlRepo) {
        this.studentXmlRepo = studentXmlRepo;
        this.temaXmlRepo = temaXmlRepo;
        this.observer = new ArrayList<>();
    }

    @Override
    public void addObserver(Observer<StudentEvent> e) { observer.add(e); }

    @Override
    public void removeObserver(Observer<StudentEvent> e) { observer.remove(e); }

    @Override
    public void notifyObserver(StudentEvent studentEvent) { observer.forEach(obs -> obs.update(studentEvent)); }

    public Iterable<Student> findAllStudents() { return studentXmlRepo.findAll(); }

    public Iterable<Tema> findAllTeme() { return temaXmlRepo.findAll(); }

    public int saveStudent(String id, String nume, int grupa) {
        Student student = new Student(id, nume, grupa);
        Student result = studentXmlRepo.save(student);
        if (result == null) {
            notifyObserver(new StudentEvent(null, student, ChangeEventType.ADD));
            return 1;
        }
        return 0;
    }

    public int saveTema(String id, String descriere, int deadline, int startline) {
        Tema tema = new Tema(id, descriere, deadline, startline);
        Tema result = temaXmlRepo.save(tema);

        if (result == null) {
            return 1;
        }
        return 0;
    }

    public int deleteStudent(String id) {
        Student result = studentXmlRepo.delete(id);
        notifyObserver(new StudentEvent(null, result, ChangeEventType.DELETE));

        if (result == null) {
            return 0;
        }
        return 1;
    }

    public int deleteTema(String id) {
        Tema result = temaXmlRepo.delete(id);

        if (result == null) {
            return 0;
        }
        return 1;
    }

    public int updateStudent(String id, String numeNou, int grupaNoua) {
        Student studentNou = new Student(id, numeNou, grupaNoua);
        Student studentOld = studentXmlRepo.findOne(id);
        Student result = studentXmlRepo.update(studentNou);
        notifyObserver(new StudentEvent(studentOld, studentNou, ChangeEventType.UPDATE));

        if (result == null) {
            return 0;
        }
        return 1;
    }

    public int updateTema(String id, String descriereNoua, int deadlineNou, int startlineNou) {
        Tema temaNoua = new Tema(id, descriereNoua, deadlineNou, startlineNou);
        Tema result = temaXmlRepo.update(temaNoua);

        if (result == null) {
            return 0;
        }
        return 1;
    }

    public int extendDeadline(String id, int noWeeks) {
        Tema tema = temaXmlRepo.findOne(id);

        if (tema != null) {
            LocalDate date = LocalDate.now();
            WeekFields weekFields = WeekFields.of(Locale.getDefault());
            int currentWeek = date.get(weekFields.weekOfWeekBasedYear());

            if (currentWeek >= 39) {
                currentWeek = currentWeek - 39;
            } else {
                currentWeek = currentWeek + 12;
            }

            if (currentWeek <= tema.getDeadline()) {
                int deadlineNou = tema.getDeadline() + noWeeks;
                return updateTema(tema.getID(), tema.getDescriere(), deadlineNou, tema.getStartline());
            }
        }
        return 0;
    }
}
