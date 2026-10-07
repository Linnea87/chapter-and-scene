import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCarousel from "../../../hooks/useCarousel";
import useHomeTitles from "../../../hooks/useHomeTitles";
import { useGetTitleDetailsQuery } from "../../../services/tmdb/tmdbApi";
import getImageUrl from "../../../services/tmdb/getImageUrl";
import { HERO } from "../../../features/home/homeConfig";
import IconButton from "../../buttons/IconButton/IconButton";
import styles from "./HeroCarousel.module.css";

// ===== Hero carousel =====
// The highest rated book adaptations, one at a time. The whole image links
// to the title, and the edges of the previous and next slides show on each side.
// No autoplay, so the user decides when the slide changes.

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

  const { current, previousIndex, nextIndex, goTo, next, previous } =
    useCarousel(slides.length);
  const slide = slides[current];

  // --- Details for the current slide ---
  // Age rating and genres are only in the details, so one slide is fetched at a time
  const { currentData: details } = useGetTitleDetailsQuery(
    { mediaType: slide?.mediaType, id: slide?.id },
    { skip: !slide },
  );

  if (isLoading || !slide) return null;

  const genres = details?.genres?.slice(0, 2).join(", ");

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <div className={styles.stage}>
        {/* --- Previous: edge of the previous slide with an arrow on top --- */}
        <div className={styles.side}>
          <img
            src={getImageUrl(slides[previousIndex].backdropPath, "w780")}
            alt=""
            className={`${styles.peek} ${styles.peekPrevious}`}
          />
          <IconButton
            icon={ChevronLeft}
            label="Previous story"
            className={styles.arrow}
            iconSize={36}
            onClick={previous}
          />
        </div>

        {/* --- Current slide, the key restarts the fade-in on every change --- */}
        <Link
          key={`${slide.mediaType}-${slide.id}`}
          to={`/${slide.mediaType}/${slide.id}`}
          className={styles.slide}
        >
          <img
            src={getImageUrl(slide.backdropPath, "w1280")}
            alt=""
            className={styles.image}
          />

          <div className={styles.content}>
            <h2 className={styles.title}>{slide.title}</h2>

            <p className={styles.meta}>
              {details?.certification && (
                <span className={styles.badge}>{details.certification}</span>
              )}
              <span>
                {MEDIA_LABELS[slide.mediaType]} · {slide.year}
                {genres && ` · ${genres}`}
              </span>
            </p>
          </div>
        </Link>

        {/* --- Next: edge of the next slide with an arrow on top --- */}
        <div className={styles.side}>
          <img
            src={getImageUrl(slides[nextIndex].backdropPath, "w780")}
            alt=""
            className={`${styles.peek} ${styles.peekNext}`}
          />
          <IconButton
            icon={ChevronRight}
            label="Next story"
            className={styles.arrow}
            iconSize={36}
            onClick={next}
          />
        </div>
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
