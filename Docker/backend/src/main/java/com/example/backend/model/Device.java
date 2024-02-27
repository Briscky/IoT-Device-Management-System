package com.example.backend.model;

public class Device {
    private int id;
    private String name;
    private int type;
    private String description;
    private int userid;
    private String activate_time;

    public int getId(){
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public int getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public int getUserid() {
        return userid;
    }

    public String getActivate_time() {
        return activate_time;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public void setActivate_time(String activate_time) {
        this.activate_time = activate_time;
    }

}
