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

public class TeledonClientObjectWorker implements Runnable, ITeledonObserver {
    private ITeledonServer server;
    private Socket connection;

    private ObjectInputStream input;
    private ObjectOutputStream output;
    private volatile boolean connected;

    public TeledonClientObjectWorker(ITeledonServer server, Socket connection) {
        this.server = server;
        this.connection = connection;

        try {
            output = new ObjectOutputStream(connection.getOutputStream());
            output.flush();
            input = new ObjectInputStream(connection.getInputStream());
            connected = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void run() {
        while (connected) {
            try {
                Object request = input.readObject();
                Object response = handleRequest((Request) request);
                if (response != null) {
                    sendResponse((Response)response);
                }
            } catch (IOException | ClassNotFoundException e) {
                e.printStackTrace();
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        try {
            input.close();
            output.close();
            connection.close();
        } catch (IOException e) {
            System.out.println("Error " + e);
        }
    }

    private Response handleRequest(Request request) {
        if (request instanceof LoginRequest) {
            System.out.println("Login request ...");

            LoginRequest loginRequest = (LoginRequest)request;
            UserDTO userDTO = loginRequest.getUser();
            Voluntar user = DTOUtils.getFromDTO(userDTO);
            try {
                server.login(user, this);
                return new OkResponse();
            } catch (TeledonException e) {
                connected = false;
                return new ErrorResponse(e.getMessage());
            }
        }
        else if (request instanceof LogoutRequest) {
            System.out.println("Logout request ...");

            LogoutRequest logoutRequest = (LogoutRequest) request;
            UserDTO userDTO = logoutRequest.getUser();
            Voluntar user = DTOUtils.getFromDTO(userDTO);
            try {
                server.logout(user, this);
                connected = false;
                return new OkResponse();

            } catch (TeledonException e) {
                return new ErrorResponse(e.getMessage());
            }
        }
        else if (request instanceof GetCazuriRequest) {
            System.out.println("GetCazuriRequest ...");
            Iterable<CazCaritabilDTO> cazuriDTO = null;
            try {
                cazuriDTO = DTOUtils.getDTO(server.findAllCazuriCaritabile());
            } catch (TeledonException e) {
                e.printStackTrace();
            }
            return new GetCazuriResponse(cazuriDTO);
        }
        else if (request instanceof AddRequest) {
            System.out.println("AddRequest ...");

            AddRequest addRequest = (AddRequest) request;
            DonatieDTO donatieDTO = addRequest.getDonatie();
            DTODonatie donatie = DTOUtils.getFromDTO(donatieDTO);
            try {
                server.adaugaDonatie(donatie);
                return new OkResponse();

            } catch (TeledonException e) {
                return new ErrorResponse(e.getMessage());
            }
        }
        else if (request instanceof SearchRequest) {
            System.out.println("SearchRequest ...");
            SearchRequest searchRequest = (SearchRequest) request;
            DonatorDTO donatorDTO = searchRequest.getDonator();
            Iterable<DonatorDTO> donatoriDTO = null;
            try {
                donatoriDTO = DTOUtils.getDTOS(server.cautaDonatori(donatorDTO.getName()));
            } catch (TeledonException e) {
                e.printStackTrace();
            }
            return new GetDonatoriResponse(donatoriDTO);
        }
        return null;
    }

    private void sendResponse(Response response) throws IOException {
        System.out.println("Sending response " + response);
        output.writeObject(response);
        output.flush();
    }

    @Override
    public void updateCazuriList(Iterable<CazCaritabil> cazuriCaritabile) throws TeledonException {
        Iterable<CazCaritabilDTO> cazuriDTO = DTOUtils.getCazDTOs(cazuriCaritabile);
        System.out.println("Cazuri actualizate " + cazuriDTO);
        try {
            System.out.println("Send response");
            sendResponse(new AddedResponse(cazuriDTO));
            System.out.println("Sended response");
        } catch (IOException e) {
            throw new TeledonException("Sending error: " + e);
        }
    }
}