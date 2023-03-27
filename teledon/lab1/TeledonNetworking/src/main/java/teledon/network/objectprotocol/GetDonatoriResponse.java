package teledon.network.objectprotocol;

import teledon.network.dto.DonatorDTO;

public class GetDonatoriResponse implements Response{
    private Iterable<DonatorDTO> donatori;

    public GetDonatoriResponse(Iterable<DonatorDTO> donatori) { this.donatori = donatori; }

    public Iterable<DonatorDTO> getDonatori() {
        return donatori;
    }
}