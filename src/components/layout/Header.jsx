import { useEffect, useState } from "react";
import { Link } from "react-router-dom" 

import Nav from "./Nav"

import styles from "./header.module.css";

import CarritoIcon from "../../assets/icons/CarritoIcon";
import LogOutIcon from "../../assets/icons/LogOutIcon";

import BarraDeBusqueda from "../search/BarraDeBusqueda";

import Login from "../pages/Login";

import Registro from "../pages/Registro";

import Config from "../../assets/icons/Config"

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {

  const { obtenerCantidadTotal } = useCart();
  const { user, logout } = useAuth();
  const totalItems = obtenerCantidadTotal();
  
  const capitalizarNombre = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const obtenerNombreMostrado = () => {
    if (user?.nombre) {
      // 1. Cortamos el string en el primer espacio en blanco para quedarnos solo con el primer nombre
      const primerNombre = user.nombre.split(" ")[0];
      return capitalizarNombre(primerNombre);
    }

    if (user?.email) {
      // Si no hay nombre y usamos el email, también cortamos por si el email tiene puntos o guiones (ej: jose.navarro)
      const usuarioEmail = user.email.split("@")[0].split(".")[0].split("-")[0];
      return capitalizarNombre(usuarioEmail);
    }

    return "Usuario";
  };


  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 26);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   
  console.log(user?.rol);

  return (

   <header
  className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
>
  <div className={styles.desktopHeader}>
    <h1 className={styles.title}>NovaMarket</h1>

    <Nav scrolled={scrolled} />

    <div className={styles.spacer}></div>

    <BarraDeBusqueda />

    <ul className={styles.authList}>
      {user ? (
        <>
          <li>
            <span className={styles.saludoRegular}>
              Hola, {obtenerNombreMostrado()}
            </span>
          </li>

          <li>
            <button
              onClick={logout}
              className={
                scrolled
                  ? styles.logOutScrolled
                  : styles.btnLogout
              }
              title="cerrar sesión"
            >
              <LogOutIcon />
            </button>
          </li>

          {user?.rol === "admin" && (
            <li>
              <Link
                to="/dashboard"
                className={styles.btnPanelAdmin}
                title="panel de administración"
              >
                <Config />
    
              </Link>
            </li>
          )}

        </>
      ) : (
        <li>
          <Link
            to="/login"
            className={
              scrolled
                ? styles.loginScrolled
                : styles.loginLink
            }
          >
            Ingresar
          </Link>
        </li>
      )}
    </ul>

    <Link
      to="/carrito"
      className={scrolled ? styles.iconScrolled : styles.link}
      title="carrito"
    >
      <CarritoIcon />
      <div className={styles.carritoIconWrapper}>
        {totalItems > 0 && (
          <span className={styles.badge}>
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  </div>

  {/* MÓVIL */}
  <div className={styles.mobileHeader}>
    <div className={styles.topBar}>
      <h1 className={styles.title}>NovaMarket</h1>

      <Link
        to="/carrito"
        className={scrolled ? styles.iconScrolled : styles.link}
      >
        <CarritoIcon />
      </Link>
    </div>

    <BarraDeBusqueda />

    <div className={styles.bottomBar}>
      <Nav scrolled={scrolled} />

      <ul className={styles.authList}>
        {user ? (
          <>
            <li>
              <span className={styles.saludoRegular}>
                Hola, {obtenerNombreMostrado()}
              </span>
            </li>

             {user?.rol === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className={styles.btnPanelAdmin}
                    title="Panel de administración"
                  >
                    <Config />
                  </Link>
                </li>
            )}

            <li>
              <button
                onClick={logout}
                className={
                  scrolled
                    ? styles.logOutScrolled
                    : styles.btnLogout
                }
              >
                <LogOutIcon />
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className={
                scrolled
                  ? styles.loginScrolled
                  : styles.loginLink
              }
            >
              Ingresar
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>
</header>

);
};

export default Header;