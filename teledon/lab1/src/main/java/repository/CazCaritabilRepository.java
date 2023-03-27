package repository;

import model.CazCaritabil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import validation.ValidationException;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class CazCaritabilRepository implements ICazCaritabilRepository<String, CazCaritabil> {
    private JdbcUtils dbUtils;
    private static final Logger logger = LogManager.getLogger();

    public CazCaritabilRepository(Properties properties) {
        logger.info("Initializing CazCaritabilRepository with properties: {} ", properties);
        dbUtils = new JdbcUtils(properties);
    }

    @Override
    public CazCaritabil findOne(String s) {
        logger.traceEntry("Finding enitity with id {} ", s);
        Connection con = dbUtils.getConnection();

        try (PreparedStatement preStmt = con.prepareStatement("select * from CazuriCaritabile where ID = ?")) {
            preStmt.setInt(1, Integer.parseInt(s));
            try (ResultSet result = preStmt.executeQuery()) {
                if (result.next()) {
                    int id = result.getInt("ID");
                    double suma = result.getDouble("suma_totala");

                    CazCaritabil cc = new CazCaritabil(String.valueOf(id), suma);

                    logger.traceExit(cc);
                    return cc;
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
    public Iterable<CazCaritabil> findAll() {
        logger.traceEntry();
        Connection con = dbUtils.getConnection();
        List<CazCaritabil> cazuri = new ArrayList<>();

        try(PreparedStatement preStmt = con.prepareStatement("select * from CazuriCaritabile")) {
            try(ResultSet result = preStmt.executeQuery()) {
                while (result.next()) {
                    String id = String.valueOf(result.getInt("ID"));
                    double suma = result.getDouble("suma_totala");

                    CazCaritabil caz = new CazCaritabil(id, suma);
                    cazuri.add(caz);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
            System.out.println("Error DB " + e);
        }
        logger.traceExit(cazuri);
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cazuri;
    }

    @Override
    public void save(CazCaritabil entity) throws ValidationException {
        logger.traceEntry("Saving entity {} ", entity);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("insert into CazuriCaritabile values (?,?)")){
            preStmt.setInt(1, Integer.parseInt(entity.getID()));
            preStmt.setDouble(2, entity.getTotalSum());

            int result = preStmt.executeUpdate();

        } catch (SQLException ex){
            logger.error(ex);
            System.out.println("Error DB "+ex);
        }
        logger.traceExit();
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(CazCaritabil newEntity) {
        logger.traceEntry("Updating entity {} ", newEntity);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("update CazuriCaritabile set suma_totala = ? where ID = ?")) {
            preStmt.setDouble(1, newEntity.getTotalSum());
            preStmt.setInt(2, Integer.parseInt(newEntity.getID()));
            int result = preStmt.executeUpdate();

        } catch (SQLException ex) {
            logger.error(ex);
            System.out.println("Error DB " + ex);
        }
        logger.traceExit();
        try {
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
