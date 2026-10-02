import TitleCard from "../TitleCard/TitleCard";
import styles from "./TitleGrid.module.css";

const TitleGrid = ({ titles }) => {
  return (
    <ul className={styles.grid}>
      {titles.map((item) => (
        // A movie and a series can share the same TMDb id, so the type is part of the key
        <li key={`${item.mediaType}-${item.id}`}>
          <TitleCard item={item} />
        </li>
      ))}
    </ul>
  );
};

export default TitleGrid;
