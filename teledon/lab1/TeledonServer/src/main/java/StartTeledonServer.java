import teledon.network.utils.AbstractServer;
import teledon.network.utils.TeledonObjectConcurrentServer;
import teledon.network.utils.ServerException;
import teledon.persistence.repository.CazCaritabilRepository;
import teledon.persistence.repository.DonatieRepository;
import teledon.persistence.repository.DonatorRepository;
import teledon.persistence.repository.VoluntarRepository;
import teledon.server.TeledonServerImpl;
import teledon.services.ITeledonServer;

import java.io.IOException;
import java.util.Properties;

public class StartTeledonServer {

    private static int defaultPort = 55555;

    public static void main(String[] args) {
        Properties serverProperties = new Properties();

        try {
            serverProperties.load(StartTeledonServer.class.getResourceAsStream("/teledonserver.properties"));
            System.out.println("Server properties set.");
            serverProperties.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find chatserver.properties " + e);
            return;
        }

        VoluntarRepository voluntarRepo = new VoluntarRepository(serverProperties);
        CazCaritabilRepository cazRepo = new CazCaritabilRepository(serverProperties);
        DonatorRepository donatorRepo = new DonatorRepository(serverProperties);
        DonatieRepository donatieRepo = new DonatieRepository(serverProperties);
        ITeledonServer teledonServerImpl = new TeledonServerImpl(voluntarRepo, cazRepo, donatorRepo, donatieRepo);

        int teledonServerPort = defaultPort;
        try {
            teledonServerPort = Integer.parseInt(serverProperties.getProperty("teledon.server.port"));
        } catch (NumberFormatException nef){
            System.err.println("Wrong  Port Number" + nef.getMessage());
            System.err.println("Using default port " + defaultPort);
        }

        System.out.println("Starting server on port: " + teledonServerPort);
        AbstractServer server = new TeledonObjectConcurrentServer(teledonServerPort, teledonServerImpl);
        try {
            server.start();
        } catch (ServerException e) {
            System.err.println("Error starting the server" + e.getMessage());
        }
    }
}
