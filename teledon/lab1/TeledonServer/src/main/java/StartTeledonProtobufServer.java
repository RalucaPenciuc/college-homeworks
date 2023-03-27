import teledon.network.utils.AbstractServer;
import teledon.network.utils.ServerException;
import teledon.network.utils.TeledonProtobufConcurrentServer;
import teledon.persistence.repository.CazCaritabilRepository;
import teledon.persistence.repository.DonatieRepository;
import teledon.persistence.repository.DonatorRepository;
import teledon.persistence.repository.VoluntarRepository;
import teledon.server.TeledonServerImpl;
import teledon.services.ITeledonServer;

import java.io.IOException;
import java.util.Properties;

public class StartTeledonProtobufServer {
    private static int defaultPort = 55555;

    public static void main(String[] args) {
        Properties serverProperties = new Properties();
        Properties hibernateProperties = new Properties();

        try {
            serverProperties.load(StartTeledonProtobufServer.class.getResourceAsStream("/teledonserver.properties"));
            System.out.println("Server properties set.");
            serverProperties.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find teledonserver.properties " + e);
            return;
        }

        try {
            hibernateProperties.load(StartTeledonProtobufServer.class.getResourceAsStream("/hibernate.cfg.xml"));
            System.out.println("Hibernate properties set.");
            hibernateProperties.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find hibernate.cfg.xml");
            return;
        }

        VoluntarRepository voluntarRepo = new VoluntarRepository(serverProperties, hibernateProperties);
        CazCaritabilRepository cazRepo = new CazCaritabilRepository(serverProperties, hibernateProperties);
        DonatorRepository donatorRepo = new DonatorRepository(serverProperties);
        DonatieRepository donatieRepo = new DonatieRepository(serverProperties);
        ITeledonServer teledonServerImpl = new TeledonServerImpl(voluntarRepo, cazRepo, donatorRepo, donatieRepo);

        int teledonServerPort = defaultPort;
        try {
            teledonServerPort = Integer.parseInt(serverProperties.getProperty("teledon.server.port"));
        } catch (NumberFormatException nef) {
            System.err.println("Wrong  Port Number" + nef.getMessage());
            System.err.println("Using default port " + defaultPort);
        }

        System.out.println("Starting server on port: " + teledonServerPort);
        AbstractServer server = new TeledonProtobufConcurrentServer(teledonServerPort, teledonServerImpl);
        try {
            server.start();
        } catch (ServerException e) {
            System.err.println("Error starting the server" + e.getMessage());
        }
    }
}
