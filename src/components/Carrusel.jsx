import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "./carusel.module.css"

const Carrusel = () => {

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const getSlides = async () => {

      const querySnapshot = await getDocs(
        collection(db, "carrusel")
      );

      const slidesFirebase = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSlides(slidesFirebase);
    };

    getSlides();

  }, []);

  const nextSlide = () => {
  setCurrent(
    current === slides.length - 1
      ? 0
      : current + 1
    );
  };

  const prevSlide = () => {
    setCurrent(
      current === 0
        ? slides.length - 1
        : current - 1
    );
  };

  const prev =
  slides.length > 0
    ? (current === 0
        ? slides.length - 1
        : current - 1)
    : 0;

  const next =
  slides.length > 0
    ? (current === slides.length - 1
        ? 0
        : current + 1)
    : 0;

  useEffect(() => {

    if (slides.length === 0) return;

    const interval = setInterval(() => {

      setCurrent(prev =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [slides, current]);

  return (
    <>
      <div className={styles.carouselWrapper}>

  <button
    className={styles.leftArrow}
    onClick={prevSlide}
  >
    ❮
  </button>

   <div className={styles.carousel}>
        {slides.map((slide, index) => {

          let className = styles.hidden;

          if (index === current)
            className = styles.active;

          else if (index === prev)
            className = styles.prev;

          else if (index === next)
            className = styles.next;

          return (
            <img
              key={slide.id}
              src={slide.imagen}
              className={className}
            />
          );
        })}
      </div>

  <button
    className={styles.rightArrow}
    onClick={nextSlide}
  >
    ❯
  </button>

</div>
    </>
  );
};

export default Carrusel;