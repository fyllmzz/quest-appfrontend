
import React, {useState} from "react";
import {Link} from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
import {InputAdornment, OutlinedInput, Snackbar} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


function PostForm(props) {
    const {userId, refreshPosts} = props;

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        PostWithAuth("/posts", {
            title: title,
            userId : userId,
            text : text,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return(
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                {/*<Alert onClose={handleClose} severity="success">*/}
                {/*    Your post is sent!*/}
                {/*</Alert>*/}
            </Snackbar>
            <Card>
                <CardHeader
                    avatar={
                        <Link  to={{pathname : '/users/' + userId}}>
                            {/*<Avatar aria-label="recipe" className={classes.avatar}>*/}
                            {/*    {userName.charAt(0).toUpperCase()}*/}
                            {/*</Avatar>*/}
                        </Link>
                    }
                    title= {<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder = "Title"
                        inputProps = {{maxLength : 25}}
                        fullWidth
                        value = {title}
                        onChange = { (i) => handleTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder = "Text"
                            inputProps = {{maxLength : 250}}
                            fullWidth
                            value = {text}
                            onChange = { (i) => handleText(i.target.value)}
                            endAdornment = {
                                <InputAdornment position = "end">
                                    <Button
                                        variant = "contained"
                                        style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white'}}
                                        onClick = {handleSubmit}
                                    >Post</Button>
                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm;