import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {

    const timer = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );

    // Nettoyer le timer
    return () => clearTimeout(timer);
  }, [index, byDateDesc?.length]);

  return (
    <div className="SlideCardList">
      {/* Les slides */}
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* La pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;