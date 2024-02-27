package com.example.backend.model;

public class Message {
    //设备ID
    private String clientId;
    //上报信息
    private String info;
    //设备数据
    private int value;
    //是否告警，0-正常，1-告警
    private int alert;
    //设备位置，经度
    private double lng;
    //设备位置，纬度
    private double lat;
    //上报时间，ms
    private long timestamp;

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public int getAlert() {
        return alert;
    }

    public int getValue() {
        return value;
    }

    public String getClientId() {
        return clientId;
    }

    public String getInfo() {
        return info;
    }

    public long getStamp() {
        return timestamp;
    }

    public void setAlert(int alert) {
        this.alert = alert;
    }

    public void setClientId(String device) {
        this.clientId = device;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public void setStamp(long stamp) {
        this.timestamp = stamp;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
