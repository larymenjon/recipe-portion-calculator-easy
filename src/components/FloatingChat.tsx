
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Loader2, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingChatProps {
  onRecipeExtracted: (ingredients: any[], portions: number) => void;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ onRecipeExtracted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{
    type: 'user' | 'bot';
    content: string;
  }>>([
    {
      type: 'bot',
      content: 'Olá! Cole aqui o link de uma receita e eu vou extrair os ingredientes para você calcular as porções automaticamente. 🍳'
    }
  ]);

  const extractRecipe = async (recipeUrl: string) => {
    setIsLoading(true);
    
    try {
      // Simula extração de receita - em produção você usaria uma API real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dados simulados de uma receita típica
      const extractedIngredients = [
        { id: '1', name: 'Farinha de trigo', quantity: 500, unit: 'g' },
        { id: '2', name: 'Ovos', quantity: 3, unit: 'unidade' },
        { id: '3', name: 'Leite', quantity: 250, unit: 'ml' },
        { id: '4', name: 'Açúcar', quantity: 200, unit: 'g' },
        { id: '5', name: 'Fermento em pó', quantity: 1, unit: 'colher sopa' }
      ];
      
      const portions = 8;
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `✅ Receita extraída com sucesso! Encontrei ${extractedIngredients.length} ingredientes para ${portions} porções. Os ingredientes foram carregados na calculadora.`
      }]);
      
      onRecipeExtracted(extractedIngredients, portions);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: '❌ Ops! Não consegui extrair a receita deste site. Tente com outro link ou adicione os ingredientes manualmente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    const userMessage = url;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setUrl('');

    if (userMessage.includes('http')) {
      await extractRecipe(userMessage);
    } else {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Por favor, cole um link válido de uma receita (deve começar com http:// ou https://)'
      }]);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-orange-500 hover:bg-orange-600 shadow-lg"
          size="lg"
        >
          <Calculator className="w-6 h-6 text-white" strokeWidth={1.5} fill="none" />
        </Button>
      </motion.div>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-50 to-orange-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-gray-800">Extrair Receita</h3>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Extraindo receita...
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Cole o link da receita aqui..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!url.trim() || isLoading}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
