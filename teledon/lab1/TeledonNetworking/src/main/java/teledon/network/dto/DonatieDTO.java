package teledon.network.dto;

import java.io.Serializable;

public class DonatieDTO implements Serializable {
    private String idCazCaritabil;
    private String numeDonator;
    private String adresaDonator;
    private String telefonDonator;
    private double sumaDonata;

    public DonatieDTO(String idCazCaritabil, String numeDonator, String adresaDonator, String telefonDonator, double sumaDonata) {
        this.idCazCaritabil = idCazCaritabil;
        this.numeDonator = numeDonator;
        this.adresaDonator = adresaDonator;
        this.telefonDonator = telefonDonator;
        this.sumaDonata = sumaDonata;
    }

    public String getIdCazCaritabil() {
        return idCazCaritabil;
    }

    public void setIdCazCaritabil(String idCazCaritabil) {
        this.idCazCaritabil = idCazCaritabil;
    }

    public String getNumeDonator() {
        return numeDonator;
    }

    public void setNumeDonator(String numeDonator) {
        this.numeDonator = numeDonator;
    }

    public String getAdresaDonator() {
        return adresaDonator;
    }

    public void setAdresaDonator(String adresaDonator) {
        this.adresaDonator = adresaDonator;
    }

    public String getTelefonDonator() {
        return telefonDonator;
    }

    public void setTelefonDonator(String telefonDonator) {
        this.telefonDonator = telefonDonator;
    }

    public double getSumaDonata() {
        return sumaDonata;
    }

    public void setSumaDonata(double sumaDonata) {
        this.sumaDonata = sumaDonata;
    }

    @Override
    public String toString() {
        return "DonatieDTO{" +
                "idCazCaritabil='" + idCazCaritabil + '\'' +
                ", numeDonator='" + numeDonator + '\'' +
                ", adresaDonator='" + adresaDonator + '\'' +
                ", telefonDonator='" + telefonDonator + '\'' +
                ", sumaDonata=" + sumaDonata +
                '}';
    }
}
