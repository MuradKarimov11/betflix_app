import { Pagination, Stack } from "@mui/material"
import { MovieCard } from "../MovieCard/MovieCard"


export const MoviesList = ({ movies, totalPages, page, setPage }) => {

    return (
        <>
            <Stack
                direction='row'
                justifyContent="center"
                flexWrap='wrap'
            >
                {movies.map((movie) => (
                    <MovieCard key={movie.kinopoiskId} movie={movie} />
                ))}
            </Stack>

            <Stack alignItems="center">
                <Pagination
                    count={totalPages}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    page={page}
                    onChange={(_, value) => setPage(value)}
                />
            </Stack>

        </>
    )
}
