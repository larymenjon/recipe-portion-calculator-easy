
import IngredientCalculator from "@/components/IngredientCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Calculadora de Ingredientes
          </h1>
          <p className="text-lg text-gray-600">
            Calcule as proporções perfeitas para suas receitas
          </p>
        </div>
        <IngredientCalculator />
      </div>
    </div>
  );
};

export default Index;
