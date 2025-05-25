const config={
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appWriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMceKey:String(import.meta.env.TINY_MCE_KEY),
}

export default config