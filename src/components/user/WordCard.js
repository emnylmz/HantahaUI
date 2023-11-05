import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { maxHeight } from '@mui/system';
import { useEffect } from 'react';
import { getCookie } from 'utils/utils';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { useRef } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function WordCard({ verbItem }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const expandMoreRef = useRef();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const token = getCookie('hanTaha-auth-token');
    if (token != null && token !== '') setIsAuthenticated(true);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className="flagCardRadius">
        <Grid container spacing={2} sx={{ minHeight: 100, maxHeight: 100 }}>
          {verbItem.countryModel.map((country, index) => (
            <Grid item xs={3} key={index}>
              <CardMedia
                height={40}
                width={40}
                component="img"
                src={country.imageUrl}
                alt={country.englishName}
                title={country.englishName}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <CardContent className="wordCardColor">
      <Typography variant="subtitle1" color="text.secondary">
          Dil:{verbItem.languageName}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {verbItem.context}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="wordCardRadius">
        {isAuthenticated && (
          <Tooltip title="Deftere Ekle">
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        )}
        {isAuthenticated && (
          <Tooltip title="Paylaş">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Tooltip>
        )}
        {verbItem.sentences.length > 0 ? (
          <Tooltip title="Detayı Gör">
            <ExpandMore ref={expandMoreRef} expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Tooltip>
        ) : (
          <Tooltip title="Girilmiş cümle yok">
          <ExpandMore>
              <SpeakerNotesOffIcon />
          </ExpandMore>
        </Tooltip>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Sentences:</Typography>
          {verbItem.sentences.map((sentence, index) => (
            <Typography key={index} paragraph>
              <b>{sentence.languageName}:</b>{sentence.context}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
