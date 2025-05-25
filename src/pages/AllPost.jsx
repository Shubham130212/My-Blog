import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/dbconfig";
import { Query } from "appwrite";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   appwriteService
  //     .getPosts([])
  //     .then((posts) => setPosts(posts))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    setLoading(true);
     appwriteService
      //.getPosts([])
      .getPosts([
        Query.equal("status", "active"),
        //Query.orderAsc("createdAt"),
        Query.limit(100),
        Query.offset(0),
      ])
      .then((response) => {
        if (response && response.documents) {
          setPosts(response.documents);
          setLoading(false)
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.code, error.message);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

   if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">Loading posts...</h1>
        </Container>  
      </div>
    );
  }

  return (
    <div className="w-full py-22">
       <Container>
        {posts.length === 0 ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">No active posts available</h1>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
