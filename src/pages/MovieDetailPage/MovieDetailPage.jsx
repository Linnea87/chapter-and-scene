// ===== Movie detail page =====
// Shows one movie with facts, tabs to watch the movie, read the book and,
// for movies in a movie series, see the other movies. Then the cast.
// The id comes from the URL (/movie/:id).

import { useParams } from "react-router";
import { useGetTitleDetailsQuery } from "../../services/tmdb/tmdbApi";
import getImageUrl from "../../services/tmdb/getImageUrl";
import { FORMAT_LABELS } from "../../features/cart/cartConfig";
import { createStoryId } from "../../features/cart/cartHelpers";
import { getMoviePrices } from "../../features/pricing/pricingHelpers";
import formatRuntime from "../../utils/formatRuntime";
import isNotFoundError from "../../utils/isNotFoundError";
import CastList from "../../components/details/CastList/CastList";
import DetailHero from "../../components/details/DetailHero/DetailHero";
import DetailLayout from "../../components/details/DetailLayout/DetailLayout";
import DetailTabs from "../../components/details/DetailTabs/DetailTabs";
import BundleOffer from "../../components/pricing/BundleOffer/BundleOffer";
import PriceOptions from "../../components/pricing/PriceOptions/PriceOptions";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import Loader from "../../components/ui/feedback/Loader/Loader";
import TitleNotFound from "../../components/ui/feedback/TitleNotFound/TitleNotFound";

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
  // The labels come from FORMAT_LABELS, so they match the cart and orders
  const prices = getMoviePrices(movie.year);
  const priceOptions = [
    { id: "rent", label: FORMAT_LABELS.rent, price: prices.rent },
    { id: "buy", label: FORMAT_LABELS.buy, price: prices.buy },
  ];

  // --- What is added to the cart ---
  // A small poster is enough for the cart row.
  // storyId links the movie to the book behind it, for the bundle discount
  const storyId = createStoryId("movie", movie.id);
  const product = {
    id: movie.id,
    mediaType: "movie",
    title: movie.title,
    imageUrl: getImageUrl(movie.posterPath, "w185"),
    storyId,
  };

  // The book behind the movie, used by the book tab and the bundle
  const book = {
    title: movie.title,
    author: movie.author,
    mediaType: "movie",
    storyId,
  };

  return (
    <DetailLayout>
      <DetailHero details={movie} meta={meta} />

      {/* --- Watch, read, bundle and movie series --- */}
      <DetailTabs
        watchLabel="Watch the movie"
        watchPanel={<PriceOptions product={product} options={priceOptions} />}
        book={book}
        bundleLabel="Movie + book"
        bundlePanel={
          <BundleOffer
            description="Buy the movie and the book together."
            product={product}
            option={priceOptions.find((option) => option.id === "buy")}
            book={book}
          />
        }
        collection={movie.collection}
        movieId={movie.id}
      />

      <CastList cast={movie.cast} />
    </DetailLayout>
  );
};

export default MovieDetailPage;
