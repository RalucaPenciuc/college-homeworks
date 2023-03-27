package repository;

import model.CazCaritabil;
import org.junit.Test;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

public class CazCaritabilRepositoryTest {

    @Test
    public void findAll() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));
        } catch (IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }

        ICazCaritabilRepository<String, CazCaritabil> ccrepo = new CazCaritabilRepository(properties);
        ArrayList<CazCaritabil> cazuri = (ArrayList<CazCaritabil>) ccrepo.findAll();

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        int size = -1;
        try (PreparedStatement preStm = con.prepareStatement("select count(*) from CazuriCaritabile")) {
            try (ResultSet result = preStm.executeQuery()) {
                while (result.next()) {
                    size = result.getInt(1);
                }
            }
        } catch (SQLException e) {
            assert(false);
        }

        assert(cazuri.size() == size);

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

        ICazCaritabilRepository<String, CazCaritabil> ccrepo = new CazCaritabilRepository(properties);
        CazCaritabil cc = new CazCaritabil("4", 665.55);
        ccrepo.save(cc);

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("select * from CazuriCaritabile where ID = ?")){
            preStmt.setInt(1, Integer.parseInt(cc.getID()));
            try(ResultSet result = preStmt.executeQuery()) {
                if(result.next()) {
                    String id = String.valueOf(result.getInt("ID"));
                    double suma = result.getDouble("suma_totala");
                    assert(suma == cc.getTotalSum());
                }
            }
        } catch (SQLException ex) {
            System.out.println("Error DB " + ex);
        }

        try(PreparedStatement preStmt = con.prepareStatement("delete from CazuriCaritabile where ID = ?")){
            preStmt.setInt(1, Integer.parseInt(cc.getID()));
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