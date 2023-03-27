package teledon.persistence.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import teledon.model.Voluntar;
import teledon.persistence.IVoluntarRepository;

import java.sql.*;
import java.util.Properties;

public class VoluntarRepository implements IVoluntarRepository<Integer, Voluntar> {
    private JdbcUtils dbUtils;
    private HibernateUtils hbUtils;
    private static final Logger logger = LogManager.getLogger();

    public VoluntarRepository(Properties svProperties, Properties hbProperties) {
        logger.info("Initializing VoluntarRepository with hibernate properties: {} ", hbProperties);
        logger.info("Initializing VoluntarRepository with server properties: {}", svProperties);
        dbUtils = new JdbcUtils(svProperties);
        hbUtils = new HibernateUtils(hbProperties);
    }

    @Override
    public Voluntar findOne(String s) {
        logger.traceEntry("Finding enitity with name {} ", s);
        Connection con = dbUtils.getConnection();

        try (Session session = hbUtils.getSession()) {
            Transaction transaction = null;
            try {
                transaction = session.beginTransaction();

                String queryString = "FROM Voluntar v WHERE v.name LIKE :nume";
                Voluntar user = (Voluntar)session.createQuery(queryString, Voluntar.class)
                        .setParameter("nume", s)
                        .setMaxResults(1)
                        .uniqueResult();

                transaction.commit();
                return user;
            } catch (RuntimeException ex) {
                logger.error(ex);
                if (transaction != null) {
                    transaction.rollback();
                }
            } finally {
                session.close();
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    @Override
    public void save(Voluntar entity) {
        logger.traceEntry("Saving entity {} ", entity);
        Connection con = dbUtils.getConnection();

        try (Session session = hbUtils.getSession()) {
            Transaction transaction = null;
            try {
                transaction = session.beginTransaction();
                session.save(entity);
                transaction.commit();
            } catch (RuntimeException ex) {
                logger.error(ex);
                if (transaction != null) {
                    transaction.rollback();
                }
            } finally {
                session.close();
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
