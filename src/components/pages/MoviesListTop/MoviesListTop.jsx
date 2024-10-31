import { useEffect, useState } from "react";
import { useGetFilmsTopQuery } from "../../../services/kinopoiskApi";

import { TOP_LISTS } from '../../../constants';
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { MoviesList } from "../../ui/MoviesList/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import { ErrorMessage } from "../../ui/ErrorMessage/ErrorMessage";
import { SelectMovies } from "../../ui/SelectMovies/SelectMovies";


export const MoviesListTop = () => {

  const location = useLocation();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = TOP_LISTS.find(el => el.url === location.pathname);

  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page
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
