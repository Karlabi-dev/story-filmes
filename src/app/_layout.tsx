import { Stack } from 'expo-router';

import { CartProvider } from '../contexts/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Filmes' }} />
        <Stack.Screen name="detalhes" options={{ title: 'Detalhes' }} />
        <Stack.Screen name="carrinho" options={{ title: 'Carrinho' }} />
      </Stack>
    </CartProvider>
  );
}
