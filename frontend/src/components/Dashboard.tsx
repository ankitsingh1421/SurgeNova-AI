import { useState } from 'react';
import { Plane, Train, Car, Hotel, Package, Bus, Compass, Lightbulb, FileText, Ship, CreditCard, Shield, ArrowLeft } from 'lucide-react';
import FlightSearch from './FlightSearch';
import TrainSearch from './TrainSearch';
import SearchResults from './SearchResults';

interface DashboardProps {
  onBack: () => void;
  onSearch?: (data: any) => void;
}

type TravelType = 'flights' | 'trains' | 'hotels' | 'villas' | 'packages' | 'buses' | 'cabs' | 'tours' | 'visa' | 'cruise' | 'forex' | 'insurance';

export default function Dashboard({ onBack, onSearch }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TravelType>('flights');
  const [searchData, setSearchData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Package },
    { id: 'villas', label: 'Villas & Homestays', icon: Hotel },
    { id: 'packages', label: 'Holiday Packages', icon: Compass },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'cabs', label: 'Cabs', icon: Car },
    { id: 'tours', label: 'Tours & Attractions', icon: Lightbulb },
    { id: 'visa', label: 'Visa', icon: FileText },
    { id: 'cruise', label: 'Cruise', icon: Ship },
    { id: 'forex', label: 'Forex Card & Currency', icon: CreditCard },
    { id: 'insurance', label: 'Travel Insurance', icon: Shield },
  ];

  const handleSearch = (data: any) => {
    if (isTransitioning) return;
    const payload = {
      ...data,
      travelType: activeTab,
    };
    setSearchData(payload);
    onSearch?.(payload);
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
      setShowResults(true);
    }, 3000);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <nav className="border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-cyan-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </button>
          <div className="text-2xl font-bold text-cyan-300">PricePredict</div>
        </div>
      </nav>

      {isTransitioning ? (
        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-5xl overflow-hidden bg-gray-100 border border-gray-300 shadow-2xl h-72 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-3 bg-green-200/80">
              <div className="h-full animate-loader-progress bg-emerald-500" />
            </div>

            <div className="absolute -translate-y-1/2 border-t-2 border-gray-300 border-dashed left-10 right-10 top-1/2" />
            <div className="absolute -translate-y-1/2 left-10 right-10 top-1/2">
              <div className="text-gray-800 animate-plane-travel">
                <Plane className="w-10 h-10 rotate-6" />
              </div>
            </div>

            <div className="absolute inset-x-0 text-center bottom-12">
              <h2 className="text-4xl font-bold text-gray-900">Hold on, we&apos;re fetching flights for you</h2>
            </div>
          </div>
        </div>
      ) : showResults ? (
        <SearchResults
          searchData={searchData}
          travelType={activeTab}
          onBack={handleBackToSearch}
        />
      ) : (
        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 mb-6 text-white border rounded-2xl border-cyan-400/35 bg-white/10 backdrop-blur">
          <h1 className="text-3xl font-bold">Travel Pricing Dashboard</h1>
          <p className="mt-2 text-slate-100">
            Search routes and get dynamic predictions. Every search creates a shareable URL.
          </p>
        </div>

        <div className="overflow-hidden bg-white border shadow-2xl rounded-2xl border-white/10">
          <div className="border-b border-gray-200 bg-slate-50">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TravelType)}
                    className={`flex min-w-max flex-col items-center px-6 py-4 transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-600 bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'flights' && <FlightSearch onSearch={handleSearch} />}
            {activeTab === 'trains' && <TrainSearch onSearch={handleSearch} />}
            {activeTab !== 'flights' && activeTab !== 'trains' && (
              <div className="py-12 text-center border border-gray-300 border-dashed rounded-xl bg-gray-50">
                <p className="text-lg text-gray-600">
                  {tabs.find(t => t.id === activeTab)?.label} search coming soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
