import { useGetFilmsTopQuery } from "../../../services/kinopoiskApi"


export const MoviesListTop = () => {
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: 'TOP_POPULAR_ALL',
    page: 1
  });

  return (
    <div>MoviesListTop</div>
  )
}
