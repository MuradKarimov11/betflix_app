import { Box, Link, Rating, Stack, Tooltip } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';

import styles from './MovieCard.module';

export const MovieCard = ({ movie }) => {

    return (
        <Stack>
            <RouterLink to={`/movie/${movie.kinopoiskId}`}>
                <img
                    src={movie.posterUrlPreview}
                    alt={movie.nameRu}
                    className={styles.img} />
            </RouterLink>

            <Link
                component={RouterLink}
                to={`/movie/${movie.kinopoiskId}`}
                textAlign='center'
                sx={{ width: "200px" }}>
                {movie.nameRu ? movie.nameRu : movie.nameEn}
            </Link>

            {movie.ratingKinopoisk && (
                <Stack alignItems='center'>
                    <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
                        <Box>
                            <Rating
                                name="read-only"
                                value={movie.ratingKinopoisk / 2}
                                readOnly
                                precision={0.1}
                            />
                        </Box>
                    </Tooltip>
                </Stack>
            )}
        </Stack>
    )
}
