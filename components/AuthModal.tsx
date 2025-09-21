'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { MiniKit } from '@coinbase/minikit';
import { Farcaster } from '@coinbase/minikit';

interface AuthModalProps {
  onAuthSuccess: (user: any) => void;
  onClose: () => void;
}

export function AuthModal({ onAuthSuccess, onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFarcasterAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would use MiniKit's Farcaster auth
      // For now, we'll simulate the authentication
      const mockUser = {
        userId: 'user_' + Date.now(),
        farcaster_id: 'fc_' + Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        wallet_address: '0x' + Math.random().toString(36).substr(2, 40),
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      onAuthSuccess(mockUser);
    } catch (err) {
      setError('Failed to authenticate with Farcaster');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would connect to Base wallet
      // For now, we'll simulate the wallet connection
      const mockUser = {
        userId: 'user_' + Date.now(),
        wallet_address: '0x' + Math.random().toString(36).substr(2, 40),
        name: 'Wallet User',
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      onAuthSuccess(mockUser);
    } catch (err) {
      setError('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-bg rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to Forkd</h2>
            <p className="text-text-secondary">
              Connect your wallet or Farcaster account to discover culinary experiences
            </p>
          </div>

          <div className="space-y-4">
            {/* Farcaster Auth */}
            <Button
              onClick={handleFarcasterAuth}
              className="w-full flex items-center justify-center space-x-3"
              disabled={loading}
            >
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span>{loading ? 'Connecting...' : 'Continue with Farcaster'}</span>
            </Button>

            {/* Wallet Auth */}
            <Button
              variant="outline"
              onClick={handleWalletAuth}
              className="w-full flex items-center justify-center space-x-3"
              disabled={loading}
            >
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔗</span>
              </div>
              <span>{loading ? 'Connecting...' : 'Connect Base Wallet'}</span>
            </Button>
          </div>

          {error && (
            <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-sm text-center">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Skip for now
            </button>
          </div>

          <div className="mt-4 text-xs text-text-secondary text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}

