'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { CreditCard, Wallet } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PaymentFormProps {
  amount: number;
  bookingId: string;
  onPaymentComplete: (payment: any) => void;
  onCancel: () => void;
}

export function PaymentForm({ amount, bookingId, onPaymentComplete, onCancel }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('wallet');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          amount,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      onPaymentComplete(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>

        <div className="space-y-3">
          {/* Wallet Payment Option */}
          <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-surface/50 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={(e) => setPaymentMethod(e.target.value as 'wallet')}
              className="text-accent focus:ring-accent"
            />
            <Wallet className="w-5 h-5 text-accent" />
            <div className="flex-1">
              <div className="font-medium text-text-primary">Base Wallet</div>
              <div className="text-sm text-text-secondary">Pay with your connected Base wallet</div>
            </div>
          </label>

          {/* Credit Card Option (Future) */}
          <label className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer opacity-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card')}
              disabled
              className="text-accent focus:ring-accent"
            />
            <CreditCard className="w-5 h-5 text-text-secondary" />
            <div className="flex-1">
              <div className="font-medium text-text-secondary">Credit Card</div>
              <div className="text-sm text-text-secondary">Coming soon</div>
            </div>
          </label>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="card">
        <h4 className="font-semibold text-text-primary mb-3">Payment Summary</h4>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Total Amount</span>
          <span className="text-xl font-bold text-primary">{formatPrice(amount)}</span>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          className="flex-1"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${formatPrice(amount)}`}
        </Button>
      </div>

      <p className="text-xs text-text-secondary text-center">
        By completing this payment, you agree to our terms of service and cancellation policy.
      </p>
    </div>
  );
}

