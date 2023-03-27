package teledon.network.dto;

import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;
import teledon.model.Donator;
import teledon.model.Voluntar;

import java.util.ArrayList;

public class DTOUtils {
    public static Voluntar getFromDTO(UserDTO vdto){
        String username = vdto.getUsername();
        String pass = vdto.getPassword();
        return new Voluntar(username, pass);

    }
    public static UserDTO getDTO(Voluntar voluntar){
        String name = voluntar.getName();
        String pass = voluntar.getPassword();
        return new UserDTO(name, pass);
    }

    public static DTODonatie getFromDTO(DonatieDTO dondto) {
        int idCaz = dondto.getIdCazCaritabil();
        String nume = dondto.getNumeDonator();
        String adresa = dondto.getAdresaDonator();
        String telefon = dondto.getTelefonDonator();
        double suma = dondto.getSumaDonata();
        return new DTODonatie(idCaz, nume, adresa, telefon, suma);
    }

    public static DonatieDTO getDTO(DTODonatie donatie) {
        int idCaz = donatie.getIdCazCaritabil();
        String nume = donatie.getNumeDonator();
        String adresa = donatie.getAdresaDonator();
        String telefon = donatie.getTelefonDonator();
        double suma = donatie.getSumaDonata();
        return new DonatieDTO(idCaz, nume, adresa, telefon, suma);
    }

    public static Iterable<Donator> getDonatorFromDTO(Iterable<DonatorDTO> donatoriDTO) {
        ArrayList<Donator> donatori = new ArrayList<>();
        for (DonatorDTO donatorDTO : donatoriDTO) {
            String nume = donatorDTO.getName();
            String adresa = donatorDTO.getAddress();
            String telefon = donatorDTO.getPhone();
            donatori.add(new Donator(nume, adresa, telefon));
        }
        return donatori;
    }

    public static DonatorDTO getDTO(Donator donator) {
        String nume = donator.getName();
        String adresa = donator.getAddress();
        String telefon = donator.getPhone();
        return new DonatorDTO(nume, adresa, telefon);
    }

    public static Iterable<DonatorDTO> getDTOS(Iterable<Donator> donatori) {
        ArrayList<DonatorDTO> donatoriDTO = new ArrayList<>();
        for (Donator donator : donatori) {
            String nume = donator.getName();
            String adresa = donator.getAddress();
            String telefon = donator.getPhone();
            donatoriDTO.add(new DonatorDTO(nume, adresa, telefon));
        }
        return donatoriDTO;
    }

    public static Iterable<CazCaritabil> getCazFromDTO(Iterable<CazCaritabilDTO> cazuridto) {
        ArrayList<CazCaritabil> cazuri = new ArrayList<>();
        for (CazCaritabilDTO ccdto : cazuridto) {
            int id = ccdto.getID();
            double suma = ccdto.getTotalSum();
            cazuri.add(new CazCaritabil(id, suma));
        }
        return cazuri;
    }

    public static Iterable<CazCaritabilDTO> getCazDTOs(Iterable<CazCaritabil> cazuri) {
        ArrayList<CazCaritabilDTO> cazuriDTO = new ArrayList<>();
        for (CazCaritabil cc : cazuri) {
            int id = cc.getID();
            double suma = cc.getTotalSum();
            cazuriDTO.add(new CazCaritabilDTO(id, suma));
        }
        return cazuriDTO;
    }

    public static Iterable<CazCaritabilDTO> getDTO(Iterable<CazCaritabil> cazuri) {
        ArrayList<CazCaritabilDTO> cazuridto = new ArrayList<>();
        for (CazCaritabil cc : cazuri) {
            int id = cc.getID();
            double suma = cc.getTotalSum();
            cazuridto.add(new CazCaritabilDTO(id, suma));
        }
        return cazuridto;
    }
}
