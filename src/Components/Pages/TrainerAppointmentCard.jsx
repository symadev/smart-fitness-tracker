import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, User } from "lucide-react";

const trainersData = [
  { id: 1, name: "Alex Jones", role: "Strength Coach", specialty: "HIIT & Fat Loss", rating: 4.9, bio: "10+ years of experience in transforming physiques with science-backed training.", image: "/assets/jon.jpg", available: true, email: "alex@example.com" },
  { id: 2, name: "Smith Tom", role: "Fitness Trainer", specialty: "Muscle Gain", rating: 4.8, bio: "Certified body specialist helping clients build muscle and confidence.", image: "/assets/tom.jpeg", available: true, email: "smith@example.com" },
  { id: 3, name: "Maria Adni", role: "Yoga & Mobility Coach", specialty: "Yoga / Flexibility", rating: 4.9, bio: "Mind-body balance expert specializing in deep stretches and mobility training.", image: "/assets/maria.jpeg", available: true, email: "maria@example.com" },
  { id: 4, name: "Mohin Ahad", role: "Cardio Specialist", specialty: "Endurance & Cardio", rating: 4.7, bio: "Focused on stamina building, endurance training, and performance fitness.", image: "/assets/ahad.jpg", available: false, email: "mohin@example.com" }
];

const TrainerAppointmentCard = () => {
  const [currentView, setCurrentView] = useState("main");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Fetch user appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.get("https://fitness-server-lilac.vercel.app/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  // ===== Book Appointment View =====
  const BookAppointmentView = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [notes, setNotes] = useState("");

    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

    const handleBooking = async () => {
      if (!selectedDate || !selectedTime) {
        alert("Please select date and time");
        return;
      }

      const bookingData = {
        trainerName: selectedTrainer?.name,
        trainerEmail: selectedTrainer?.email,
        date: selectedDate,
        time: selectedTime,
        notes,
      };

      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.post("https://fitness-server-lilac.vercel.app/bookings", bookingData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.insertedId) {
          const newBooking = { ...bookingData, _id: res.data.insertedId, status: "pending" };
          setAppointments(prev => [...prev, newBooking]); // Add new booking locally
          alert("✅ Appointment booked successfully!");
          setCurrentView("appointments");
        }
      } catch (error) {
        console.error(error);
        alert("❌ Failed to book appointment. Please try again.");
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">Book Appointment</h3>
          <button onClick={() => setCurrentView("trainers")} className="text-blue-600 text-sm font-medium">← Back</button>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3">
          <p className="font-semibold text-sm">{selectedTrainer?.name}</p>
          <p className="text-xs text-blue-100">{selectedTrainer?.specialty} Specialist</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Select Date</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg text-sm" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(slot => (
              <button key={slot} onClick={() => setSelectedTime(slot)} className={`py-2 rounded-lg text-xs font-medium ${selectedTime === slot ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Notes (Optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black text-sm" />
        </div>

        <button onClick={handleBooking} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold text-sm">
          Book Appointment
        </button>
      </div>
    );
  };

  // ===== Appointments View =====
  const AppointmentsView = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-800">My Appointments</h3>
        <button onClick={() => setCurrentView("main")} className="text-blue-600 text-sm font-medium">← Back</button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {appointments.length === 0 && <p className="text-xs text-gray-300">No appointments yet.</p>}
        {appointments.map(appt => (
          <div key={appt._id} className="bg-white rounded-lg p-3 border text-black">
            <p className="font-semibold text-sm">{appt.trainerName}</p>
            <p className="text-xs">{appt.date} - {appt.time}</p>
            <p className="text-xs text-gray-500">Status: {appt.status}</p>
            {appt.notes && <p className="text-xs">Notes: {appt.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );

//trainer list here
  const TrainerListView = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-800">Available Trainers</h3>
        <button onClick={() => setCurrentView("main")} className="text-blue-600 text-sm font-medium">← Back</button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {trainersData.map(trainer => (
          <div key={trainer.id} className="bg-white rounded-lg p-3 border">
            <p className="font-semibold text-sm text-gray-800">{trainer.name}</p>
            <p className="text-xs text-gray-500">{trainer.specialty}</p>
            <button onClick={() => { setSelectedTrainer(trainer); setCurrentView("book"); }} disabled={!trainer.available} className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Main View 
  const MainView = () => (
    <div className="space-y-4">
      <button onClick={() => setCurrentView("trainers")} className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold text-sm">
        🎯 Book a Trainer Now
      </button>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => setCurrentView("trainers")} className="bg-pink-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors text-left">
          <User className="w-5 h-5 mb-1" />
          <p className="text-xs">Trainers</p>
          <p className="text-lg font-bold">{trainersData.length}</p>
        </button>
        <button onClick={() => setCurrentView("appointments")} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors text-left">
          <Calendar className="w-5 h-5 mb-1" />
          <p className="text-xs">My Appointments</p>
          <p className="text-lg font-bold">{appointments.length}</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-5 text-white w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Trainer Appointments</h2>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        {currentView === "main" && <MainView />}
        {currentView === "trainers" && <TrainerListView />}
        {currentView === "book" && <BookAppointmentView />}
        {currentView === "appointments" && <AppointmentsView />}
      </div>
    </div>
  );
};

export default TrainerAppointmentCard;
