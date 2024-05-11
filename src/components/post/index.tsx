import { Card, CardContent, Grid, Typography } from '@mui/material'
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { MediaType, PostModel } from '../../data/models/post.model';
import { getMediaType, getMediaURL } from '../../utils/util';

const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
};

interface PostProps {
    post: PostModel
}

const Post = ({ post }: PostProps) => {

    return (

        <Card sx={styles.itemWidth}>
            <CardContent >
                <Typography color="#4F4F4F" mb={2}>{post.caption}</Typography>
                <Slider {...settings} >
                    {post.media.map((media, key) => {
                        return (
                            <Grid
                                component={getMediaType(media) == MediaType.IMAGE ? "img" : "video"}
                                sx={styles.media}
                                src={getMediaURL(media)}
                                autoPlay
                                controls
                                key={key}
                            />
                        )
                    })}
                </Slider>
            </CardContent>
        </Card>


    )
}
const styles = {
    itemWidth: {
        width: '280px',
        height: 'auto',
        '@media (min-width: 600px)': {
            width: '560px !important',
            height: 'auto',

        }
    },
    media: {
        height: '248px',
        border: '0.1px solid lightgray',
        '@media (min-width: 600px)': {
            height: '528px',
            border: '0.1px solid lightgray',
        }
    }
}

export default Post