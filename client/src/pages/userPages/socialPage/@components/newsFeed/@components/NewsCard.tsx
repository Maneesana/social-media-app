import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export interface INewsCard {
  title: string;
  publishedDate: Date | string;
  articleLink: string;
  media: string;
  content: string;
}

const NewsCard = ({ title, publishedDate, articleLink, media, content }: INewsCard) => {
  return (
    <Card
      sx={{
        background: 'linear-gradient(333deg, rgba(174,218,222,0.2) 41%, rgba(234,197,236,0.2) 79%)',
        padding: '10px',
        maxWidth: '570px',
        borderRadius: '8px',
        marginTop: '13px',
      }}
    >
      <CardHeader title={title || 'N/A'} subheader={new Date(publishedDate).toDateString()} />
      <CardMedia
        sx={{
          objectFit: 'contain',
        }}
        component='img'
        height='304'
        image={
          media ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFsim7mJetzNBK672yN0qjry6QJot2drW_w&usqp=CAU'
        }
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content || 'N/A'}
        </Typography>
      </CardContent>
      <Button
        sx={{
          marginBottom: '10px',
          border: '0.5px solid #d3c7f2',

          ':hover': {
            background: '#638ac2',
            color: '#fff',
          },
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={`${articleLink}`}
          target='_blank'
        >
          read more..
        </Link>
      </Button>
    </Card>
  );
};

export default NewsCard;
