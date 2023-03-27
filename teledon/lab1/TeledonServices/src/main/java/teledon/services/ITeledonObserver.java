package teledon.services;

import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;

public interface ITeledonObserver {
    void updateCazuriList(Iterable<CazCaritabil> cazuriCaritabile) throws TeledonException;
}
