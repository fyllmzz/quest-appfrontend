import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";


import { PostWithAuth, RefreshToken } from "../../services/HttpService";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";



function CommentForm(props) {
    const {userId, userName, postId, setCommentRefresh} = props;

    const [text, setText] = useState("");

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        history.go(0)
    }

    const saveComment = () => {
        PostWithAuth("/comments",{
            postId: postId,
            userId : userId,
            text : text,
        })
            .then((res) => {
                if(!res.ok) {
                    RefreshToken()
                        .then((res) => { if(!res.ok) {
                            logout();
                        } else {
                            return res.json()
                        }})
                        .then((result) => {
                            console.log(result)

                            if(result !== undefined){
                                localStorage.setItem("tokenKey",result.accessToken);
                                saveComment();
                                setCommentRefresh();
                            }})
                        .catch((err) => {
                            console.log(err)
                        })
                } else
                    res.json()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }

    const handleChange = (value) => {
        setText(value);
    }
    return(
        <CardContent>

            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps = {{maxLength : 250}}
                fullWidth
                onChange = {(i) => handleChange(i.target.value)}
                startAdornment = {
                    <InputAdornment position="start">
                        <Link  to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment = {
                    <InputAdornment position = "end">
                        <Button
                            variant = "contained"
                            style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'}}
                            onClick = {handleSubmit}
                        >Comment</Button>
                    </InputAdornment>
                }
                value = {text}
                style = {{ color : "black",backgroundColor: 'white'}}
            ></OutlinedInput>
        </CardContent>

    )
}


export default CommentForm;