package teledon.network.utils;

import teledon.network.objectprotocol.TeledonClientObjectWorker;
import teledon.services.ITeledonServer;
import java.net.Socket;

public class TeledonObjectConcurrentServer extends AbstractConcurrentServer {
    private ITeledonServer teledonServer;

    public TeledonObjectConcurrentServer(int port, ITeledonServer teledonServer) {
        super(port);
        this.teledonServer = teledonServer;
        System.out.println("Teledon - TeledonObjectConcurrentServer");
    }

    @Override
    protected Thread createWorker(Socket client) {
        TeledonClientObjectWorker worker = new TeledonClientObjectWorker(teledonServer, client);
        Thread tw = new Thread(worker);
        return tw;
    }
}