import useTabParam from "../../../hooks/useTabParam";
import BookSection from "../../books/BookSection/BookSection";
import MovieSeries from "../MovieSeries/MovieSeries";
import Tabs from "../../ui/navigation/Tabs/Tabs";

// ===== Detail tabs =====
// The tabs on a movie or series page: watch, read the book, the bundle and,
// for movies in a movie series, the other movies. Shared by both detail pages.
// The selected tab is kept in the URL, e.g. ?tab=read, so it stays after a reload.
// watchLabel: e.g. "Watch the movie"
// watchPanel: the price options, or null when there is nothing to buy
// book: { title, author, mediaType, storyId } for the book section
// bundleLabel: e.g. "Movie + book"
// bundlePanel: the bundle offer, or null when there is no bundle
// collection, movieId: only for movies in a movie series

const DetailTabs = ({
  watchLabel,
  watchPanel,
  book,
  bundleLabel,
  bundlePanel,
  collection,
  movieId,
}) => {
  const [selectedTab, selectTab] = useTabParam("watch");

  // Watch, the bundle and the movie series are only added when there is
  // something to show
  const tabs = [
    ...(watchPanel
      ? [{ id: "watch", label: watchLabel, panel: watchPanel }]
      : []),
    {
      id: "read",
      label: "Read the book",
      panel: <BookSection {...book} />,
    },
    ...(bundlePanel
      ? [{ id: "bundle", label: bundleLabel, panel: bundlePanel }]
      : []),
    ...(collection
      ? [
          {
            id: "series",
            label: `More from ${collection.name}`,
            panel: <MovieSeries collection={collection} movieId={movieId} />,
          },
        ]
      : []),
  ];

  return (
    <Tabs
      label="Watch, read or see more"
      selectedId={selectedTab}
      onSelect={selectTab}
      tabs={tabs}
    />
  );
};

export default DetailTabs;
