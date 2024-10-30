import { useMoviesQuery } from "../../../hooks/useMoviesQuery";

export const Movies = () => {

  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <p>Loading...</p>

  return (
    <div>Movies</div>
  )
}
