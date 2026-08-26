const API_URL = "http://localhost:3000";


export type ItemCarrinho = {

  id: number;

  filme_id: string;

  titulo: string;

  ano: string;

  genero: string;

  descricao: string;

  quantidade: number;

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


export async function alterarQuantidade(
  id: number,
  quantidade: number
) {

  const resposta = await fetch(
    `${API_URL}/carrinho/${id}`,
    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        quantidade
      })

    }
  );


  if (!resposta.ok) {

    throw new Error(
      "Erro ao alterar quantidade"
    );

  }


  return resposta.json();

}