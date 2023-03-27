package teledon.network.protobufprotocol;

import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;
import teledon.model.Donator;
import teledon.model.Voluntar;

import java.util.ArrayList;

public class ProtobufUtils {
    public static TeledonProtobufs.TeledonRequest createLoginRequest(Voluntar user) {
        TeledonProtobufs.Voluntar userDTO = TeledonProtobufs.Voluntar.newBuilder()
                .setUsername(user.getName())
                .setPassword(user.getPassword()).build();
        return TeledonProtobufs.TeledonRequest.newBuilder()
                .setType(TeledonProtobufs.TeledonRequest.Type.Login)
                .setUser(userDTO).build();
    }

    public static TeledonProtobufs.TeledonRequest createLogoutRequest(Voluntar user) {
        TeledonProtobufs.Voluntar userDTO = TeledonProtobufs.Voluntar.newBuilder()
                .setUsername(user.getName())
                .setPassword(user.getPassword()).build();
        return TeledonProtobufs.TeledonRequest.newBuilder()
                .setType(TeledonProtobufs.TeledonRequest.Type.Logout)
                .setUser(userDTO).build();
    }

    public static TeledonProtobufs.TeledonRequest createGetCazuriCaritabileRequest() {
        return TeledonProtobufs.TeledonRequest.newBuilder()
                .setType(TeledonProtobufs.TeledonRequest.Type.GetCazuriCaritabile).build();
    }

    public static TeledonProtobufs.TeledonRequest createSearchDonatoriRequest(Donator donator) {
        TeledonProtobufs.Donator donatorDTO = TeledonProtobufs.Donator.newBuilder()
                .setName(donator.getName())
                .setAddress(donator.getAddress())
                .setPhone(donator.getPhone()).build();
        return TeledonProtobufs.TeledonRequest.newBuilder()
                .setType(TeledonProtobufs.TeledonRequest.Type.SearchDonatori)
                .setDonator(donatorDTO).build();
    }

    public static TeledonProtobufs.TeledonRequest createAddDonatieRequest(DTODonatie donatie) {
        TeledonProtobufs.Donatie donatieDTO = TeledonProtobufs.Donatie.newBuilder()
                .setIdCazCaritabil(String.valueOf(donatie.getIdCazCaritabil()))
                .setNumeDonator(donatie.getNumeDonator())
                .setAdresaDonator(donatie.getAdresaDonator())
                .setTelefonDonator(donatie.getTelefonDonator())
                .setSumaDonata(donatie.getSumaDonata()).build();
        return TeledonProtobufs.TeledonRequest.newBuilder()
                .setType(TeledonProtobufs.TeledonRequest.Type.AddDonatie)
                .setDonatie(donatieDTO).build();
    }



    public static TeledonProtobufs.TeledonResponse createOkResponse() {
        return TeledonProtobufs.TeledonResponse.newBuilder()
                .setType(TeledonProtobufs.TeledonResponse.Type.Ok).build();
    }

    public static TeledonProtobufs.TeledonResponse createErrorResponse(String errorText) {
        return TeledonProtobufs.TeledonResponse.newBuilder()
                .setType(TeledonProtobufs.TeledonResponse.Type.Error)
                .setError(errorText).build();
    }

    public static TeledonProtobufs.TeledonResponse createGetCazuriCaritabileResponse(Iterable<CazCaritabil> cazuriCaritabile) {
        TeledonProtobufs.TeledonResponse.Builder response = TeledonProtobufs.TeledonResponse.newBuilder()
                .setType(TeledonProtobufs.TeledonResponse.Type.GetCazuriCaritabile);
        for(CazCaritabil cazCaritabil: cazuriCaritabile) {
            TeledonProtobufs.CazCaritabil cazCaritabil1DTO = TeledonProtobufs.CazCaritabil.newBuilder()
                    .setId(cazCaritabil.getID().toString())
                    .setTotalSum(String.valueOf(cazCaritabil.getTotalSum())).build();
            response.addCazuriCaritabile(cazCaritabil1DTO);
        }
        return response.build();
    }

    public static TeledonProtobufs.TeledonResponse createGetDonatoriResponse(Iterable<Donator> donatori) {
        TeledonProtobufs.TeledonResponse.Builder response = TeledonProtobufs.TeledonResponse.newBuilder()
                .setType(TeledonProtobufs.TeledonResponse.Type.GetDonatori);
        for(Donator donator : donatori) {
            TeledonProtobufs.Donator donatorDTO = TeledonProtobufs.Donator.newBuilder()
                    .setName(donator.getName())
                    .setAddress(donator.getAddress())
                    .setPhone(donator.getPhone()).build();
            response.addDonatori(donatorDTO);
        }
        return response.build();
    }

    public static TeledonProtobufs.TeledonResponse createAddedDonatieResponse(Iterable<CazCaritabil> cazuriCaritabile) {
        TeledonProtobufs.TeledonResponse.Builder response = TeledonProtobufs.TeledonResponse.newBuilder()
                .setType(TeledonProtobufs.TeledonResponse.Type.AddedDonatie);
        for(CazCaritabil cazCaritabil: cazuriCaritabile) {
            TeledonProtobufs.CazCaritabil cazCaritabil1DTO = TeledonProtobufs.CazCaritabil.newBuilder()
                    .setId(cazCaritabil.getID().toString())
                    .setTotalSum(String.valueOf(cazCaritabil.getTotalSum())).build();
            response.addCazuriCaritabile(cazCaritabil1DTO);
        }
        return response.build();
    }



    public static String getError(TeledonProtobufs.TeledonResponse response) {
        return response.getError();
    }

    public static Iterable<CazCaritabil> getCazuriCaritabile(TeledonProtobufs.TeledonResponse response) {
        ArrayList<CazCaritabil> cazuriCaritabile = new ArrayList<>();
        for(int i = 0; i < response.getCazuriCaritabileCount(); i++) {
            TeledonProtobufs.CazCaritabil cazCaritabilDTO = response.getCazuriCaritabile(i);
            cazuriCaritabile.add(new CazCaritabil(Integer.valueOf(cazCaritabilDTO.getId()), Double.parseDouble(cazCaritabilDTO.getTotalSum())));
        }
        return cazuriCaritabile;
    }

    public static Iterable<Donator> getDonatori(TeledonProtobufs.TeledonResponse response) {
        ArrayList<Donator> donatori = new ArrayList<>();
        for(int i = 0; i < response.getDonatoriCount(); i++) {
            TeledonProtobufs.Donator donatorDTO = response.getDonatori(i);
            donatori.add(new Donator(donatorDTO.getName(), donatorDTO.getAddress(), donatorDTO.getPhone()));
        }
        return donatori;
    }



    public static Voluntar getUser(TeledonProtobufs.TeledonRequest request) {
        return new Voluntar(request.getUser().getUsername(), request.getUser().getPassword());
    }

    public static Donator getDonator(TeledonProtobufs.TeledonRequest request) {
        return new Donator(request.getDonator().getName(), request.getDonator().getAddress(), request.getDonator().getPhone());
    }

    public static DTODonatie getDonatie(TeledonProtobufs.TeledonRequest request) {
        return new DTODonatie(Integer.parseInt(request.getDonatie().getIdCazCaritabil()),
                request.getDonatie().getNumeDonator(),
                request.getDonatie().getAdresaDonator(),
                request.getDonatie().getTelefonDonator(),
                request.getDonatie().getSumaDonata());
    }

}
