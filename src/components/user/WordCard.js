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
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { fontSize, fontWeight, maxHeight, width } from '@mui/system';
import { useEffect } from 'react';
import { getCookie } from 'utils/utils';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WordCard({ verbItem }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePopupClickOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = getCookie('hanTaha-auth-token');
    if (token != null && token !== '') setIsAuthenticated(true);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handlePopupClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div style={{fontSize:"20px",fontWeight:"bold"}}>Verb: {verbItem.context}</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <CardContent>
              <Typography paragraph>
                <b>Sentences:</b>
              </Typography>
              {verbItem.sentences.map((sentence, index) => (
                <Typography key={index} paragraph>
                  <b style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    {sentence.languageName}:
                    {sentence.countryModel.map((country, index) => (
                      <img key={index} style={{ height: 30, width: 30, marginLeft: 5 }} src={country.imageUrl} alt={country.name} />
                    ))}
                  </b>
                  {sentence.context.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {i + 1}-){line}
                    </span>
                  ))}
                </Typography>
              ))}
            </CardContent>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <ImageList
        className="flagCardRadius"
        cols={4} // Set the number of columns to 4
        gap={2} // Adjust the gap between images
        sx={{
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr)) !important',
          justifyContent: 'space-between' // Equal space between items
        }}
      >
        {verbItem.countryModel.map((country, index) => (
          <ImageListItem key={index} sx={{ padding: 2 }}>
            {' '}
            {/* Adjust the padding value as needed */}
            <img
              style={{ height: 30, width: 30, objectFit: 'cover' }}
              src={country.imageUrl}
              alt={country.englishName}
              title={country.englishName}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <CardContent className="wordCardColor">
        <Typography variant="subtitle1" color="text.secondary">
          <b>Language:</b> {verbItem.languageName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          <b>Verb:</b> {verbItem.context}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          <b>Turkish:</b>
          {verbItem.turkishContext}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="wordCardRadius">
        {isAuthenticated && (
          <Tooltip title="Deftere Ekle">
            <IconButton>
              <FavoriteIcon style={{ width: '0.8em', height: '0.8em' }} />
            </IconButton>
          </Tooltip>
        )}
        {isAuthenticated && (
          <Tooltip title="Paylaş">
            <IconButton aria-label="share">
              <ShareIcon style={{ width: '0.8em', height: '0.8em' }} />
            </IconButton>
          </Tooltip>
        )}
        {verbItem.sentences.length > 0 ? (
          <Tooltip title="Detayı Gör">
            <ExpandMore onClick={() => setOpen(true)}>
              <ChromeReaderModeIcon style={{ width: '0.8em', height: '0.8em' }} />
            </ExpandMore>
          </Tooltip>
        ) : (
          <Tooltip title="Girilmiş cümle yok">
            <ExpandMore>
              <SpeakerNotesOffIcon style={{ width: '0.8em', height: '0.8em' }} />
            </ExpandMore>
          </Tooltip>
        )}
      </CardActions>
      <Collapse className="sentencesCard" in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
