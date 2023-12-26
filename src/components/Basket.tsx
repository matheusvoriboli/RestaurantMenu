export default function Basket() {
   return (
      <div className="bg-background-default shadow h-fit min-w-80">
         <div className="p-5">
            <h1 className="text-secondary text-xl font-semibold">Carrinho</h1>
         </div>
         <div className="bg-white p-5">
            <p>Seu carrinho está vazio</p>
         </div>
      </div>
   );
}