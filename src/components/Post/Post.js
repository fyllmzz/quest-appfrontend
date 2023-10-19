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
function Post(props){
    const{title, text}=props;
    const [expanded, setExpanded] = React.useState(false);
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('tr-TR', options);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return(
        <div>

            <Card sx={{ width: 800 ,textAlign:"left"}} >
                <CardHeader
                    avatar={
                        <Avatar  sx={{ backgroundColor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={title}
                    // subheader={formattedDate }
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {/*<IconButton aria-label="share">*/}
                    {/*    <ShareIcon />*/}
                    {/*</IconButton>*/}
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