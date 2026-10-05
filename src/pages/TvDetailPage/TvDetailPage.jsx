import { useParams } from "react-router";
import { useGetTitleDetailsQuery } from "../../services/tmdb/tmdbApi";
import { SERIES_DISCOUNT } from "../../features/pricing/pricingConfig";
import {
  getSeasonPrice,
  getSeriesPrice,
} from "../../features/pricing/pricingHelpers";
import pluralize from "../../utils/pluralize";
import CastList from "../../components/details/CastList/CastList";
import DetailHero from "../../components/details/DetailHero/DetailHero";
import DetailLayout from "../../components/details/DetailLayout/DetailLayout";
import PriceOptions from "../../components/details/PriceOptions/PriceOptions";
import Loader from "../../components/common/Loader/Loader";
import LoadError from "../../components/common/LoadError/LoadError";

// ===== TV detail page =====
// Shows one series with facts, seasons, prices and cast. The id comes from the URL (/tv/:id).

const TvDetailPage = () => {
  const { id } = useParams();

  // currentData is empty while a new id loads, so the previous series is never shown
  const {
    currentData: series,
    isFetching,
    error,
    refetch,
  } = useGetTitleDetailsQuery({ mediaType: "tv", id });

  // --- Loading and error ---
  if (isFetching) {
    return (
      <DetailLayout>
        <Loader label="Loading series" />
      </DetailLayout>
    );
  }

  if (error || !series) {
    return (
      <DetailLayout>
        <LoadError title="We couldn't load this series" onRetry={refetch} />
      </DetailLayout>
    );
  }

  const { seasons } = series;

  // --- Facts shown under the title ---
  const meta = [
    series.year,
    seasons.length > 0 ? pluralize(seasons.length, "season") : null,
    series.rating ? `Rating ${series.rating.toFixed(1)}` : null,
  ].filter(Boolean);

  // --- Prices ---
  // One option per season, e.g. "Season 1" with "2011 · 12 episodes" under it
  const seasonOptions = seasons.map((season) => {
    const label = `Season ${season.number}`;

    // Some series name their seasons, e.g. "Murder House", so the name is kept as a detail
    const customName = season.name !== label ? season.name : null;

    return {
      id: `season-${season.number}`,
      label,
      detail: [
        customName,
        season.year,
        pluralize(season.episodeCount, "episode"),
      ]
        .filter(Boolean)
        .join(" · "),
      price: getSeasonPrice(season.year),
    };
  });

  // A package only makes sense when there is more than one season
  const seriesOption = {
    id: "series",
    label: "Whole series",
    detail: `All ${seasons.length} seasons, save ${SERIES_DISCOUNT * 100}%`,
    price: getSeriesPrice(seasons),
  };

  const priceOptions =
    seasons.length > 1 ? [...seasonOptions, seriesOption] : seasonOptions;

  return (
    <DetailLayout>
      <DetailHero details={series} meta={meta} />

      {priceOptions.length > 0 && (
        <PriceOptions title="Watch the series" options={priceOptions} />
      )}

      <CastList cast={series.cast} />
    </DetailLayout>
  );
};

export default TvDetailPage;
