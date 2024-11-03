import { Box, Button, CircularProgress, Grid2, Link, Stack, Typography } from "@mui/material";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { ErrorMessage } from '../../ui/ErrorMessage/ErrorMessage';
import { useGetStaffByIdQuery } from "../../../services/kinopoiskApi";

export const ActorDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        margin='auto'
      >
        <CircularProgress size='8rem' />
      </Box>
    )
  }

  if (error) return <ErrorMessage />

  return (
    <>
      <Grid2 container spacing={4} pt={1}>
        <Grid2 item xs={12} md={4}>
          <img src={data.posterUrl} style={{ width: "100%" }} alt={data.nameRu} />
        </Grid2>

        <Grid2 item xs={12} md={8}>
          <Stack flexDirection='row' >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color='primary'
            ></Button>
            <Stack flexDirection='column'>
              <Typography variant="h5">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>

          <Typography gutterBottom variant="h5" >Об актере</Typography>

          <Grid2 container>
            <Grid2 xs={6}>
              <Typography>Карьера</Typography>
            </Grid2>
            <Grid2 xs={6}>
              <Typography>{data.profession}</Typography>
            </Grid2>

            <Grid2 xs={6}>
              <Typography gutterBottom>Рост</Typography>
            </Grid2>
            <Grid2 xs={6}>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid2>

            <Grid2 xs={6}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid2>
            <Grid2 xs={6}>
              <Typography gutterBottom>
                {data.birthday} ({data.age} лет)
              </Typography>
            </Grid2>

            <Grid2 xs={6}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid2>
            <Grid2 xs={6}>
              <Typography>{data.films.length}</Typography>
            </Grid2>

            <Grid2 xs={6}>
              <Typography gutterBottom>Факты</Typography>
            </Grid2>
            <Grid2 xs={12}>
              {data.facts.map((fact, index) => (
                <Typography gutterBottom key={fact}>
                  {index + 1}.{fact}
                </Typography>
              ))}
            </Grid2>

          </Grid2>
        </Grid2>

        <Grid2 item xs={12}>
          <Typography variant="h5">Фильмы</Typography>
        </Grid2>

      </Grid2>

      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex(el => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>{index + 1}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating ? film.rating : '-'}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  )
}
