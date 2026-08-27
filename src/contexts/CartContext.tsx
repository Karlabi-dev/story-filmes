import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type Filme = {
  id: string;
  titulo: string;
  ano: string;
  genero: string;
  descricao: string;
};

type CartContextData = {
  itens: Filme[];
  adicionarItem: (filme: Filme) => void;
  removerItem: (id: string) => void;
  estaNoCarrinho: (id: string) => boolean;
};

const CartContext = createContext<CartContextData | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Filme[]>([]);

  function adicionarItem(filme: Filme) {
    setItens((listaAtual) =>
      listaAtual.some((item) => item.id === filme.id)
        ? listaAtual
        : [...listaAtual, filme],
    );
  }
  function removerItem(id: string) {
    setItens((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  function estaNoCarrinho(id: string) {
    return itens.some((item) => item.id === id);
  }
  const value = useMemo(
    () => ({ itens, adicionarItem, removerItem, estaNoCarrinho }),
    [itens],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
