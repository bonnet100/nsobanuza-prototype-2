import { useMemo, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { mockProviders } from '../data/mockData';
import { Provider, Transaction } from '../types';

const formatAmount = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount).replace('$', 'RWF ');

export function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const providerId = searchParams.get('provider') || '';
  const type = (searchParams.get('type') || 'chat') as 'chat' | 'video';

  const provider = useMemo<Provider | undefined>(() => {
    return mockProviders.find((item) => item.id === providerId);
  }, [providerId]);

  const amount = provider ? (type === 'chat' ? provider.chatPrice : provider.videoPrice) : 0;
  const commission = Math.round(amount * 0.1);
  const professionalReceives = amount - commission;

  const handleConfirm = () => {
    if (!provider) return;
    const transaction: Transaction = {
      id: `${Date.now()}`,
      userId: 'anonymous_user',
      providerId: provider.id,
      type,
      amount,
      commission,
      timestamp: new Date(),
    };
    const existing = localStorage.getItem('nsobanuzaTransactions');
    const transactions: Transaction[] = existing ? JSON.parse(existing) : [];
    localStorage.setItem('nsobanuzaTransactions', JSON.stringify([...transactions, transaction]));
    setConfirmed(true);
  };

  if (!provider) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">Provider not found. Please return to the marketplace.</p>
              <Link to="/marketplace">
                <Button className="mt-4">Back to Marketplace</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 w-14 h-14 text-green-600" />
              <h1 className="text-2xl font-bold mb-3">Consultation Confirmed</h1>
              <p className="text-gray-700 mb-4">
                Your {type} consultation with {provider.name} is confirmed. A confirmation message has been created for your records.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Total paid</p>
                  <p className="font-semibold text-purple-600">{formatAmount(amount)}</p>
                </div>
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Platform commission</p>
                  <p className="font-semibold text-gray-700">{formatAmount(commission)}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 col-span-2">
                  <p className="text-sm text-gray-500">Professional receives</p>
                  <p className="font-semibold text-gray-700">{formatAmount(professionalReceives)}</p>
                </div>
              </div>
              <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Confirm consultation</p>
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <p className="text-gray-600">{provider.specialty}</p>
              </div>
              <Link to={`/provider/${provider.id}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Provider profile
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="bg-purple-50 rounded-3xl p-5">
                <p className="text-sm text-gray-500">Consultation type</p>
                <p className="text-lg font-semibold text-purple-700">{type === 'chat' ? 'Chat Consultation' : 'Video Consultation'}</p>
                <Badge className="mt-3 bg-white text-purple-600">Verified Provider</Badge>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-gray-200">
                <p className="text-sm text-gray-500">Session price</p>
                <p className="text-3xl font-bold text-purple-600">{formatAmount(amount)}</p>
                <p className="text-sm text-gray-500 mt-2">No subscription fee. Platform commission 10%.</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-3xl p-5">
                <p className="text-sm font-medium text-gray-700">Payment Details</p>
                <div className="mt-3 grid gap-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Total</span>
                    <span>{formatAmount(amount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Platform commission</span>
                    <span>{formatAmount(commission)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Professional receives</span>
                    <span>{formatAmount(professionalReceives)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-3xl p-5 border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">Note</p>
                <p className="text-sm text-yellow-700 mt-1">
                  This is a mock checkout experience. Payment is simulated and no card details are collected.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleConfirm}>
                Confirm and Pay {formatAmount(amount)}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}