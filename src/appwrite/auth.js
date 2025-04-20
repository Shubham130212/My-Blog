import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
   client=new Client();
   account;

   constructor(){
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.account=new Account(this.client);
   }

   async createAccount({ email, password, name }){
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            return user;
        } catch (error) {
            console.error("Error in creating account:", error);
            throw error;
        }
    }

    async Login({ email, password }){
        try {
            const session = await this.account.createEmailSession(email, password);
            return session;
        } catch (error) {
            console.error("Error in login:", error);
            throw error;
        }
    }

    async currentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Error in getting current user:", error);
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in logout:", error);
            throw error;
        }
    }
}
const authService=new AuthService();
export default authService; 