import { io } from "socket.io-client";
import Emitter from "../Service/Emitter";
import { BASEURL } from "../Config/Config";

const socket = io(BASEURL);

// const socket = io("http://localhost:3001/");

// let clients:any; 
export class SocketUtils {
    private static isConnected = false
    private static clients: any = [];
    public static userID: string;

    static init() {
        socket.on('connect', () => {
            console.log("Socket connected",)
            // Remove the line 13. Add it after login/dashboard. 
            socket.emit('events', { type: 'web', userId: this.userID });
            this.isConnected = true
        });

        socket.on('app-connected', (data: any) => {
            console.log("APP CONECTED", {
                client: data.client,
                userId: data.userId,
                type: data.type
            })
            console.log("-------------", data);

            // this.updateStatus(data);

            if (data.type == "app") {
                console.log(data.userId, this.userID);
                
                if (this.clients.length == 0 && data.userId == this.userID) {
                    this.clients.push(data);
                }

                this.clients.forEach((client: any) => {
                    if (data.client != client.client && this.userID == client.userID) {
                        this.clients.push(data);
                    }
                });

                if (this.clients.length == 0) {
                    console.log("APP-NOT-CONNECTED FROM SOCKET UTIL");
                    Emitter.emit("APP-NOT-CONNECTED", "APP-NOT-CONNECTED");
                    return
                } else {
                    console.log("APP-CONNECTED FROM SOCKET UTIL");
                    Emitter.emit("APP-CONNECTED", "APP-CONNECTED");
                }
            }

            // save the client id in an array if not exists in the array and if userId is current userId.
            // if array is empty then bot is offline else online
        });

        socket.on('app-disconnected', (data) => {
            console.log("APP_DISCONNECTED", {
                client: data.client
            })

            console.log("+++++++++++++++", data);

            // if (data.type == "app") {
            this.clients.forEach((client: any, index: any) => {
                if (data.client == client.client) {
                    // this.clients.push(data);
                    this.clients.splice(index, 1);
                }
            });

            if (this.clients.length == 0) {
                console.log("APP-NOT-CONNECTED FROM SOCKET UTIL");
                Emitter.emit("APP-NOT-CONNECTED", "APP-NOT-CONNECTED");
                return
            } else {
                console.log("APP-CONNECTED FROM SOCKET UTIL");
                Emitter.emit("APP-CONNECTED", "APP-CONNECTED");
            }
            // }

            // save the client id in an array if not exists in the array and if userId is current userId.
            // if array is empty then bot is offline else online
        });
    }
}