import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import Container from '@mui/material/Container';
function Home(){

    const [ error , setError ] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] =useState([]);

    useEffect(() => {
        fetch("/posts")
            .then(res=>res.json())
            .then(
                (result)=>{
                    setIsLoaded(true)
                    setPostList(result)

                },
                (error)=>{
                    setIsLoaded(true)
                    setError(error)
                }
            )
    },[])

    if(error){
        return <div> ERRORR</div>;
    } else if(!isLoaded){
        return <div> İS LOADİNG...</div>
    }else {
        return(
            <div>
                {/*props
                 parets ve child arasındaki ilişkiyi sağlar
                 home parent component, post ise child component
                 */}

                <Container fixed className="container">
                    {postList.map(post => (
                        <Post title={post.title} text={post.text} userId={post.userId} userName={post.userName}></Post>

                    ))}
                </Container>
            </div>
        )
    }

} export default Home;
