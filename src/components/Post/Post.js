import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import {Link} from "react-router-dom";
function Post(props){
    const{title, text, userName,userId}=props;
    const [expanded, setExpanded] = React.useState(false);
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('tr-TR', options);
    const [selectFavorites, setSelectFavorites] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLike = () => {
        setSelectFavorites(!selectFavorites);
    };

    return(
        <div>

            <Card sx={{ width: 800 ,textAlign:"left"}} >
                <CardHeader
                    avatar={
                        <Link className="link" to={{pathname:"/users/"+userId}}>
                        <Avatar  sx={{ backgroundColor: red[500] }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>

                    }
                    title={userName}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites"
                        //color={selectFavorites ? "warning" :"default"}
                    >
                        <FavoriteIcon style={selectFavorites ? {color:"red"} : null} />
                    </IconButton>
                    <IconButton
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{ marginLeft: 'auto' }}
                    >
                        <InsertCommentIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded}  timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            iii
                        </Typography>
                        <Typography paragraph>
                            hhh
                        </Typography>
                        <Typography paragraph>
                            eee
                        </Typography>
                        <Typography>
                            ğğğ
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>



        </div>
    )

} export default Post;