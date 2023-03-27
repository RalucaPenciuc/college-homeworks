package repository;

import model.CazCaritabil;
import model.Donatie;
import model.Donator;
import model.Pair;
import org.junit.Test;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DonatieRepositoryTest {

    @Test
    public void save() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));
        } catch (IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }

        IDonatieRepository<Pair<CazCaritabil, Donator>, Donatie> ddrepo = new DonatieRepository(properties);

        CazCaritabil cc = new CazCaritabil("5", 200.5);
        Donator d = new Donator("4", "vasile", "bistrita", "0987654321");
        Donatie dd = new Donatie(new Pair<>(cc, d), 20.0);
        ddrepo.save(dd);

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("select * from Donatii where IDCaz = ? and IDDonator = ?")){
            preStmt.setInt(1, Integer.parseInt(dd.getID().getObject1().getID()));
            preStmt.setInt(1, Integer.parseInt(dd.getID().getObject2().getID()));
            try(ResultSet result = preStmt.executeQuery()) {
                if(result.next()) {
                    double suma = result.getDouble("suma_donata");
                    assert(suma == dd.getSumaDonata());
                }
            }
        } catch (SQLException ex) {
            System.out.println("Error DB " + ex);
        }

        try(PreparedStatement preStmt = con.prepareStatement("delete from Donatii where IDCaz = ? and IDDonator = ?")){
            preStmt.setInt(1, Integer.parseInt(dd.getID().getObject1().getID()));
            preStmt.setInt(1, Integer.parseInt(dd.getID().getObject2().getID()));
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