package teledon.network.objectprotocol;

import teledon.network.dto.DonatieDTO;

public class AddRequest implements Request {
    private DonatieDTO donatieDTO;

    public AddRequest(DonatieDTO donatieDTO) { this.donatieDTO = donatieDTO; }

    public DonatieDTO getDonatie() {
        return donatieDTO;
    }
}