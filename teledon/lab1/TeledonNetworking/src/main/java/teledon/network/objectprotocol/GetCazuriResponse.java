package teledon.network.objectprotocol;

import teledon.network.dto.CazCaritabilDTO;

public class GetCazuriResponse implements Response{
    private Iterable<CazCaritabilDTO> cazuri;

    public GetCazuriResponse(Iterable<CazCaritabilDTO> cazuri) { this.cazuri = cazuri; }

    public Iterable<CazCaritabilDTO> getCazuri() {
        return cazuri;
    }
}
