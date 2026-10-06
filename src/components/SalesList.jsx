import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

export default function SalesList({ searchTerm = '' }) {
  const { sales, deleteSale, loading } = useApp();
  const [showForm, setShowForm] = useState(false);

  const filteredSales = sales.filter(s => 
    s.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Cargando ventas...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ventas ({filteredSales.length})</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Venta
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Registrar Venta</h3>
          <p className="text-muted-foreground">Formulario de venta en construcción...</p>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredSales.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No hay ventas registradas.</p>
          </Card>
        ) : (
          filteredSales.map(sale => (
            <Card key={sale.id} className="p-4 flex justify-between items-start hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{sale.product_name}</h3>
                <p className="text-sm text-muted-foreground">Cantidad: {sale.quantity}</p>
                <p className="text-sm text-muted-foreground">Precio unitario: ${sale.unit_price}</p>
                <p className="text-sm font-semibold text-green-600">Total: ${sale.total}</p>
                {sale.user_name && <p className="text-xs text-muted-foreground mt-2">Por: {sale.user_name}</p>}
                {sale.sold_at && <p className="text-xs text-muted-foreground">{new Date(sale.sold_at).toLocaleString()}</p>}
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteSale(sale.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
