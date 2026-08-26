const API_URL = "https://story-filmes-api.onrender.com";


export type ItemCarrinho = {

  id: number;

  filme_id: string;

  titulo: string;

  ano: string;

  genero: string;

  descricao: string;

  status: string;

};


export async function buscarCarrinho() {

  const resposta = await fetch(
    `${API_URL}/carrinho`
  );


  if (!resposta.ok) {

    throw new Error(
      "Erro ao buscar carrinho"
    );

  }


  return resposta.json();

}


export async function adicionarAoCarrinho(
  filme: {
    id: string;
    titulo: string;
    ano: string;
    genero: string;
    descricao: string;
  }
) {

  const resposta = await fetch(
    `${API_URL}/carrinho`,
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        filme_id: filme.id,

        titulo: filme.titulo,

        ano: filme.ano,

        genero: filme.genero,

        descricao: filme.descricao

      })

    }
  );


  if (!resposta.ok) {

    throw new Error(
      "Erro ao adicionar filme"
    );

  }


  return resposta.json();

}


export async function removerDoCarrinho(
  id: number
) {

  const resposta = await fetch(
    `${API_URL}/carrinho/${id}`,
    {
      method: "DELETE"
    }
  );


  if (!resposta.ok) {

    throw new Error(
      "Erro ao remover filme"
    );

  }

}


export async function alterarStatus(
  id: number,
  status: string
) {

  const resposta = await fetch(
    `${API_URL}/carrinho/${id}`,
    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        status
      })

    }
  );


  if (!resposta.ok) {

    throw new Error(
      "Erro ao alterar status"
    );

  }


  return resposta.json();

}