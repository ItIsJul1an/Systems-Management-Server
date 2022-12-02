package repository;

import entity.Client;
import entity.Tasks;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.springframework.stereotype.Repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Repository
@ApplicationScoped
public class TasksRepository implements PanacheRepository<Tasks> {
    @Transactional
    public void deleteTasksById(String id){
        delete("ID = ?1", id);
    }

    @Transactional
    public ArrayList<Tasks> getTastksByClientId(String client_ID){
        return (ArrayList<Tasks>) find("Client_ID", client_ID).list();
    }


    public Tasks findById(String id) {
        return find("ID", id).firstResult();
    }

    public Tasks findByPackage_ID(String id) {
        return find("Package_ID", id).firstResult();
    }

    public Tasks findByScript_ID(String id) {
        return find("Script_ID", id).firstResult();
    }


    @Transactional
    public void deleteTasksByPackage_ID(String id, String client_id){
        delete("Package_ID = ?1 and Client_ID = ?2", id, client_id);
    }

    @Transactional
    public void deleteTasksByPackage_ID(String id){
        delete("Package_ID = ?1", id);
    }

    @Transactional
    public void deleteTasksByClient_ID(String id){
        delete("Client_ID = ?1", id);
    }


    @Transactional
    public void deleteTasksByScript_ID(String id, String client_id){
        delete("Script_ID = ?1 and Client_ID = ?2", id, client_id);
    }

    @Transactional
    public void deleteTasksByScript_ID(String id){
        delete("Script_ID = ?1", id);
    }


}
