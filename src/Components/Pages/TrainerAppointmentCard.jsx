import { useState } from "react";
import { Calendar, Clock, User } from "lucide-react";

// Your JSON data
const trainersData = [
  {
    id: 1,
    name: "Alex Jones",
    role: "Strength Coach",
    specialty: "HIIT & Fat Loss",
    rating: 4.9,
    bio: "10+ years of experience in transforming physiques with science-backed training.",
    image: "/assets/jon.jpg",
    available: true
  },
  {
    id: 2,
    name: "Smith Tom",
    role: "Fitness Trainer",
    specialty: "Muscle Gain",
    rating: 4.8,
    bio: "Certified body specialist helping clients build muscle and confidence.",
    image: "/assets/tom.jpeg",
    available: true
  },
  {
    id: 3,
    name: "Maria Adni",
    role: "Yoga & Mobility Coach",
    specialty: "Yoga / Flexibility",
    rating: 4.9,
    bio: "Mind-body balance expert specializing in deep stretches and mobility training.",
    image: "/assets/maria.jpeg",
    available: true
  },
  {
    id: 4,
    name: "Mohin Ahad",
    role: "Cardio Specialist",
    specialty: "Endurance & Cardio",
    rating: 4.7,
    bio: "Focused on stamina building, endurance training, and performance fitness.",
    image: "/assets/ahad.jpg",
    available: false
  }
];

const TrainerAppointmentCard = () => {
  const [currentView, setCurrentView] = useState("main"); // main, trainers, book, appointments
  const [selectedTrainer, setSelectedTrainer] = useState(null);




  // Main Card View
  const MainView = () => (
    <div className="space-y-4">
      {/* Progress Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
       
          <button
            onClick={() => setCurrentView("trainers")}
            className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 transition-colors"
          >
            🎯 Book a Trainer Now
          </button>
   
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
      
        
        <button
          onClick={() => setCurrentView("trainers")}
          className="bg-pink-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors text-left"
        >
          <User className="w-5 h-5 mb-1" />
          <p className="text-xs">Trainers</p>
          <p className="text-lg font-bold">{trainersData.length}</p>
        </button>
      </div>

   
    </div>
  );

  // Trainer List View
  const TrainerListView = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-800">Available Trainers</h3>
        <button
          onClick={() => setCurrentView("main")}
          className="text-blue-600 text-sm font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {trainersData.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
               
                <div>
                  <p className="font-semibold text-sm text-gray-800">{trainer.name}</p>
                  <p className="text-xs text-gray-500">{trainer.specialty}</p>
                  <p className="text-xs text-gray-400">{trainer.bio}</p>
                </div>
              </div>
              {trainer.available ? (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  Available
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                  Busy
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-600">⭐ {trainer.rating}/5.0</span>
              <button
                onClick={() => {
                  setSelectedTrainer(trainer);
                  setCurrentView("book");
                }}
                disabled={!trainer.available}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  trainer.available
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Book Appointment View
  const BookAppointmentView = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [notes, setNotes] = useState("");

    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

    const handleBooking = () => {
      if (selectedDate && selectedTime) {
        alert("Appointment booked successfully! ✅");
        setCurrentView("appointments");
      } else {
        alert("Please select date and time");
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">Book Appointment</h3>
          <button
            onClick={() => setCurrentView("trainers")}
            className="text-blue-600 text-sm font-medium"
          >
            ← Back
          </button>
        </div>

        {/* Trainer Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
           
            <div>
              <p className="font-semibold text-sm">{selectedTrainer?.name}</p>
              <p className="text-xs text-blue-100">{selectedTrainer?.specialty} Specialist</p>
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedTime === slot
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="2"
            placeholder="Any specific requirements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    );
  };



  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-5 text-white w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <h2 className="text-lg font-bold">Trainer Appointments</h2>
        </div>
        {currentView !== "main" && (
          <button
            onClick={() => setCurrentView("main")}
            className="bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        {currentView === "main" && <MainView />}
        {currentView === "trainers" && <TrainerListView />}
        {currentView === "book" && <BookAppointmentView />}
     
      </div>
    </div>
  );
};

export default TrainerAppointmentCard;
