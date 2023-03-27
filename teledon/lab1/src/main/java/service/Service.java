package service;
import model.*;
import repository.ICazCaritabilRepository;
import repository.IDonatieRepository;
import repository.IDonatorRepository;
import repository.IVoluntarRepository;
import utils.*;

import java.util.ArrayList;
import java.util.List;

public class Service implements Observable<CazCaritabilEvent> {
    private IVoluntarRepository<String, Voluntar> vrepo;
    private ICazCaritabilRepository<String, CazCaritabil> ccrepo;
    private IDonatorRepository<String, Donator> drepo;
    private IDonatieRepository<Pair<CazCaritabil, Donator>, Donatie> ddrepo;
    private List<Observer<CazCaritabilEvent>> observers;

    public Service(IVoluntarRepository<String, Voluntar> vrepo, ICazCaritabilRepository<String, CazCaritabil> ccrepo, IDonatorRepository<String, Donator> drepo, IDonatieRepository<Pair<CazCaritabil, Donator>, Donatie> ddrepo) {
        this.vrepo = vrepo;
        this.ccrepo = ccrepo;
        this.drepo = drepo;
        this.ddrepo = ddrepo;
        this.observers = new ArrayList<>();
    }

    @Override
    public void addObserver(Observer<CazCaritabilEvent> e) {
        observers.add(e);
    }

    @Override
    public void removeObserver(Observer<CazCaritabilEvent> e) {
        observers.remove(e);
    }

    @Override
    public void notifyObservers(CazCaritabilEvent t) { observers.forEach(obs -> obs.update(t)); }

    public Iterable<CazCaritabil> findAllCazuriCaritabile() {
        return ccrepo.findAll();
    }

    public int login(String nume, String parola) {
        Voluntar v = vrepo.findOne(nume);

        if (v != null) {
            if (v.getPassword().equals(parola)) return 1;
            else return 0;
        }
        else return -1;
    }

    public int adaugaDonatie(String id, String nume, String adresa, String telefon, double suma) {
        Donator d = drepo.findOne(nume, telefon);
        CazCaritabil cc = ccrepo.findOne(id);

        if (d == null) {
            String idx = "-1";
            d = new Donator(idx, nume, adresa, telefon);
            drepo.save(d);
            d = drepo.findOne(nume, telefon);
        }

        Donatie dd = new Donatie(new Pair<>(cc, d), suma);
        ddrepo.save(dd);
        CazCaritabil ccnew = new CazCaritabil(id, cc.getTotalSum() + suma);
        ccrepo.update(ccnew);
        notifyObservers(new CazCaritabilEvent(cc, ccnew, ChangeEventType.UPDATE));

        return 1;
    }

    public Iterable<Donator> cautaDonatori(String nume) {
        List<Donator> result = new ArrayList<>();
        for(Donator d : drepo.findAll()) {
            if (d.getName().contains(nume)) {
                result.add(d);
            }
        }
        return result;
    }
}
