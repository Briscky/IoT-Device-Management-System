import paho.mqtt.client as mqtt
import time
import json
import mysql.connector

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("testapp")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload.decode()))
    # 将消息插入数据库
    msg_json = json.loads(msg.payload.decode())
    insert_message_into_db(msg_json)

def insert_message_into_db(msg_json):
    try:
        # 连接到数据库（请根据您的数据库配置修改这些参数）
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Gy2574118",
            database="bs"
        )
        cursor = conn.cursor()

        # 插入消息的SQL语句（根据您的数据库结构调整）
        query = "INSERT INTO message VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (msg_json["clientId"],msg_json["info"],msg_json["value"],msg_json["alert"],msg_json["lng"],msg_json["lat"],msg_json["timestamp"])

        cursor.execute(query, values)

        query = "UPDATE device SET activate_time = %s WHERE name = %s"
        values = (msg_json["timestamp"], msg_json["clientId"])
        cursor.execute(query, values)

        conn.commit()

        print("Message inserted into database")

    except mysql.connector.Error as error:
        print("Failed to insert message into database: {}".format(error))

    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
client.loop_forever() 


