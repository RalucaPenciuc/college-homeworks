package teledon.persistence.repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import teledon.model.CazCaritabil;
import teledon.model.Voluntar;

import java.util.Properties;


public class HibernateUtils {
    private static final Logger logger = LogManager.getLogger();
    private Properties hibernateProperties;
    private SessionFactory sessionFactory = null;
    private Session returnSession = null;

    public HibernateUtils(Properties properties) {
        hibernateProperties = properties;
    }

    public void loadSessionFactory() {
        logger.traceEntry();

        Configuration configuration = new Configuration();
        configuration.addProperties(hibernateProperties);
        configuration.addAnnotatedClass(Voluntar.class);
        configuration.addAnnotatedClass(CazCaritabil.class);

        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.configure().getProperties()).build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
    }

    public Session getSession() throws HibernateException {
        logger.traceEntry();

        try {
            loadSessionFactory();
        } catch(Exception e) {
            System.out.println("Exception while initializing hibernate util...");
            logger.error(e);
        }

        try {
            returnSession = sessionFactory.openSession();
        } catch(Throwable t) {
            System.err.println("Exception while getting session...");
            t.printStackTrace();
        }
        if (returnSession == null) {
            System.err.println("Session is discovered null");
        }

        logger.traceExit(returnSession);
        return returnSession;
    }
}
