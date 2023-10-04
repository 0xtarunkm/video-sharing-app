import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface MediaCardProps {
  title: string;
  thumbnail: string;
  description: string;
}

export const MediaCard = ({
  title,
  thumbnail,
  description,
}: MediaCardProps) => {
  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardMedia sx={{ height: 220 }} image={thumbnail} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
