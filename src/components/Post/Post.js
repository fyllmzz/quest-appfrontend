import React, {useEffect, useRef, useState} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom";
import {Container} from "@mui/material";
import {Comment} from "@mui/icons-material";
import {DeleteWithAuth, PostWithAuth} from "../../services/HttpService";
import CommentForm from "../Comment/CommentForm";
function Post(props){

    const {title, text, userId, userName, postId} = props;

    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(0);
    const [likeId, setLikeId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    let disabled = localStorage.getItem("currentUser") == null ? true:false;

    const setCommentRefresh = () => {
        setRefresh(true);
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount + 1)
        }
        else{
            deleteLike();
            setLikeCount(likeCount - 1)
        }

    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )

        setRefresh(false)
    }

    const saveLike = () => {
        PostWithAuth("/likes",{
            postId: postId,
            userId : localStorage.getItem("currentUser"),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        DeleteWithAuth("/likes/"+likeId)
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [refresh])


    return(
        <div>

            <Card sx={{ width: 800 ,textAlign:"left", margin:"20px"}}>
                <CardHeader
                    avatar={
                        <Link   to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe" >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked? { color: "red" } : null} />
                        </IconButton> :
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked? { color: "red" } : null} />
                        </IconButton>
                    }
                    {likeCount}
                    <IconButton
                        sx={{  margin:"20px"}}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed >
                        {error? "error" :
                            isLoaded? commentList.map(comment => (
                                <Comment userId = {comment.userId} userName = {comment.userName} text = {comment.text}></Comment>
                            )) : "Loading"}
                        {disabled? "":
                            <CommentForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} postId = {postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
                    </Container>
                </Collapse>
            </Card>


        </div>
    )

} export default Post;