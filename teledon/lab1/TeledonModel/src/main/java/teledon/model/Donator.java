package teledon.model;

public class Donator implements HasID<String> {
    private String ID;
    private String name;
    private String address;
    private String phone;

    public Donator(String ID, String name, String address, String phone) {
        this.ID = ID;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public Donator(String name, String address, String phone) {
        this.ID = "";
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public Donator(String nume) {
        this.ID = "";
        this.name = nume;
        this.address = "";
        this.phone = "";
    }

    @Override
    public String getID() {
        return ID;
    }

    @Override
    public void setID(String ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "teledon.teledon.model.Donator{" +
                "ID='" + ID + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
