package com.company.domain;

public class Nota implements HasID<Pair<String, String>> {
    Pair<String, String> id;
    private double nota;
    private int saptamanaPredare;
    private String feedback;

    public Nota(Pair<String, String> id, double nota, int saptamanaPredare, String feedback) {
        this.id = id;
        this.nota = nota;
        this.saptamanaPredare = saptamanaPredare;
        this.feedback = feedback;
    }

    public Pair<String, String> getID() {
        return id;
    }

    public String getIdStudent() { return id.getObject1(); }

    public String getIdTema() { return id.getObject2(); }

    public void setID(Pair<String, String> id) {
        this.id = id;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }

    public int getSaptamanaPredare() {
        return saptamanaPredare;
    }

    public void setSaptamanaPredare(int saptamanaPredare) {
        this.saptamanaPredare = saptamanaPredare;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    @Override
    public String toString() {
        return "idStudent=" + id.getObject1() + ";idTema=" + id.getObject2() + ";nota=" + nota +
                ";saptamanaPredare=" + saptamanaPredare + ";feedback=" + feedback + "\n";
    }
}
