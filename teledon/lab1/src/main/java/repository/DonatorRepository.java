package repository;

import model.Donator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import validation.ValidationException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class DonatorRepository implements IDonatorRepository<String, Donator> {
    private JdbcUtils dbUtils;
    private static final Logger logger = LogManager.getLogger();

    public DonatorRepository(Properties properties) {
        logger.info("Initializing DonatorRepository with properties: {} ", properties);
        dbUtils = new JdbcUtils(properties);
    }

    @Override
    public Donator findOne(String s, String t) {
        logger.traceEntry("Finding enitity with name {} ", s);
        Connection con = dbUtils.getConnection();

        try (PreparedStatement preStmt = con.prepareStatement("select * from Donatori where nume = ? and telefon = ?")) {
            preStmt.setString(1, s);
            preStmt.setString(2, t);
            try (ResultSet result = preStmt.executeQuery()) {
                if (result.next()) {
                    int id = result.getInt("ID");
                    String nume = result.getString("nume");
                    String adresa = result.getString("adresa");
                    String telefon = result.getString("telefon");

                    Donator donator = new Donator(String.valueOf(id), nume, adresa, telefon);

                    logger.traceExit(donator);
                    return donator;
                }
            }
        } catch (SQLException ex) {
            logger.error(ex);
            System.out.println("Error DB " + ex);
        }
        logger.traceExit("No entity found with name {}", s);
        return null;
    }

    @Override
    public Iterable<Donator> findAll() {
        logger.traceEntry();
        Connection con = dbUtils.getConnection();
        List<Donator> donatori = new ArrayList<>();

        try(PreparedStatement preStmt = con.prepareStatement("select * from Donatori")) {
            try(ResultSet result = preStmt.executeQuery()) {
                while (result.next()) {
                    String id = String.valueOf(result.getInt("ID"));
                    String nume = result.getString("nume");
                    String adresa = result.getString("adresa");
                    String telefon = result.getString("telefon");

                    Donator donator = new Donator(id, nume, adresa, telefon);
                    donatori.add(donator);
                }
            }
        } catch (SQLException e) {
            logger.error(e);
            System.out.println("Error DB " + e);
        }
        logger.traceExit(donatori);
        return donatori;
    }

    @Override
    public void save(Donator entity) throws ValidationException {
        logger.traceEntry("Saving entity {} ", entity);
        Connection con = dbUtils.getConnection();

        try(PreparedStatement preStmt = con.prepareStatement("insert into Donatori values (?,?,?,?)")){
            //preStmt.setInt(1, Integer.parseInt(entity.getID()));
            preStmt.setString(2, entity.getName());
            preStmt.setString(3, entity.getAddress());
            preStmt.setString(4, entity.getPhone());

            int result = preStmt.executeUpdate();

        } catch (SQLException ex){
            logger.error(ex);
            System.out.println("Error DB "+ex);
        }
        logger.traceExit();
    }
}