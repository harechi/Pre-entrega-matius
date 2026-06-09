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

    <div className={styles.carousel}>

      <button
        className={styles.leftArrow}
        onClick={prevSlide}
        >
         ❮
      </button>

      {slides.length > 0 && (

       <div className={styles.carousel}>

  <div
    className={styles.track}
    style={{
      transform: `translateX(-${current * 100}%)`
    }}
  >

    {slides.map(slide => (
      <img
        key={slide.id}
        src={slide.imagen}
        alt={slide.titulo}
      />
    ))}

  </div>
          
           <button className={styles.rightArrow}
              onClick={() =>
                setCurrent(
                  current === slides.length - 1
                    ? 0
                    : current + 1
                )
              } 
            >
             ❯
           </button>
        </div>
        )
      }

    </div>

  );
};

export default Carrusel;