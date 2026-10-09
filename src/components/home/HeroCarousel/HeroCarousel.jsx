import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCarousel from "../../../hooks/useCarousel";
import useHomeTitles from "../../../hooks/useHomeTitles";
import { useGetTitleDetailsQuery } from "../../../services/tmdb/tmdbApi";
import getImageUrl from "../../../services/tmdb/getImageUrl";
import { HERO } from "../../../features/home/homeConfig";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import styles from "./HeroCarousel.module.css";

// ===== Hero carousel =====
// The highest rated book adaptations on a track that slides sideways.
// The current slide links to the title, and the slides next to it peek in
// on each side. No autoplay, so the user decides when the slide changes.

// Labels shown for each media type
const MEDIA_LABELS = {
  movie: "Movie",
  tv: "Series",
};

const HeroCarousel = () => {
  const { titles, isLoading } = useHomeTitles({ sort: HERO.sort });

  // --- Slides ---
  // Only titles with a backdrop image can be shown in the hero
  const slides = titles
    .filter((title) => title.backdropPath)
    .slice(0, HERO.limit);

  const { current, goTo, next, previous } = useCarousel(slides.length);
  const slide = slides[current];

  // --- Details for the current slide ---
  // Age rating and genres are only in the details, so one slide is fetched at a time
  const { currentData: details } = useGetTitleDetailsQuery(
    { mediaType: slide?.mediaType, id: slide?.id },
    { skip: !slide },
  );

  if (isLoading || !slide) return null;

  const genres = details?.genres?.slice(0, 2).join(", ");

  // --- Track ---
  // A copy of the last slide goes first and a copy of the first goes last,
  // so a slide always peeks in on both sides. The copies shift every index by one.
  const track = [slides.at(-1), ...slides, slides[0]];
  const position = current + 1;

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <div className={styles.viewport}>
        {/* --position moves the track, see the CSS */}
        <div className={styles.track} style={{ "--position": position }}>
          {track.map((item, index) => {
            const isCurrent = index === position;

            return (
              <Link
                // The copies share ids with real slides, so the index is part of the key
                key={`${index}-${item.mediaType}-${item.id}`}
                to={`/${item.mediaType}/${item.id}`}
                className={
                  isCurrent ? `${styles.slide} ${styles.current}` : styles.slide
                }
                // Only the current slide can be clicked, tabbed to or read out
                inert={!isCurrent}
              >
                <img
                  src={getImageUrl(item.backdropPath, "w1280")}
                  alt=""
                  className={styles.image}
                />

                <div className={styles.content}>
                  <h2 className={styles.title}>{item.title}</h2>

                  {isCurrent && (
                    <p className={styles.meta}>
                      {details?.certification && (
                        <span className={styles.badge}>
                          {details.certification}
                        </span>
                      )}
                      <span>
                        {MEDIA_LABELS[item.mediaType]} · {item.year}
                        {genres && ` · ${genres}`}
                      </span>
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- Arrows over the peeking slides --- */}
        <IconButton
          icon={ChevronLeft}
          label="Previous story"
          className={`${styles.arrow} ${styles.arrowPrevious}`}
          iconSize={48}
          onClick={previous}
        />
        <IconButton
          icon={ChevronRight}
          label="Next story"
          className={`${styles.arrow} ${styles.arrowNext}`}
          iconSize={48}
          onClick={next}
        />
      </div>

      {/* --- Dots, one per slide --- */}
      <div className={styles.dots}>
        {slides.map((item, index) => (
          <button
            key={`${item.mediaType}-${item.id}`}
            type="button"
            className={styles.dot}
            aria-label={`Show ${item.title}`}
            aria-current={index === current}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
