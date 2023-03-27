package teledon.network.objectprotocol;

import teledon.network.dto.DonatorDTO;

public class SearchRequest implements Request {
    private DonatorDTO donatorDTO;

    public SearchRequest(DonatorDTO donatorDTO) { this.donatorDTO = donatorDTO; }

    public DonatorDTO getDonator() {
        return donatorDTO;
    }
}