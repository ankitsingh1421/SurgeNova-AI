// import { useState } from 'react';
// import { ArrowRightLeft, Calendar, Users, ChevronDown } from 'lucide-react';
// import { getPrediction } from '../services/api.js';


// interface FlightSearchProps {
//   onSearch: (data: any) => void;
// }

// export default function FlightSearch({ onSearch }: FlightSearchProps) {
//   const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>('oneWay');
//   const [fareType, setFareType] = useState('regular');
//   const [from, setFrom] = useState('Delhi');
//   const [fromCode, setFromCode] = useState('DEL');
//   const [to, setTo] = useState('Bengaluru');
//   const [toCode, setToCode] = useState('BLR');
//   const [departDate, setDepartDate] = useState('2026-02-15');
//   const [returnDate, setReturnDate] = useState('');
//   const [travelers, setTravelers] = useState(1);
//   const [classType, setClassType] = useState('Economy');
//   const [zeroCancellation, setZeroCancellation] = useState(false);
//   const [price, setPrice] = useState<number | null>(null);


//   const handleSwap = () => {
//     const tempCity = from;
//     const tempCode = fromCode;
//     setFrom(to);
//     setFromCode(toCode);
//     setTo(tempCity);
//     setToCode(tempCode);
//   };

//   const handleSearch = async () => {
//     onSearch({
//       tripType,
//       from,
//       fromCode,
//       to,
//       toCode,
//       departDate,
//       returnDate,
//       travelers,
//       classType,
//       fareType,
//       zeroCancellation,
//     });

//     const formData = {
//       transport_type: 'flight',
//       active_users: 120,
//       search_count_last_1hr: 450,
//       booking_rate: 0.32,
//       available_inventory: 50,
//       total_inventory: 100,
//       cancellation_rate: 0.05,
//       day_of_week: 5,
//       is_weekend: 1,
//       is_holiday: 0,
//       time_to_event: 72,
//       distance_km: 500,
//       local_event_score: 0.6,
//       avg_competitor_price: 4200,
//       user_loyalty_score: 0.8,
//     };

//     const predicted = await getPrediction(formData);
//     setPrice(predicted);
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex space-x-6">
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               checked={tripType === 'oneWay'}
//               onChange={() => setTripType('oneWay')}
//               className="w-4 h-4 text-blue-600"
//             />
//             <span className="font-medium">One Way</span>
//           </label>
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               checked={tripType === 'roundTrip'}
//               onChange={() => setTripType('roundTrip')}
//               className="w-4 h-4 text-blue-600"
//             />
//             <span className="font-medium">Round Trip</span>
//           </label>
//           <label className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               checked={tripType === 'multiCity'}
//               onChange={() => setTripType('multiCity')}
//               className="w-4 h-4 text-blue-600"
//             />
//             <span className="font-medium">Multi City</span>
//           </label>
//         </div>
//         <div className="text-sm text-gray-600">
//           Book International and Domestic Flights
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-12">
//         <div className="relative md:col-span-3">
//           <label className="block mb-1 text-xs text-gray-500">From</label>
//           <div className="relative">
//             <input
//               type="text"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <div className="mt-1 text-xs text-gray-500">{fromCode}, Delhi Airport India</div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center pt-6 md:col-span-1">
//           <button
//             onClick={handleSwap}
//             className="p-2 transition-colors rounded-full hover:bg-gray-100"
//           >
//             <ArrowRightLeft className="w-5 h-5 text-blue-600" />
//           </button>
//         </div>

//         <div className="md:col-span-3">
//           <label className="block mb-1 text-xs text-gray-500">To</label>
//           <div className="relative">
//             <input
//               type="text"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <div className="mt-1 text-xs text-gray-500">{toCode}, Bengaluru International Airport</div>
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <label className="block mb-1 text-xs text-gray-500">Departure</label>
//           <div className="relative">
//             <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
//             <input
//               type="date"
//               value={departDate}
//               onChange={(e) => setDepartDate(e.target.value)}
//               className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {tripType === 'roundTrip' && (
//           <div className="md:col-span-2">
//             <label className="block mb-1 text-xs text-gray-500">Return</label>
//             <div className="relative">
//               <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
//               <input
//                 type="date"
//                 value={returnDate}
//                 onChange={(e) => setReturnDate(e.target.value)}
//                 className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         )}

