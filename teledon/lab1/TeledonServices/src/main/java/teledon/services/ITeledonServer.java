package teledon.services;

import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;
import teledon.model.Donator;
import teledon.model.Voluntar;

public interface ITeledonServer {
    void login(Voluntar voluntar, ITeledonObserver client) throws TeledonException;
    void logout(Voluntar voluntar, ITeledonObserver client) throws TeledonException;
    void adaugaDonatie(DTODonatie donatieDTO) throws TeledonException;
    Iterable<CazCaritabil> findAllCazuriCaritabile() throws TeledonException;
    Iterable<Donator> cautaDonatori(String nume) throws TeledonException;
}
