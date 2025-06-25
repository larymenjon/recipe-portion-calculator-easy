
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calculator, RefreshCw } from 'lucide-react';
import IngredientInput from './IngredientInput';
import ResultDisplay from './ResultDisplay';
import FloatingChat from './FloatingChat';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

const IngredientCalculator = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Farinha', quantity: 500, unit: 'g' }
  ]);
  const [basePortions, setBasePortions] = useState<number>(4);
  const [desiredPortions, setDesiredPortions] = useState<number>(6);
  const [showResults, setShowResults] = useState<boolean>(false);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: 'g'
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ingredient => 
      ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    ));
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  const calculateIngredients = () => {
    setShowResults(true);
  };

  const handleRecipeExtracted = (extractedIngredients: Ingredient[], portions: number) => {
    setIngredients(extractedIngredients);
    setBasePortions(portions);
    setShowResults(false);
    
    // Scroll para a calculadora
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetCalculator = () => {
    setIngredients([{ id: '1', name: 'Farinha', quantity: 500, unit: 'g' }]);
    setBasePortions(4);
    setDesiredPortions(6);
    setShowResults(false);
  };

  const multiplier = desiredPortions / basePortions;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Configurar Porções</h2>
            <Button
              onClick={resetCalculator}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="basePortions" className="text-sm font-medium text-gray-700 mb-2 block">
                Porções da receita original
              </Label>
              <Input
                id="basePortions"
                type="number"
                value={basePortions}
                onChange={(e) => setBasePortions(Number(e.target.value))}
                className="text-lg font-semibold"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="desiredPortions" className="text-sm font-medium text-gray-700 mb-2 block">
                Porções desejadas
              </Label>
              <Input
                id="desiredPortions"
                type="number"
                value={desiredPortions}
                onChange={(e) => setDesiredPortions(Number(e.target.value))}
                className="text-lg font-semibold"
                min="1"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Ingredientes</h2>
            <Button
              onClick={addIngredient}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
          
          <div className="space-y-3">
            {ingredients.map((ingredient) => (
              <IngredientInput
                key={ingredient.id}
                ingredient={ingredient}
                onUpdate={updateIngredient}
                onRemove={removeIngredient}
                showRemove={ingredients.length > 1}
              />
            ))}
          </div>

          <Button
            onClick={calculateIngredients}
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-semibold py-3"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calcular Ingredientes
          </Button>
        </Card>

        {showResults && (
          <ResultDisplay
            ingredients={ingredients}
            multiplier={multiplier}
            basePortions={basePortions}
            desiredPortions={desiredPortions}
          />
        )}
      </div>

      <FloatingChat onRecipeExtracted={handleRecipeExtracted} />
    </>
  );
};

export default IngredientCalculator;
