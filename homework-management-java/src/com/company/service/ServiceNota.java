package com.company.service;

import com.company.domain.Nota;
import com.company.domain.Pair;
import com.company.repository.NotaXMLRepository;
import com.company.repository.StudentXMLRepository;
import com.company.repository.TemaXMLRepository;
import com.company.view.NotaEvent;
import com.company.view.Observable;
import com.company.view.Observer;
import com.company.view.StudentEvent;

import java.util.ArrayList;

public class ServiceNota implements Observable<NotaEvent> {
    private StudentXMLRepository studentXmlRepo;
    private TemaXMLRepository temaXmlRepo;
    private NotaXMLRepository notaXmlRepo;
    private ArrayList<Observer<NotaEvent>> observer;

    public ServiceNota(StudentXMLRepository studentXmlRepo, TemaXMLRepository temaXmlRepo, NotaXMLRepository notaXmlRepo) {
        this.studentXmlRepo = studentXmlRepo;
        this.temaXmlRepo = temaXmlRepo;
        this.notaXmlRepo = notaXmlRepo;
        this.observer = new ArrayList<>();
    }

    @Override
    public void addObserver(Observer<NotaEvent> e) { observer.add(e); }

    @Override
    public void removeObserver(Observer<NotaEvent> e) { observer.remove(e); }

    @Override
    public void notifyObserver(NotaEvent notaEvent) { observer.forEach(obs -> obs.update(notaEvent)); }

    public Iterable<Nota> findAllNote() { return notaXmlRepo.findAll(); }

    public int saveNota(String idStudent, String idTema, double valNota, int predata, String feedback) {
        if (studentXmlRepo.findOne(idStudent) == null || temaXmlRepo.findOne(idTema) == null) {
            return -1;
        }
        else {
            int deadline = temaXmlRepo.findOne(idTema).getDeadline();

            if (predata - deadline > 2) {
                valNota =  0;
            } else {
                valNota =  valNota - 2.5 * (predata - deadline);
            }
            Nota nota = new Nota(new Pair(idStudent, idTema), valNota, predata, feedback);
            Nota result = notaXmlRepo.save(nota);

            if (result == null) {
                return 1;
            }
            return 0;
        }
    }

    public void createStudentFile(String idStudent, String idTema) {
        Nota nota = notaXmlRepo.findOne(new Pair(idStudent, idTema));

        if (nota != null) {
            notaXmlRepo.createFile(nota);
        }
    }
}
