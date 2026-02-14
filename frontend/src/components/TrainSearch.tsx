import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface TrainSearchProps {
  onSearch: (data: any) => void;
}

export default function TrainSearch({ onSearch }: TrainSearchProps) {
  const [bookingType, setBookingType] = useState<'book' | 'pnr' | 'live'>('book');
  const [from, setFrom] = useState('New Delhi');
  const [fromCode] = useState('NDLS');
  const [to, setTo] = useState('Kanpur');
  const [toCode] = useState('CNB');
  const [travelDate, setTravelDate] = useState('2026-02-15');
  const [classType, setClassType] = useState('ALL');

  const handleSearch = () => {
    onSearch({
      bookingType,
      from,
      fromCode,
      to,
      toCode,
      travelDate,
      classType,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={bookingType === 'book'}
              onChange={() => setBookingType('book')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="font-medium">Book Train Tickets</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={bookingType === 'pnr'}
              onChange={() => setBookingType('pnr')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="font-medium">Check PNR Status</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              checked={bookingType === 'live'}
              onChange={() => setBookingType('live')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="font-medium">Live Train Status</span>
          </label>
        </div>
        <div className="text-sm text-gray-600">
          Train Ticket Booking<br />
          <span className="text-xs">IRCTC Authorized e-ticketing</span>
        </div>
      </div>

      {bookingType === 'book' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-4">
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <div className="relative">
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl font-bold"
                />
                <div className="text-xs text-gray-500 mt-1">{fromCode}, New Delhi Railway Station</div>
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <div className="relative">
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl font-bold"
                />
                <div className="text-xs text-gray-500 mt-1">{toCode}, Kanpur Central</div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Class</label>
              <div className="relative">
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-lg font-bold"
                >
                  <option value="ALL">ALL</option>
                  <option value="SL">Sleeper (SL)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="1A">AC 1 Tier (1A)</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <div className="text-xs text-gray-500 mt-1">All Class</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="px-16 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              SEARCH
            </button>
          </div>
        </>
      )}

      {bookingType === 'pnr' && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter PNR Number</label>
            <input
              type="text"
              placeholder="10 digit PNR number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              maxLength={10}
            />
            <button className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Check Status
            </button>
          </div>
        </div>
      )}

      {bookingType === 'live' && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Train Number or Name</label>
            <input
              type="text"
              placeholder="e.g., 12345 or Rajdhani Express"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <button className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Track Train
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
