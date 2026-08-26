import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';


export type FilmeFirestore = {
  id?: string;
  filmeId: string;
  titulo: string;
  ano: string;
  genero: string;
  descricao: string;
  status: string;
};

export async function adicionarFilme(
  filme: {
    id: string;
    titulo: string;
    ano: string;
    genero: string;
    descricao: string;
  }
) {

  const existe = await filmeJaExiste(
    filme.id
  );


  if (existe) {

    throw new Error(
      'FILME_JA_EXISTE'
    );

  }

  const referencia = collection(
    db,
    'minhaLista'
  );


  const documento = await addDoc(
    referencia,
    {
      filmeId: filme.id,
      titulo: filme.titulo,
      ano: filme.ano,
      genero: filme.genero,
      descricao: filme.descricao,
      status: 'Vou assistir'
    }
  );


  return documento.id;
}

export function observarFilmes(
  callback: (filmes: FilmeFirestore[]) => void
) {

  const referencia = collection(
    db,
    'minhaLista'
  );

  const pararDeObservar = onSnapshot(
    referencia,

    (snapshot) => {

      const filmes: FilmeFirestore[] =
        snapshot.docs.map((documento) => ({

          id: documento.id,

          ...(documento.data() as Omit<
            FilmeFirestore,
            'id'
          >)

        }));

      callback(filmes);
    }
  );

  return pararDeObservar;
}

export async function alterarStatusFilme(
  id: string,
  novoStatus: string
) {

  const referencia = doc(
    db,
    'minhaLista',
    id
  );

  await updateDoc(
    referencia,
    {
      status: novoStatus
    }
  );
}

export async function removerFilme(
  id: string
) {

  const referencia = doc(
    db,
    'minhaLista',
    id
  );

  await deleteDoc(
    referencia
  );
}

export async function filmeJaExiste(
  filmeId: string
) {

  const referencia = collection(
    db,
    'minhaLista'
  );


  const consulta = query(
    referencia,
    where('filmeId', '==', filmeId)
  );


  const resultado = await getDocs(
    consulta
  );


  return !resultado.empty;
}