import config from "../config/config";
import { Client,  ID,Databases,Storage, Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId)
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,image,status,userId}){
        try {
            const post=await this.database.createDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{
                title,
                content,
                image,
                status,
                userId
            });
            return post;
        } catch (error) {
            console.error("Error in creating post:", error);
            throw error;
        }
    }

    async updatePost(slug,{title,content,image,status}){
        try {
            const post=await this.database.updateDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug,{
                title,
                slug,
                content,
                image,
                status,
            });
            return post;
        } catch (error) {
            console.error("Error in updating post:", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug);
            return true;
        } catch (error) {
            console.error("Error in deleting post:", error);
            throw error;
        }
    }

    async getPost(slug){
        try {
            const post=await this.database.getDocument(config.appWriteDatabaseId,config.appWriteCollectionId,slug);
            return post;
        } catch (error) {
            console.error("Error in getting post:", error);
            throw error;
        }
    }

    async getPosts(queries=[Query.equal("status","active"),Query.orderAsc("createdAt"),Query.limit(100),Query.offset(0)]){
        try {
            const posts=await this.database.listDocuments(config.appWriteDatabaseId,config.appWriteCollectionId,queries);
            return posts;
        } catch (error) {
            console.error("Error in getting posts:", error);
            throw error;
        }
    }

    async uploadImage(file){
        try {
            const image=await this.bucket.createFile(config.appWriteBucketId,ID.unique(),file);
            return image;
        } catch (error) {
            console.error("Error in uploading image:", error);
            throw error;
        }
    }

    async deleteImage(fileId){
        try {
            await this.bucket.deleteFile(config.appWriteBucketId,fileId);
            return true;
        } catch (error) {
            console.error("Error in deleting image:", error);
            throw error;
        }
    }

    async getImagePreview(fileId){
        try {
            const image=await this.bucket.getFilePreview(config.appWriteBucketId,fileId);
            return image;
        } catch (error) {
            console.error("Error in image preview:", error);
            throw error;
        }
    }
}

const service=new Service();
export default service;