package teledon.network.objectprotocol;

import teledon.model.*;
import teledon.network.dto.*;
import teledon.services.ITeledonObserver;
import teledon.services.ITeledonServer;
import teledon.services.TeledonException;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class TeledonServerObjectProxy implements ITeledonServer {
    private String host;
    private int port;

    private ITeledonObserver client;

    private ObjectInputStream input;
    private ObjectOutputStream output;
    private Socket connection;

    private BlockingQueue<Response> qresponses;
    private volatile boolean finished;

    public TeledonServerObjectProxy(String host, int port) {
        this.host = host;
        this.port = port;
        qresponses = new LinkedBlockingQueue<Response>();
    }

    public void login(Voluntar user, ITeledonObserver client) throws TeledonException {
        initializeConnection();

        UserDTO udto = DTOUtils.getDTO(user);
        sendRequest(new LoginRequest(udto));

        Response response = readResponse();

        if (response instanceof OkResponse){
            this.client = client;
            return;
        }
        else if (response instanceof ErrorResponse){
            ErrorResponse err = (ErrorResponse)response;
            closeConnection();
            throw new TeledonException(err.getMessage());
        }
    }

    public void logout(Voluntar user, ITeledonObserver client) throws TeledonException {
        UserDTO udto = DTOUtils.getDTO(user);
        sendRequest(new LogoutRequest(udto));

        Response response = readResponse();
        closeConnection();

        if (response instanceof ErrorResponse){
            ErrorResponse err = (ErrorResponse)response;
            throw new TeledonException(err.getMessage());
        }
    }

    public Iterable<CazCaritabil> findAllCazuriCaritabile() {
        try {
            sendRequest(new GetCazuriRequest());
            Response response = readResponse();
            if (response instanceof ErrorResponse) {
                ErrorResponse err = (ErrorResponse) response;
                throw new TeledonException(err.getMessage());
            }
            GetCazuriResponse resp = (GetCazuriResponse)response;
            Iterable<CazCaritabil> cazuri = DTOUtils.getCazFromDTO(resp.getCazuri());
            return cazuri;
        } catch (TeledonException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void adaugaDonatie(DTODonatie donatieDTO) throws TeledonException {
        DonatieDTO dondto = DTOUtils.getDTO(donatieDTO);
        sendRequest(new AddRequest(dondto));
        Response response = readResponse();
        if (response instanceof ErrorResponse) {
            ErrorResponse err = (ErrorResponse)response;
            throw new TeledonException((err.getMessage()));
        }
    }

    public Iterable<Donator> cautaDonatori(String nume) {
        try {
            Donator donator = new Donator(nume);
            DonatorDTO donatorDTO = DTOUtils.getDTO(donator);
            sendRequest(new SearchRequest(donatorDTO));
            Response response = readResponse();
            if (response instanceof ErrorResponse) {
                ErrorResponse err = (ErrorResponse) response;
                throw new TeledonException(err.getMessage());
            }

            GetDonatoriResponse resp = (GetDonatoriResponse)response;
            return DTOUtils.getDonatorFromDTO(resp.getDonatori());

        } catch (TeledonException e) {
            e.printStackTrace();
            return null;
        }
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

    private void sendRequest(Request request)throws TeledonException {
        try {
            output.writeObject(request);
            output.flush();
        } catch (IOException e) {
            throw new TeledonException("Error sending object " + e);
        }
    }

    private Response readResponse() throws TeledonException {
        Response response = null;
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
            output = new ObjectOutputStream(connection.getOutputStream());
            output.flush();
            input = new ObjectInputStream(connection.getInputStream());
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

    private void handleUpdate(UpdateResponse update){
        if (update instanceof AddedResponse) {
            System.out.println("AddedResponse ..." + update);

            AddedResponse addResponse = (AddedResponse) update;

            Iterable<CazCaritabilDTO> cazuriDTO = addResponse.getCazuriDTO();
            Iterable<CazCaritabil> cazuri = DTOUtils.getCazFromDTO(cazuriDTO);
            try {
                System.out.println("Do that update proxy - enter");
                client.updateCazuriList(cazuri);
                System.out.println("Done that update proxy - exit");
            } catch (TeledonException e) {
                e.printStackTrace();
            }
        }
    }

    private class ReaderThread implements Runnable{
        public void run() {
            while(!finished){
                try {
                    Object response = input.readObject();
                    System.out.println("response received " + response);
                    if (response instanceof UpdateResponse) {
                        handleUpdate((UpdateResponse)response);
                    } else if (response instanceof  Response) {
                        try {
                            qresponses.put((Response) response);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                } catch (IOException | ClassNotFoundException e) {
                    System.out.println("Reading error " + e);
                }
            }
        }
    }
}
