
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface ResultDisplayProps {
  ingredients: Ingredient[];
  multiplier: number;
  basePortions: number;
  desiredPortions: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  ingredients,
  multiplier,
  basePortions,
  desiredPortions
}) => {
  const formatQuantity = (quantity: number) => {
    // Se for um número inteiro, mostrar sem decimais
    if (quantity % 1 === 0) {
      return quantity.toString();
    }
    // Se for decimal, mostrar com até 2 casas decimais
    return quantity.toFixed(2).replace(/\.?0+$/, '');
  };

  return (
    <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Resultado do Cálculo</h2>
        <Badge variant="secondary" className="text-sm">
          {basePortions} → {desiredPortions} porções
        </Badge>
      </div>
      
      <div className="mb-4 p-3 bg-white/60 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Fator de multiplicação:</p>
        <p className="text-lg font-semibold text-green-700">
          {multiplier.toFixed(2)}x
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-gray-700 mb-3">Ingredientes ajustados:</h3>
        {ingredients
          .filter(ingredient => ingredient.name.trim() !== '' && ingredient.quantity > 0)
          .map((ingredient) => {
            const adjustedQuantity = ingredient.quantity * multiplier;
            return (
              <div
                key={ingredient.id}
                className="flex justify-between items-center p-3 bg-white/80 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-800">
                  {ingredient.name}
                </span>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-700">
                    {formatQuantity(adjustedQuantity)} {ingredient.unit}
                  </div>
                  <div className="text-xs text-gray-500">
                    original: {formatQuantity(ingredient.quantity)} {ingredient.unit}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {ingredients.filter(ingredient => ingredient.name.trim() !== '' && ingredient.quantity > 0).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Adicione ingredientes com nome e quantidade para ver os resultados</p>
        </div>
      )}
    </Card>
  );
};

export default ResultDisplay;
