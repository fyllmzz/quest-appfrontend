import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

function Home(){

    const [ error , setError ] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] =useState([]);

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [])

    // useEffect(() => {
    //     fetch("/posts")
    //         .then(res=>res.json())
    //         .then(
    //             (result)=>{
    //                 setIsLoaded(true)
    //                 setPostList(result)
    //
    //             },
    //             (error)=>{
    //                 setIsLoaded(true)
    //                 setError(error)
    //             }
    //         )
    // },[])

    if(error){
        return <div> ERRORR</div>;
    } else if(!isLoaded){
        return <div> İS LOADİNG...</div>
    }else {
        return(
                <div className="container">
                    {localStorage.getItem("currentUser") !== null ?
                        <PostForm userId = {localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts = {refreshPosts}/>
                        : "" }
                    {postList.map(post => (
                        <Post   title={post.title} postId = {post.id} text={post.text} userId={post.userId} userName={post.userName}></Post>

                    ))}
                </div>
        )
    }

} export default Home;
