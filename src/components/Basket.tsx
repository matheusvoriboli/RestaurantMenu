import { useAppSelector } from "@/redux/store";

export default function Basket() {
  const checkoutResponse = useAppSelector((state) => state.checkout.value);

  return (
    <div className="bg-background-default shadow h-fit min-w-80">
      <div className="p-5">
        <h1 className="text-secondary text-xl font-semibold">Carrinho</h1>
      </div>
      <div className="bg-white p-5">
        {checkoutResponse.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <ul>
            {checkoutResponse.map((order) => (
              <li key={order?.id}>{order?.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
