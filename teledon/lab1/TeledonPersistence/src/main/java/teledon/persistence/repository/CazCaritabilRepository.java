package teledon.persistence.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.Transaction;
import teledon.model.CazCaritabil;
import teledon.persistence.ICazCaritabilRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class CazCaritabilRepository implements ICazCaritabilRepository<Integer, CazCaritabil> {
    private JdbcUtils dbUtils;
    private HibernateUtils hbUtils;
    private static final Logger logger = LogManager.getLogger();

    public CazCaritabilRepository(Properties svProperties, Properties hbProperties) {
        logger.info("Initializing CazCaritabilRepository with server properties: {} ", svProperties);
        logger.info("Initializing CazCaritabilRepository with hibernate properties: {} ", hbProperties);
        dbUtils = new JdbcUtils(svProperties);
        hbUtils = new HibernateUtils(hbProperties);
    }

    @Override
    public CazCaritabil findOne(Integer s) {
        logger.traceEntry("Finding enitity with id {} ", s);
        Connection con = dbUtils.getConnection();

        try (Session session = hbUtils.getSession()) {
            Transaction transaction = null;
            try {
                transaction = session.beginTransaction();

                String queryString = "FROM CazCaritabil c WHERE c.ID = :id";
                CazCaritabil cazCaritabil = session.createQuery(queryString, CazCaritabil.class)
                        .setParameter("id", s)
                        .setMaxResults(1)
                        .uniqueResult();

                transaction.commit();
                return cazCaritabil;
            } catch(RuntimeException ex) {
                logger.error(ex);
                if(transaction != null) {
                    transaction.rollback();
                }
            } finally {
                session.close();
                try {
                    con.close();
                } catch(SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }


    @Override
    public Iterable<CazCaritabil> findAll() {
        logger.traceEntry();
        Connection con = dbUtils.getConnection();

        try (Session session = hbUtils.getSession()) {
            Transaction transaction = null;
            try {
                transaction = session.beginTransaction();

                String queryString = "FROM CazCaritabil c";
                List<CazCaritabil> cazuri = session.createQuery(queryString, CazCaritabil.class).list();
                transaction.commit();
                return cazuri;
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
    public void save(CazCaritabil entity) {
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

    @Override
    public void update(CazCaritabil newEntity) {
        logger.traceEntry("Updating entity {} ", newEntity);
        Connection con = dbUtils.getConnection();

        try (Session session = hbUtils.getSession()) {
            Transaction transaction = null;
            try {
                transaction = session.beginTransaction();

                CazCaritabil cazCaritabil = session.load(CazCaritabil.class, newEntity.getID());
                cazCaritabil.setTotalSum(newEntity.getTotalSum());
                session.update(cazCaritabil);

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
