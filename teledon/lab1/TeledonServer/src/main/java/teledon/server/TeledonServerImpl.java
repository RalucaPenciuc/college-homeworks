package teledon.server;

import teledon.model.*;
import teledon.network.dto.DonatieDTO;
import teledon.persistence.repository.CazCaritabilRepository;
import teledon.persistence.repository.DonatieRepository;
import teledon.persistence.repository.DonatorRepository;
import teledon.persistence.repository.VoluntarRepository;
import teledon.services.ITeledonObserver;
import teledon.services.ITeledonServer;
import teledon.services.TeledonException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TeledonServerImpl implements ITeledonServer {
    private VoluntarRepository voluntarRepository;
    private CazCaritabilRepository cazRepository;
    private DonatorRepository donatorRepository;
    private DonatieRepository donatieRepository;
    private Map<Integer, ITeledonObserver> loggedClients;

    public TeledonServerImpl(VoluntarRepository vRepo, CazCaritabilRepository cRepo, DonatorRepository dRepo, DonatieRepository ddRepo) {
        voluntarRepository = vRepo;
        cazRepository = cRepo;
        donatorRepository = dRepo;
        donatieRepository = ddRepo;
        loggedClients = new ConcurrentHashMap<>();
    }

    public synchronized void login(Voluntar voluntar, ITeledonObserver client) throws TeledonException {
        Voluntar user = voluntarRepository.findOne(voluntar.getName());
        if (user != null) {
            if (loggedClients.get(user.getID()) != null)
                throw new TeledonException("User already logged in.");

            if (user.getPassword().equals(voluntar.getPassword()))
                loggedClients.put(user.getID(), client);
            else
                throw new TeledonException("Wrong password.");
        } else
            throw new TeledonException("Authentication failed.");
    }

    public synchronized void logout(Voluntar voluntar, ITeledonObserver client) throws TeledonException {
        Voluntar user = voluntarRepository.findOne(voluntar.getName());
        ITeledonObserver localClient = loggedClients.remove(user.getID());
        if (localClient == null)
            throw new TeledonException("User " + user.getID() + " is not logged in.");
    }

    public synchronized Iterable<CazCaritabil> findAllCazuriCaritabile() {
        return cazRepository.findAll();
    }

    public synchronized void adaugaDonatie(DTODonatie donatieDTO) throws TeledonException {
        int idCazCaritabil = donatieDTO.getIdCazCaritabil();
        String numeDonator = donatieDTO.getNumeDonator();
        String adresaDonator = donatieDTO.getAdresaDonator();
        String telefonDonator = donatieDTO.getTelefonDonator();
        double sumaDonata = donatieDTO.getSumaDonata();

        Donator donator = donatorRepository.findOne(numeDonator, telefonDonator);
        CazCaritabil cazCaritabil = cazRepository.findOne(idCazCaritabil);

        if (donator == null) {
            String idx = "-1";
            donator = new Donator(idx, numeDonator, adresaDonator, telefonDonator);
            donatorRepository.save(donator);
            donator = donatorRepository.findOne(numeDonator, telefonDonator);
        }

        Donatie donatie = new Donatie(new Pair<>(cazCaritabil, donator), sumaDonata);
        donatieRepository.save(donatie);
        CazCaritabil cazCaritabil1Nou = new CazCaritabil(idCazCaritabil, cazCaritabil.getTotalSum() + sumaDonata);
        cazRepository.update(cazCaritabil1Nou);

        Iterable<CazCaritabil> cazuriCaritabile = cazRepository.findAll();
        notifyAllUsers(cazuriCaritabile);
    }

    public synchronized Iterable<Donator> cautaDonatori(String numeDonator) {
        List<Donator> result = new ArrayList<>();
        for(Donator donator : donatorRepository.findAll()) {
            if (donator.getName().contains(numeDonator)) {
                result.add(donator);
            }
        }
        return result;
    }

    private final int noDefaultThreads = 5;
    public void notifyAllUsers(Iterable<CazCaritabil> cazuri) throws TeledonException {
        System.out.println("Notify users - enter");
        ExecutorService executor= Executors.newFixedThreadPool(noDefaultThreads);

        loggedClients.forEach((k, user) -> {
            if (user != null) {
                System.out.println("Notify user " + user);
                executor.execute(() -> {
                    try {
                        System.out.println("Send updated list to user " + user);
                        user.updateCazuriList(cazuri);
                        System.out.println("Sended updaded list to user " + user);
                    }
                    catch (TeledonException e) {
                        e.printStackTrace();
                    }
                });
            }
        });
        System.out.println("Notify users - exit");
        executor.shutdown();
    }
}
