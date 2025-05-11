import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout(); 
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-6 right-6 bg-[#a18aff] text-white p-4 rounded-full shadow-lg hover:bg-[#8c75f0] transition duration-300"
      aria-label="Logout"
    >
      <LogOut size={20} />
    </button>
  );
}

export default LogoutButton;
