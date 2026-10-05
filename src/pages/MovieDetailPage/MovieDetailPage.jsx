import { useParams } from "react-router";
import DetailLayout from "../../components/details/DetailLayout/DetailLayout";
import { useGetTitleDetailsQuery } from "../../services/tmdb/tmdbApi";
import { getMoviePrices } from "../../features/pricing/pricingHelpers";
import formatRuntime from "../../utils/formatRuntime";
import CastList from "../../components/details/CastList/CastList";
import DetailHero from "../../components/details/DetailHero/DetailHero";
import PriceOptions from "../../components/details/PriceOptions/PriceOptions";
import Loader from "../../components/common/Loader/Loader";
import LoadError from "../../components/common/LoadError/LoadError";

// ===== Movie detail page =====
// Shows one movie with facts, prices and cast. The id comes from the URL (/movie/:id).

const MovieDetailPage = () => {
  const { id } = useParams();

  // currentData is empty while a new id loads, so the previous movie is never shown
  const {
    currentData: movie,
    isFetching,
    error,
    refetch,
  } = useGetTitleDetailsQuery({ mediaType: "movie", id });

  // --- Loading and error ---
  if (isFetching) {
    return (
      <DetailLayout>
        <Loader label="Loading movie" />
      </DetailLayout>
    );
  }

  if (error || !movie) {
    return (
      <DetailLayout>
        <LoadError title="We couldn't load this movie" onRetry={refetch} />
      </DetailLayout>
    );
  }

  // --- Facts shown under the title ---
  // filter(Boolean) removes facts that are missing
  const meta = [
    movie.year,
    formatRuntime(movie.runtime),
    movie.rating ? `Rating ${movie.rating.toFixed(1)}` : null,
  ].filter(Boolean);

  // --- Prices ---
  const prices = getMoviePrices(movie.year);
  const priceOptions = [
    { id: "rent", label: "Rent for 48 hours", price: prices.rent },
    { id: "buy", label: "Buy", price: prices.buy },
  ];

  return (
    <DetailLayout>
      <DetailHero details={movie} meta={meta} />
      <PriceOptions title="Watch the movie" options={priceOptions} />
      <CastList cast={movie.cast} />
    </DetailLayout>
  );
};

export default MovieDetailPage;
