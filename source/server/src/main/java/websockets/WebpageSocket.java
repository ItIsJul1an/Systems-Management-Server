package websockets;

import annotations.Adding;
import annotations.Login;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import controller.WebpageControllerUser;
import data.SMSStore;
import entity.*;
import entity.Package;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import model.DTOPackage;
import model.DTOResponse;
import model.DTOScript;
import model.DTOUserSession;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;

@ServerEndpoint("/webpage/{id}/{token}")
@Login(roles = {"User", "Admin"})
@ApplicationScoped
@RequiredArgsConstructor
@Getter
public class WebpageSocket {

    @Inject
    protected SMSStore smsStore;
    private Login anno = null;

    private ArrayList<DTOUserSession> userSessions = new ArrayList<>();

    @PostConstruct
    public void init() {
        anno = WebpageControllerUser.class.getAnnotation(Login.class);
    }


    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token, @PathParam("id") String id) {
        if (smsStore.isAllowed(token, id, anno)) {
            DTOUserSession userSession = new DTOUserSession(id, session);
            userSessions.add(userSession);
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("token") String token, @PathParam("id") String id) {

    }

    @OnError
    public void onError(Session session, @PathParam("token") String token, @PathParam("id") String id, Throwable throwable) {

    }

    @OnMessage
    public void onMessage(Session session, String message, @PathParam("token") String token, @PathParam("id") String id) {

    }

    public void sendMessage(){
        for(DTOUserSession userSession : userSessions){
           // userSession.getSession().getAsyncRemote().sendText()
        }
    }
}
