package repository;

import model.Donator;
import org.junit.Test;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

public class DonatorRepositoryTest {

    @Test
    public void findOne() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));

            IDonatorRepository<String, Donator> drepo = new DonatorRepository(properties);
            Donator d = drepo.findOne("maria", "0711111111");
            assert(d.getID().equals("1"));

        } catch (IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }
    }

    @Test
    public void findAll() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));
        } catch (IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }

        IDonatorRepository<String, Donator> drepo = new DonatorRepository(properties);
        ArrayList<Donator> donatori = (ArrayList<Donator>) drepo.findAll();

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        int size = -1;
        try (PreparedStatement preStm = con.prepareStatement("select count(*) from Donatori")) {
            try (ResultSet result = preStm.executeQuery()) {
                while (result.next()) {
                    size = result.getInt(1);
                }
            }
        } catch (SQLException e) {
            assert(false);
        }

        assert(donatori.size() == size);

        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void save() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));
        } catch(IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }

        IDonatorRepository<String, Donator> drepo = new DonatorRepository(properties);
        Donator d = new Donator("3", "ana", "oradea", "0712345678");
        drepo.save(d);
        Donator dd = drepo.findOne("ana", "0712345678");
        assert(dd.getName().equals(d.getName()) && dd.getAddress().equals(d.getAddress()) && dd.getPhone().equals(d.getPhone()));

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("delete from Donatori where ID = ?")){
            preStmt.setInt(1, Integer.parseInt(dd.getID()));
            int result = preStmt.executeUpdate();
        } catch (SQLException ex) {
            System.out.println("Error DB " + ex);
        }

        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}