package repository;

import model.Voluntar;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import validation.ValidationException;

import java.sql.*;
import java.util.Properties;

public class VoluntarRepository implements IVoluntarRepository<String, Voluntar> {
    private JdbcUtils dbUtils;
    private static final Logger logger = LogManager.getLogger();

    public VoluntarRepository(Properties properties) {
        logger.info("Initializing VoluntarRepository with properties: {} ", properties);
        dbUtils = new JdbcUtils(properties);
    }

    @Override
    public Voluntar findOne(String s) {
        logger.traceEntry("Finding enitity with name {} ", s);
        Connection con = dbUtils.getConnection();

        try (PreparedStatement preStmt = con.prepareStatement("select * from Voluntari where name = ?")) {
            preStmt.setString(1, s);
            try (ResultSet result = preStmt.executeQuery()) {
                if (result.next()) {
                    int id = result.getInt("ID");
                    String nume = result.getString("name");
                    String parola = result.getString("password");

                    Voluntar voluntar = new Voluntar(String.valueOf(id), nume, parola);

                    logger.traceExit(voluntar);
                    return voluntar;
                }
            }
        } catch (SQLException ex) {
            logger.error(ex);
            System.out.println("Error DB " + ex);
        }
        logger.traceExit("No entity found with name {}", s);
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void save(Voluntar entity) throws ValidationException {
//        logger.traceEntry("Saving entity {} ", entity);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("insert into Voluntari values (?,?,?)")){
            preStmt.setInt(1, Integer.parseInt(entity.getID()));
            preStmt.setString(2, entity.getName());
            preStmt.setString(3, entity.getPassword());

            int result = preStmt.executeUpdate();

        } catch (SQLException ex){
//            logger.error(ex);
            System.out.println("Error DB "+ex);
        }
//        logger.traceExit();
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
