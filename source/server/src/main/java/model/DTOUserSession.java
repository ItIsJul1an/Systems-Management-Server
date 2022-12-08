package model;

import entity.User;
import lombok.*;

import javax.websocket.Session;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DTOUserSession {//Datenübertragungsklasse
    private String user_id;
    private Session session;
    private String token;
}
