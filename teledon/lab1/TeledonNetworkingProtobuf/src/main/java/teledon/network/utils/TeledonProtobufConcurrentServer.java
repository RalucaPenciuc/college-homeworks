package teledon.network.utils;

import teledon.network.protobufprotocol.TeledonClientProtobufWorker;
import teledon.services.ITeledonServer;

import java.net.Socket;

public class TeledonProtobufConcurrentServer extends AbstractConcurrentServer {
    private ITeledonServer teledonServer;

    public TeledonProtobufConcurrentServer(int port, ITeledonServer teledonServer) {
        super(port);
        this.teledonServer = teledonServer;

        System.out.println("Teledon - TeledonProtobufConcurrentServer");
    }

    @Override
    protected Thread createWorker(Socket client) {
        TeledonClientProtobufWorker worker = new TeledonClientProtobufWorker(teledonServer, client);
        Thread thread = new Thread(worker);
        return thread;
    }
}