//         <div className="md:col-span-3">
//           <label className="block mb-1 text-xs text-gray-500">Travellers & Class</label>
//           <div className="relative">
//             <Users className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
//             <select
//               value={`${travelers}-${classType}`}
//               onChange={(e) => {
//                 const [t, c] = e.target.value.split('-');
//                 setTravelers(parseInt(t));
//                 setClassType(c);
//               }}
//               className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="1-Economy">1 Traveller, Economy</option>
//               <option value="2-Economy">2 Travellers, Economy</option>
//               <option value="3-Economy">3 Travellers, Economy</option>
//               <option value="1-Premium">1 Traveller, Premium Economy</option>
//               <option value="1-Business">1 Traveller, Business</option>
//             </select>
//             <ChevronDown className="absolute w-5 h-5 text-gray-400 pointer-events-none right-3 top-3" />
//           </div>
//         </div>
//       </div>

//       <div className="mb-6">
//         <div className="flex items-center mb-3 space-x-2">
//           <span className="font-semibold">SPECIAL FARES</span>
//         </div>
//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={() => setFareType('regular')}
//             className={`px-6 py-3 rounded-lg border-2 transition-all ${
//               fareType === 'regular'
//                 ? 'border-blue-600 bg-blue-50 text-blue-600'
//                 : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <div className="font-semibold">Regular</div>
//             <div className="text-xs text-gray-500">Regular fares</div>
//           </button>
//           <button
//             onClick={() => setFareType('student')}
//             className={`px-6 py-3 rounded-lg border-2 transition-all ${
//               fareType === 'student'
//                 ? 'border-blue-600 bg-blue-50 text-blue-600'
//                 : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <div className="font-semibold">Student</div>
//             <div className="text-xs text-gray-500">Extra discounts/baggage</div>
//           </button>
//           <button
//             onClick={() => setFareType('armed')}
//             className={`px-6 py-3 rounded-lg border-2 transition-all ${
//               fareType === 'armed'
//                 ? 'border-blue-600 bg-blue-50 text-blue-600'
//                 : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <div className="font-semibold">Armed Forces</div>
//             <div className="text-xs text-gray-500">Up to ₹ 600 off</div>
//           </button>
//           <button
//             onClick={() => setFareType('senior')}
//             className={`px-6 py-3 rounded-lg border-2 transition-all ${
//               fareType === 'senior'
//                 ? 'border-blue-600 bg-blue-50 text-blue-600'
//                 : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <div className="font-semibold">Senior Citizen</div>
//             <div className="text-xs text-gray-500">Up to ₹ 600 off</div>
//           </button>
//           <button
//             onClick={() => setFareType('doctor')}
//             className={`px-6 py-3 rounded-lg border-2 transition-all ${
//               fareType === 'doctor'
//                 ? 'border-blue-600 bg-blue-50 text-blue-600'
//                 : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <div className="font-semibold">Doctor and Nurses</div>
//             <div className="text-xs text-gray-500">Up to ₹ 600 off</div>
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <label className="flex items-center space-x-3 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={zeroCancellation}
//             onChange={(e) => setZeroCancellation(e.target.checked)}
//             className="w-5 h-5 text-blue-600 rounded"
//           />
//           <div>
//             <span className="font-semibold">Add Zero Cancellation</span>
//             <span className="ml-2 text-sm text-gray-500">Get 100% refund on cancellation</span>
//           </div>
//         </label>
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={() => {
//             void handleSearch();
//           }}
//           className="px-16 py-4 text-lg font-semibold text-white transition-colors bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl"
//         >
//           SEARCH
//         </button>
//       </div>
//       {price !== null && (
//         <p className="mt-4 text-center text-gray-700">Predicted price: {price}</p>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { ArrowRightLeft, Calendar, Users, ChevronDown } from 'lucide-react';
import { getPrediction } from '../services/api.js';

interface FlightSearchProps {
  onSearch: (data: any) => void;
}

export default function FlightSearch({ onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>('oneWay');
  const [fareType] = useState('regular');
  const [from, setFrom] = useState('Delhi');
  const [fromCode, setFromCode] = useState('DEL');
  const [to, setTo] = useState('Bengaluru');
  const [toCode, setToCode] = useState('BLR');
  const [departDate, setDepartDate] = useState('2026-02-15');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [classType, setClassType] = useState('Economy');
  const [zeroCancellation, setZeroCancellation] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const handleSwap = () => {
    const tempCity = from;
    const tempCode = fromCode;
    setFrom(to);
    setFromCode(toCode);
    setTo(tempCity);
    setToCode(tempCode);
  };

  const handleSearch = async () => {
    const formData = {
      transport_type: 'flight',
      active_users: 120,
      search_count_last_1hr: 450,
      booking_rate: 0.32,
      available_inventory: 50,
      total_inventory: 100,
      cancellation_rate: 0.05,
      day_of_week: new Date(departDate).getDay(),
      is_weekend: [0, 6].includes(new Date(departDate).getDay()) ? 1 : 0,
      is_holiday: 0,
      time_to_event: Math.max(1, (new Date(departDate).getTime() - new Date().getTime()) / (1000 * 60 * 60)), // hours
      distance_km: 500, // replace with real distance logic
      local_event_score: 0.6,
      avg_competitor_price: 5000,
      user_loyalty_score: 0.8,
    };

    const predictedPrice = await getPrediction(formData);
    setPrice(predictedPrice);

    // Pass search data + predicted price to parent
    onSearch({
      tripType,
      from,
      fromCode,
      to,
      toCode,
      departDate,
      returnDate,
      travelers,
      classType,
      fareType,
      zeroCancellation,
      predictedPrice,
    });
  };

  return (
    <div className="p-4">
      {/* Trip Type */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-6">
          {['oneWay', 'roundTrip', 'multiCity'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === type}
                onChange={() => setTripType(type as any)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="font-medium">{type === 'oneWay' ? 'One Way' : type === 'roundTrip' ? 'Round Trip' : 'Multi City'}</span>
            </label>
          ))}
        </div>
        <div className="text-sm text-gray-600">Book International and Domestic Flights</div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-12">
        <div className="relative md:col-span-3">
          <label className="block mb-1 text-xs text-gray-500">From</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-1 text-xs text-gray-500">{fromCode}</div>
        </div>

        <div className="flex items-center justify-center pt-6 md:col-span-1">
          <button onClick={handleSwap} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1 text-xs text-gray-500">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-1 text-xs text-gray-500">{toCode}</div>
        </div>

        {/* Departure */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-xs text-gray-500">Departure</label>
          <div className="relative">
            <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Return */}
        {tripType === 'roundTrip' && (
          <div className="md:col-span-2">
            <label className="block mb-1 text-xs text-gray-500">Return</label>
            <div className="relative">
              <Calendar className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Travelers & Class */}
        <div className="md:col-span-3">
          <label className="block mb-1 text-xs text-gray-500">Travellers & Class</label>
          <div className="relative">
            <Users className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            <select
              value={`${travelers}-${classType}`}
              onChange={(e) => {
                const [t, c] = e.target.value.split('-');
                setTravelers(parseInt(t));
                setClassType(c);
              }}
              className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1-Economy">1 Traveller, Economy</option>
              <option value="2-Economy">2 Travellers, Economy</option>
              <option value="1-Business">1 Traveller, Business</option>
            </select>
            <ChevronDown className="absolute w-5 h-5 text-gray-400 pointer-events-none right-3 top-3" />
          </div>
        </div>
      </div>

      {/* Zero Cancellation */}
      <div className="flex items-center mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={zeroCancellation}
            onChange={(e) => setZeroCancellation(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <span className="font-semibold">Add Zero Cancellation</span>
        </label>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="px-16 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
        >
          SEARCH
        </button>
      </div>

      {/* Price Display */}
      {price !== null && (
        <p className="mt-4 text-center text-gray-700">Predicted price: ₹ {price}</p>
      )}
    </div>
  );
}
