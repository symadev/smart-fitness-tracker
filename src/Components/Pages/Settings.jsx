import { useState } from "react";

const Settings = () => {
  const [themeEnabled, setThemeEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    console.log("Saved:", { name, email, themeEnabled, notificationsEnabled });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60] px-4">
      <div className="w-full max-w-md bg-[#0e1c4b] text-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-blue-400">⚙️</span> SETTINGS
        </h2>

        <div className="border-t border-b border-gray-600 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Theme</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={themeEnabled}
                onChange={() => setThemeEnabled(!themeEnabled)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Notifications</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-all"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Update Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold shadow-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
