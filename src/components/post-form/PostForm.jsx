import React, { useState, useCallback,useEffect } from "react";
import {  useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/dbconfig";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";

/** Watch - This function is used to observe and retrieve the value of form fields in real time. */

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const user = await authService.currentUser();
        setUserData(user);
        console.log("Fetched userData:", user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data. Please log in.");
      }
    };
    fetchUser();
  },[])

  const submit = async (data) => {
    setError(null);
    setLoading(true);
    /** update image */
    if (!userData) {
        setError("Please log in to create or update a post.");
        return;
    }
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadImage(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteImage(post.image);
      }
      /**update post */
      const postData = await appwriteService.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (postData) {
        navigate(`/post/${postData.$id}`);
      }
    }else{
        if(!data.image[0]){
          setError("Please select an image");
        }
        const file = await appwriteService.uploadImage(data.image[0]);
        if(file){
            const fileId=file.$id
            data.image=fileId
            const postData=await appwriteService.createPost({
                ...data,
                userId:userData.$id
            })
            if(postData){
                navigate(`/post/${postData.$id}`);
            }
        }
    }
 }
    /** This will read the title and add item */
    const slugTransform=useCallback((value)=>{
        if(value && typeof value==='string'){
            return value.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
        }else{
            return ''
        }
    },[])
    
    /** This effect auto-generates a slug from the "title" input whenever the user types into the "title" field, and sets it into the "slug" field  */
    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })
        return () => subscription.unsubscribe()  /* when the component unmounts or dependencies change, avoiding memory leaks.*/

    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            
          <div className="w-2/3 px-2">
            <Input
              label="Title"
              placeholder="Enter your title"
              type="text"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="Enter your slug"
              type="text"
              {...register("slug", { required: true })}
              onInput={(e)=>{
                setValue('slug',slugTransform(e.target.value),{shouldValidate:true})
              }}
            />
            <RTE
              control={control}
              name="content"
              label="Content"
              defaultValues={getValues("content")}
            />
          </div>

          <div className="w-1/3 px-2">
             <Input
              label="Image"
              type="file"
              className="mb-4"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                    src={appwriteService.getImagePreview(post.image)}
                    alt={post.title}
                    className="object-cover w-full h-full rounded-lg"
                    />
                </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post?"bg-green-500":undefined} className="w-full">
              {post ? "Update" : "Submit"}</Button>
          </div>
        </form>
    )
}

export default PostForm;
