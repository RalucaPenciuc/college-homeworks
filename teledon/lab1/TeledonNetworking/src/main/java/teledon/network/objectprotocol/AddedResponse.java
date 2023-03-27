package teledon.network.objectprotocol;

import teledon.network.dto.CazCaritabilDTO;

public class AddedResponse implements UpdateResponse{
    private Iterable<CazCaritabilDTO> cazuriDTO;

    public AddedResponse(Iterable<CazCaritabilDTO> cazuriDTO) {
        this.cazuriDTO = cazuriDTO;
    }

    public Iterable<CazCaritabilDTO> getCazuriDTO() {
        return cazuriDTO;
    }
}