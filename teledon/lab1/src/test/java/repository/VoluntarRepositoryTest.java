package repository;

import model.Voluntar;
import org.junit.Test;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class VoluntarRepositoryTest {

    @Test
    public void findOne() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));

            IVoluntarRepository<String, Voluntar> vrepo = new VoluntarRepository(properties);
            Voluntar v = vrepo.findOne("ion");
            assert(v.getID().equals("1"));

        } catch (IOException e) {
            System.out.println("Cannot find bd.config " + e);
        }
    }

    @Test
    public void save() {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("bd.config"));
        } catch (IOException e) {
            System.out.println("Cannot find bd.config" + e);
        }

        IVoluntarRepository<String, Voluntar> vrepo = new VoluntarRepository(properties);
        Voluntar v = new Voluntar("3", "ana", "passw");
        vrepo.save(v);
        Voluntar vv = vrepo.findOne("ana");
        assert(vv.getID().equals(v.getID()));

        JdbcUtils dbUtils = new JdbcUtils(properties);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("delete from Voluntari where ID = ?")){
            preStmt.setInt(1, Integer.parseInt(vv.getID()));
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