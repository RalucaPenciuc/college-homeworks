package teledon.network.protobufprotocol;

import teledon.model.CazCaritabil;
import teledon.model.DTODonatie;
import teledon.model.Donator;
import teledon.model.Voluntar;
import teledon.services.ITeledonObserver;
import teledon.services.ITeledonServer;
import teledon.services.TeledonException;

import java.io.*;
import java.net.Socket;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class TeledonServerProtobufProxy implements ITeledonServer {
    private String host;
    private int port;

    private ITeledonObserver client;

    private InputStream input;
    private OutputStream output;
    private Socket connection;

    private BlockingQueue<TeledonProtobufs.TeledonResponse> qresponses;
    private volatile boolean finished;

    public TeledonServerProtobufProxy(String host, int port) {
        this.host = host;
        this.port = port;
        qresponses = new LinkedBlockingQueue<TeledonProtobufs.TeledonResponse>();
    }

    public void login(Voluntar user, ITeledonObserver client) throws TeledonException {
        initializeConnection();

        sendRequest(ProtobufUtils.createLoginRequest(user));
        TeledonProtobufs.TeledonResponse response = readResponse();

        if (response.getType() == TeledonProtobufs.TeledonResponse.Type.Ok){
            this.client = client;
            return;
        }
        else if (response.getType() == TeledonProtobufs.TeledonResponse.Type.Error){
            String error = ProtobufUtils.getError(response);
            closeConnection();
            throw new TeledonException(error);
        }
    }

    public void logout(Voluntar user, ITeledonObserver client) throws TeledonException {
        sendRequest(ProtobufUtils.createLogoutRequest(user));
        TeledonProtobufs.TeledonResponse response = readResponse();
        closeConnection();

        if (response.getType() == TeledonProtobufs.TeledonResponse.Type.Error) {
            String errorText = ProtobufUtils.getError(response);
            throw new TeledonException(errorText);
        }
    }

    public Iterable<CazCaritabil> findAllCazuriCaritabile() throws TeledonException {
        sendRequest(ProtobufUtils.createGetCazuriCaritabileRequest());
        TeledonProtobufs.TeledonResponse response = readResponse();
        if(response.getType() == TeledonProtobufs.TeledonResponse.Type.Error) {
            String errorText = ProtobufUtils.getError(response);
            throw new TeledonException(errorText);
        }
        return ProtobufUtils.getCazuriCaritabile(response);
    }

    public void adaugaDonatie(DTODonatie donatieDTO) throws TeledonException {
        sendRequest(ProtobufUtils.createAddDonatieRequest(donatieDTO));
        TeledonProtobufs.TeledonResponse response = readResponse();

        if(response.getType() == TeledonProtobufs.TeledonResponse.Type.Error) {
            String errorText = ProtobufUtils.getError(response);
            throw new TeledonException(errorText);
        }
    }

    public Iterable<Donator> cautaDonatori(String nume) throws TeledonException {
        Donator donator = new Donator(nume);
        sendRequest(ProtobufUtils.createSearchDonatoriRequest(donator));
        TeledonProtobufs.TeledonResponse response = readResponse();

        if(response.getType() == TeledonProtobufs.TeledonResponse.Type.Error) {
            String errorText = ProtobufUtils.getError(response);
            throw new TeledonException(errorText);
        }
        return ProtobufUtils.getDonatori(response);
    }

    private void closeConnection() {
        finished = true;
        try {
            input.close();
            output.close();
            connection.close();
            client = null;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void sendRequest(TeledonProtobufs.TeledonRequest request)throws TeledonException {
        try {
            System.out.println("Sending request..." + request);

            request.writeDelimitedTo(output);
            output.flush();

            System.out.println("Request sent");
        } catch (IOException e) {
            throw new TeledonException("Error sending object " + e);
        }
    }

    private TeledonProtobufs.TeledonResponse readResponse() throws TeledonException {
        TeledonProtobufs.TeledonResponse response = null;
        try{
            response = qresponses.take();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return response;
    }

    private void initializeConnection() throws TeledonException {
        try {
            connection = new Socket(host, port);
            output = connection.getOutputStream();
            input = connection.getInputStream();
            finished = false;
            startReader();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void startReader(){
        Thread tw = new Thread(new ReaderThread());
        tw.start();
    }

    private void handleUpdate(TeledonProtobufs.TeledonResponse updateResponse) {
        switch (updateResponse.getType()) {
            case AddedDonatie: {
                System.out.println("AddedDonatie response " + updateResponse);

                Iterable<CazCaritabil> cazuriCaritabile = ProtobufUtils.getCazuriCaritabile(updateResponse);
                try {
                    client.updateCazuriList(cazuriCaritabile);
                } catch(TeledonException e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }

    private class ReaderThread implements Runnable{
        public void run() {
            while(!finished){
                try {
                    TeledonProtobufs.TeledonResponse response = TeledonProtobufs.TeledonResponse.parseDelimitedFrom(input);
                    System.out.println("response received " + response);

                    if (isUpdateResponse(response.getType())) {
                        handleUpdate(response);
                    } else {
                        try {
                            qresponses.put(response);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                } catch (IOException e) {
                    System.out.println("Reading error " + e);
                }
            }
        }
    }

    private boolean isUpdateResponse(TeledonProtobufs.TeledonResponse.Type type) {
        switch(type) {
            case AddedDonatie: return true;
        }
        return false;
    }
}
