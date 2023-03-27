package teledon.network.protobufprotocol;

import teledon.model.*;
import teledon.services.ITeledonObserver;
import teledon.services.ITeledonServer;
import teledon.services.TeledonException;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class TeledonClientProtobufWorker implements Runnable, ITeledonObserver {
    private ITeledonServer server;
    private Socket connection;

    private InputStream input;
    private OutputStream output;
    private volatile boolean connected;

    public TeledonClientProtobufWorker(ITeledonServer server, Socket connection) {
        this.server = server;
        this.connection = connection;

        try {
            output = connection.getOutputStream();
            input = connection.getInputStream();
            connected = true;
        }
        catch(IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while(connected) {
            try {
                System.out.println("Waiting requests...");

                TeledonProtobufs.TeledonRequest request = TeledonProtobufs.TeledonRequest.parseDelimitedFrom(input);

                System.out.println("Request received: " + request);

                TeledonProtobufs.TeledonResponse response = handleRequest(request);
                if (response != null) {
                    sendResponse(response);
                }
            }
            catch (IOException e) {
                e.printStackTrace();
            }

            try {
                Thread.sleep(1000);
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        try {
            input.close();
            output.close();
            connection.close();
        }
        catch (IOException e) {
            System.out.println("ERROR " + e);
        }
    }

    private TeledonProtobufs.TeledonResponse handleRequest(TeledonProtobufs.TeledonRequest request) {
        TeledonProtobufs.TeledonResponse response = null;

        switch(request.getType()) {
            case Login: {
                System.out.println("Login request...");

                Voluntar user = ProtobufUtils.getUser(request);
                try {
                    server.login(user, this);
                    return ProtobufUtils.createOkResponse();
                } catch (TeledonException e) {
                    connected = false;
                    return ProtobufUtils.createErrorResponse(e.getMessage());
                }
            }
            case Logout: {
                System.out.println("Logout request...");

                Voluntar user = ProtobufUtils.getUser(request);
                try {
                    server.logout(user, this);
                    connected = false;
                    return ProtobufUtils.createOkResponse();
                } catch (TeledonException e) {
                    return ProtobufUtils.createErrorResponse(e.getMessage());
                }

            }
            case GetCazuriCaritabile: {
                System.out.println("GetCazuriCaritabile request...");

                try {
                    Iterable<CazCaritabil> cazuriCaritabile = server.findAllCazuriCaritabile();
                    return ProtobufUtils.createGetCazuriCaritabileResponse(cazuriCaritabile);
                } catch (TeledonException e) {
                    return ProtobufUtils.createErrorResponse(e.getMessage());
                }
            }
            case SearchDonatori: {
                System.out.println("SearchDonatori request...");

                try {
                    Donator donator = ProtobufUtils.getDonator(request);
                    Iterable<Donator> donatori = server.cautaDonatori(donator.getName());
                    return ProtobufUtils.createGetDonatoriResponse(donatori);
                } catch (TeledonException e) {
                    return ProtobufUtils.createErrorResponse(e.getMessage());
                }

            }
            case AddDonatie: {
                System.out.println("AddDonatie request...");

                try {
                    DTODonatie donatie = ProtobufUtils.getDonatie(request);
                    server.adaugaDonatie(donatie);
                    return ProtobufUtils.createOkResponse();
                } catch (TeledonException e) {
                    return ProtobufUtils.createErrorResponse(e.getMessage());
                }
            }
        }

        return response;
    }

    private void sendResponse(TeledonProtobufs.TeledonResponse response) throws  IOException {
        System.out.println("Sending response: " + response);

        response.writeDelimitedTo(output);
        output.flush();
    }

    @Override
    public void updateCazuriList(Iterable<CazCaritabil> cazuriCaritabile) throws TeledonException {
        System.out.println("CazuriCaritabile list updated");

        try {
            sendResponse(ProtobufUtils.createAddedDonatieResponse(cazuriCaritabile));
        } catch(IOException e) {
            e.printStackTrace();
        }
    }
}
