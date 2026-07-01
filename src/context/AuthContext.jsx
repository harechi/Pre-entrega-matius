import { createContext, useState, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debería estar dentro de AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    const userDocRef = doc(db, "cliente", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const datosUsuario = userDocSnap.data();

                        if (datosUsuario.rol === "admin") {
                            setUser({ ...currentUser, nombre: datosUsuario.nombre, rol: "admin" });
                        } else {
                            setUser({ ...currentUser, nombre: datosUsuario.nombre, rol: "user" });
                        }
                    } else {
                        setUser({ ...currentUser, nombre: null, rol: "user" });
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("error al obtener el rol del usuario: ", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const value = { user, loading, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
