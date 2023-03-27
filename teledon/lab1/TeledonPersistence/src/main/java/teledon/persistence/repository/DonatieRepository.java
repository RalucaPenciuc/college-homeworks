package teledon.persistence.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import teledon.model.CazCaritabil;
import teledon.model.Donatie;
import teledon.model.Donator;
import teledon.model.Pair;
import teledon.persistence.IDonatieRepository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class DonatieRepository implements IDonatieRepository<Pair<CazCaritabil, Donator>, Donatie> {
    private JdbcUtils dbUtils;
    private static final Logger logger = LogManager.getLogger();

    public DonatieRepository(Properties properties) {
        logger.info("Initializing DonatieRepository with properties: {} ", properties);
        dbUtils = new JdbcUtils(properties);
    }

    @Override
    public void save(Donatie entity){
        logger.traceEntry("Saving entity {} ", entity);
        Connection con = dbUtils.getConnection();

        try (PreparedStatement preStmt = con.prepareStatement("insert into Donatii values (?,?,?)")) {
            preStmt.setInt(1, entity.getID().getObject1().getID());
            preStmt.setInt(2, Integer.parseInt(entity.getID().getObject2().getID()));
            preStmt.setDouble(3, entity.getSumaDonata());

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

