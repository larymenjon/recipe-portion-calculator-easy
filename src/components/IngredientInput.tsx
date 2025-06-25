
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface IngredientInputProps {
  ingredient: Ingredient;
  onUpdate: (id: string, field: keyof Ingredient, value: string | number) => void;
  onRemove: (id: string) => void;
  showRemove: boolean;
}

const units = [
  { value: 'g', label: 'gramas (g)' },
  { value: 'kg', label: 'quilos (kg)' },
  { value: 'ml', label: 'mililitros (ml)' },
  { value: 'l', label: 'litros (l)' },
  { value: 'xícara', label: 'xícara(s)' },
  { value: 'colher sopa', label: 'colher(es) de sopa' },
  { value: 'colher chá', label: 'colher(es) de chá' },
  { value: 'unidade', label: 'unidade(s)' },
  { value: 'dente', label: 'dente(s)' },
  { value: 'pitada', label: 'pitada(s)' }
];

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  onUpdate,
  onRemove,
  showRemove
}) => {
  return (
    <div className="flex gap-2 items-center p-3 bg-gray-50 rounded-lg">
      <Input
        placeholder="Nome do ingrediente"
        value={ingredient.name}
        onChange={(e) => onUpdate(ingredient.id, 'name', e.target.value)}
        className="flex-1"
      />
      
      <Input
        type="number"
        placeholder="Qtd"
        value={ingredient.quantity || ''}
        onChange={(e) => onUpdate(ingredient.id, 'quantity', Number(e.target.value))}
        className="w-24"
        min="0"
        step="0.1"
      />

      <Select
        value={ingredient.unit}
        onValueChange={(value) => onUpdate(ingredient.id, 'unit', value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit.value} value={unit.value}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showRemove && (
        <Button
          onClick={() => onRemove(ingredient.id)}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Minus className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default IngredientInput;
