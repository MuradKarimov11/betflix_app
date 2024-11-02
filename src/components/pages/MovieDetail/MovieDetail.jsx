import { Link as ReactRouter, useNavigate, useParams } from "react-router-dom";
import { useGetFilmQuery, useGetSequelsAndPrequelsQuery, useGetStaffQuery } from "../../../services/kinopoiskApi";
import { Box, Button, ButtonGroup, Link, CircularProgress, Grid2, Stack, Typography } from "@mui/material";

import { MovieCard } from "../../ui/MovieCard/MovieCard";
import { ErrorMessage } from "../../ui/ErrorMessage/ErrorMessage";
import { ArrowBack, Language, Movie } from "@mui/icons-material";
import { VideoPlayer } from "../../ui/VideoPlayer/VideoPlayer";

export const MovieDetail = () => {
  const id = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (responseFilm.error || responseStaff.error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid2 container spacing={2} sx={{ mt: { md: 2 } }}>
        <Grid2 item md={4} sm={12}>
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            width="100%"
          />
        </Grid2>

        <Grid2 item md={6} sm={12}>
          <Grid2 container>
            <Grid2 item xs={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid2>
            <Grid2 item xs={4} alignContent="center">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 container>
            <Grid2 item xs={6}>
              <Typography>Год</Typography>
            </Grid2>
            <Grid2 item xs={6}>
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography>Страна</Typography>
            </Grid2>
            <Grid2 item xs={6}>
              {responseFilm.data.countries.map(({ country }) => (
                <Typography gutterBottom key={country}>
                  {country}
                </Typography>
              ))}
            </Grid2>

            <Grid2 item xs={6}>
              <Typography>Жанры</Typography>
            </Grid2>
            <Grid2 item xs={6}>
              {responseFilm.data.genres.map(({ genre }) => (
                <Typography gutterBottom key={genre}>
                  {genre}
                </Typography>
              ))}
            </Grid2>

            <Grid2 item xs={6}>
              <Typography>Режиссеры</Typography>
            </Grid2>
            <Grid2 item xs={6}>
              {responseStaff.data
                .filter(el => el.professionText === 'Режиссеры')
                .map(({ nameRu }) => (
                  <Typography gutterBottom key={nameRu}>
                    {nameRu}
                  </Typography>
                ))}
            </Grid2>

            <Grid2 item xs={6}>
              <Typography>Время</Typography>
            </Grid2>
            <Grid2 item xs={6}>
              <Typography gutterBottom>
                {responseFilm.data.filmLength} мин
              </Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography gutterBottom>Описание</Typography>
            </Grid2>
            <Grid2 item xs={12}>
              <Typography gutterBottom>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : 'Описание отсутствует'}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 item md={2} sm={12}>
          <Typography variant="h6">В главных ролях</Typography>
          {responseStaff.data
            .filter(el => el.professionText === 'Актеры')
            .slice(0, 10)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link
                  component={ReactRouter}
                  to={`/actor/${staffId}`}
                  gutterBottom
                >
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid2 item xs={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<Movie />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid2>

        <Grid2 item xs={12}></Grid2>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Смотреть онлайн
        </Typography>
        <VideoPlayer />
      </Grid2>

      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography gutterBottom variant="h5" sx={{ mt: 2, mb: 2 }}>
            Сиквелы и приквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            {responseSequelsAndPrequels.data.map(el => (
              <MovieCard key={el.filmId} movie={el} reload />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}
