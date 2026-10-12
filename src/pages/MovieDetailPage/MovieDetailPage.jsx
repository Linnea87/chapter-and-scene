import { useParams } from "react-router";
import { useGetTitleDetailsQuery } from "../../services/tmdb/tmdbApi";
import getImageUrl from "../../services/tmdb/getImageUrl";
import { getMoviePrices } from "../../features/pricing/pricingHelpers";
import formatRuntime from "../../utils/formatRuntime";
import isNotFoundError from "../../utils/isNotFoundError";
import CastList from "../../components/details/CastList/CastList";
import DetailHero from "../../components/details/DetailHero/DetailHero";
import DetailLayout from "../../components/details/DetailLayout/DetailLayout";
import DetailTabs from "../../components/details/DetailTabs/DetailTabs";
import PriceOptions from "../../components/pricing/PriceOptions/PriceOptions";
import TitleNotFound from "../../components/ui/feedback/TitleNotFound/TitleNotFound";
import Loader from "../../components/ui/feedback/Loader/Loader";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";

// ===== Movie detail page =====
// Shows one movie with facts, tabs to watch the movie, read the book and,
// for movies in a movie series, see the other movies. Then the cast.
// The id comes from the URL (/movie/:id).

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

  // A 404 means the id does not exist, so retrying would not help
  if (isNotFoundError(error)) {
    return (
      <DetailLayout>
        <TitleNotFound />
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

  // --- What is added to the cart ---
  // A small poster is enough for the cart row
  const product = {
    id: movie.id,
    mediaType: "movie",
    title: movie.title,
    imageUrl: getImageUrl(movie.posterPath, "w185"),
  };

  return (
    <DetailLayout>
      <DetailHero details={movie} meta={meta} />

      {/* --- Watch, read and movie series --- */}
      <DetailTabs
        watchLabel="Watch the movie"
        watchPanel={
          <PriceOptions
            product={product}
            options={priceOptions}
          />
        }
        book={{ title: movie.title, author: movie.author, mediaType: "movie" }}
        collection={movie.collection}
        movieId={movie.id}
      />

      <CastList cast={movie.cast} />
    </DetailLayout>
  );
};

export default MovieDetailPage;
