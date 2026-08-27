import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";

export type FilmeFirestore = {
  id?: string;
  filmeId: string;
  titulo: string;
  ano: string;
  genero: string;
  descricao: string;
  status: string;
  uid: string;
  email: string;
};

function pegarUsuario() {
  const usuario = auth.currentUser;
  if (!usuario) {
    throw new Error("USUARIO_NAO_AUTENTICADO");
  }
  return usuario;
}

export async function adicionarFilme(filme: {
  id: string;
  titulo: string;
  ano: string;
  genero: string;
  descricao: string;
}) {
  const usuario = pegarUsuario();
  const existe = await filmeJaExiste(filme.id);

  if (existe) {
    throw new Error("FILME_JA_EXISTE");
  }

  const referencia = collection(db, "minhaLista");
  const documento = await addDoc(referencia, {
    filmeId: filme.id,
    titulo: filme.titulo,
    ano: filme.ano,
    genero: filme.genero,
    descricao: filme.descricao,
    status: "Vou assistir",
    uid: usuario.uid,
    email: usuario.email,
  });

  return documento.id;
}

export async function filmeJaExiste(filmeId: string) {
  const usuario = pegarUsuario();
  const referencia = collection(db, "minhaLista");
  const consulta = query(
    referencia,
    where("filmeId", "==", filmeId),
    where("uid", "==", usuario.uid),
  );

  const resultado = await getDocs(consulta);
  return !resultado.empty;
}

export function observarFilmes(callback: (filmes: FilmeFirestore[]) => void) {
  const usuario = pegarUsuario();
  const referencia = collection(db, "minhaLista");
  const consulta = query(
    referencia,
    where("uid", "==", usuario.uid),
  );
  const pararDeObservar = onSnapshot(
    consulta,

    (snapshot) => {
      const filmes = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...(documento.data() as Omit<FilmeFirestore, "id">),
      }));
      callback(filmes);
    },
  );
  return pararDeObservar;
}

export async function alterarStatusFilme(id: string, novoStatus: string) {
  pegarUsuario();
  const referencia = doc(db, "minhaLista", id);
  await updateDoc(referencia, {
    status: novoStatus,
  });
}

export async function removerFilme(id: string) {
  pegarUsuario();
  const referencia = doc(db, "minhaLista", id);
  await deleteDoc(referencia);
}
