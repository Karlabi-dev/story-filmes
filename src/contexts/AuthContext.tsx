import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

import {
  auth
} from '../config/firebaseConfig';


type AuthContextType = {

  usuario: User | null;

  carregando: boolean;

  cadastrar: (
    email: string,
    senha: string
  ) => Promise<void>;

  entrar: (
    email: string,
    senha: string
  ) => Promise<void>;

  sair: () => Promise<void>;

};


const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );


export function AuthProvider({
  children
}: {
  children: ReactNode
}) {

  const [usuario, setUsuario] =
    useState<User | null>(null);


  const [carregando, setCarregando] =
    useState(true);


  useEffect(() => {

    const pararDeObservar =
      onAuthStateChanged(
        auth,
        (usuarioFirebase) => {

          setUsuario(usuarioFirebase);

          setCarregando(false);

        }
      );


    return pararDeObservar;

  }, []);


  async function cadastrar(
    email: string,
    senha: string
  ) {

    await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

  }


  async function entrar(
    email: string,
    senha: string
  ) {

    await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

  }


  async function sair() {

    await signOut(auth);

  }


  return (

    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        entrar,
        sair
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  return useContext(AuthContext);

}