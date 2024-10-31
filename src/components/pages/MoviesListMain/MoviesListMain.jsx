import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { MoviesList } from "../../ui/MoviesList/MoviesList";
import { ErrorMessage } from "../../ui/ErrorMessage/ErrorMessage";
import { SelectMovies } from "../../ui/SelectMovies/SelectMovies";
import { MOVIE_LISTS } from '../../../constants';
import { useGetFilmsQuery } from "../../../services/kinopoiskApi";


export const MoviesListMain = () => {

  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.currentQuerySlice,
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    countries,
    order,
    year,
    genreId: myGenreId,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location])

  if (error) return <ErrorMessage />

  if (isLoading) return <SelectMovies />

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>

      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage} />
    </>
  )
}
