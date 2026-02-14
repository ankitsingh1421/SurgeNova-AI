import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, Clock, Zap, Star, Lock } from 'lucide-react';
import { getPrediction } from '../services/api.js';

interface SearchResultsProps {
  searchData: any;
  travelType: string;
  onBack: () => void;
}

export default function SearchResults({ searchData, travelType, onBack }: SearchResultsProps) {
  const initialPrice = Number(searchData?.predictedPrice);
  const [livePrice, setLivePrice] = useState(
    Number.isFinite(initialPrice) && initialPrice > 0 ? initialPrice : 4200
  );
  const [priceMultiplier, setPriceMultiplier] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date());

  const basePrice = Number.isFinite(initialPrice) && initialPrice > 0 ? initialPrice : 4200;

  const flights = useMemo(() => {
    const template = [
      { airline: 'Air India', flightNumber: 'AI 2757', departTime: '00:15', arriveTime: '03:10', duration: '02 h 55 m', onTime: '80%', amenities: 'Free Hot Meal | Free Seat with VISA Signature' },
      { airline: 'Air India', flightNumber: 'AI 507', departTime: '03:10', arriveTime: '05:50', duration: '02 h 40 m', onTime: '80%', amenities: 'Free Hot Meal | Free Seat with VISA Signature' },
      { airline: 'IndiGo', flightNumber: '6E 2045', departTime: '06:00', arriveTime: '08:45', duration: '02 h 45 m', onTime: '85%', amenities: 'Chargeable Meals' },
      { airline: 'Vistara', flightNumber: 'UK 863', departTime: '07:15', arriveTime: '10:00', duration: '02 h 45 m', onTime: '90%', amenities: 'Free Hot Meal | Extra Legroom' },
    ];

    return template.map((flight, idx) => ({
      ...flight,
      stops: 'Non stop',
      from: searchData?.from || 'New Delhi',
      to: searchData?.to || 'Bengaluru',
      price: Math.max(1, Math.round(livePrice * priceMultiplier * (1 + idx * 0.03))),
    }));
  }, [livePrice, priceMultiplier, searchData?.from, searchData?.to]);

  useEffect(() => {
    let isMounted = true;
    const refreshPrice = async () => {
      setIsRefreshing(true);
      const now = Date.now();
      const departure = new Date(searchData?.departDate || now);
      const dayOfWeek = departure.getDay();
      const hoursToEvent = Math.max(1, (departure.getTime() - now) / (1000 * 60 * 60));
      const wave = Math.sin(now / 60000);

      const payload = {
        transport_type: 'flight',
        active_users: Math.max(60, Math.round(120 + wave * 40)),
        search_count_last_1hr: Math.max(220, Math.round(450 + wave * 80)),
        booking_rate: 0.28 + ((wave + 1) / 2) * 0.1,
        available_inventory: Math.max(20, Math.round(50 - wave * 10)),
        total_inventory: 100,
        cancellation_rate: 0.05,
        day_of_week: dayOfWeek,
        is_weekend: [0, 6].includes(dayOfWeek) ? 1 : 0,
        is_holiday: 0,
        time_to_event: hoursToEvent,
        distance_km: 1000,
        local_event_score: 0.6,
        avg_competitor_price: basePrice,
        user_loyalty_score: 0.8,
      };

      const nextPrice = await getPrediction(payload);
      if (isMounted && Number.isFinite(nextPrice) && nextPrice > 0) {
        setLivePrice(nextPrice);
        setLastUpdatedAt(new Date());
      }
      if (isMounted) setIsRefreshing(false);
    };

    void refreshPrice();
    const intervalId = setInterval(() => {
      void refreshPrice();
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [basePrice, searchData?.departDate]);

  const primaryPrice = flights[0]?.price ?? livePrice;
  const sliderMinPrice = Math.round(livePrice * 0.9);
  const sliderMaxPrice = Math.round(livePrice * 1.3);
  const sliderSelectedPrice = Math.round(livePrice * priceMultiplier);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center space-x-2 text-gray-800 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Modify Search</span>
          </button>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2">
              <span className="font-semibold">TRIP TYPE</span>
              <span>{searchData?.tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2">
              <span className="font-semibold">FROM</span>
              <span>{searchData?.from || 'New Delhi'}, India</span>
            </div>
            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2">
              <span className="font-semibold">TO</span>
              <span>{searchData?.to || 'Bengaluru'}, India</span>
            </div>
            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2">
              <span className="font-semibold">DEPART</span>
              <span>
                {new Date(searchData?.departDate || Date.now()).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2">
              <span className="font-semibold">PASSENGER & CLASS</span>
              <span>{searchData?.travelers || 1} Adult, {searchData?.classType || 'Economy'}</span>
            </div>
            <div className="rounded-lg bg-blue-50 px-4 py-2 text-blue-800">
              Live updates every 10s
              <span className="ml-2 text-xs text-blue-700">({lastUpdatedAt.toLocaleTimeString()})</span>
              {isRefreshing && <span className="ml-2 text-xs">Updating...</span>}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-800">Travel type: {travelType}</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-semibold">Filters</h3>
              <div className="mb-4">
                <label className="mb-2 flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Refundable Fares</span>
                  <span className="ml-auto text-sm text-gray-700">₹ {primaryPrice.toLocaleString()}</span>
                </label>
              </div>
              <hr className="my-4" />
              <div className="mb-4">
                <h4 className="mb-3 text-sm font-semibold">One Way Price</h4>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>₹ {sliderMinPrice.toLocaleString()}</span>
                  <span>₹ {sliderMaxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="w-full"
                  min="0.9"
                  max="1.3"
                  step="0.01"
                  value={priceMultiplier}
                  onChange={(e) => setPriceMultiplier(Number(e.target.value))}
                />
                <div className="mt-2 text-sm text-blue-800">
                  Selected One Way Price: ₹ {sliderSelectedPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  <span>₹</span>
                  <span>CHEAPEST</span>
                  <div className="text-xs">₹ {primaryPrice.toLocaleString()} | 02h 45m</div>
                </button>
                <button className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                  <Zap className="h-4 w-4" />
                  <span>NON STOP FIRST</span>
                </button>
                <button className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                  <Star className="h-4 w-4" />
                  <span>YOU MAY PREFER</span>
                </button>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm">
              Flights sorted by Lowest fares on this route
            </div>

            <div className="space-y-4">
              {flights.map((flight, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded bg-red-600">
                          <span className="text-xs font-bold text-white">
                            {flight.airline === 'IndiGo' ? '6E' : flight.airline === 'Vistara' ? 'UK' : 'AI'}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{flight.airline}</div>
                          <div className="text-sm text-gray-700">{flight.flightNumber}</div>
                        </div>
                      </div>
                      <div className="mb-2 text-sm text-gray-800">{flight.amenities}</div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.departTime}</div>
                        <div className="text-sm text-gray-700">{flight.from}</div>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="text-sm text-gray-700">{flight.duration}</div>
                        <div className="my-1 border-t border-gray-300"></div>
                        <div className="text-sm font-semibold text-green-600">{flight.stops}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.arriveTime}</div>
                        <div className="text-sm text-gray-700">{flight.to}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold">₹ {flight.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-700">/adult</div>
                        <button className="mt-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                          VIEW PRICES
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">{flight.onTime} on time</span>
                      </div>
                      <button className="text-blue-700 hover:underline">Add to compare +</button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-blue-700" />
                      <span className="text-sm text-blue-700">Lock this price @ ₹ 429 →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
