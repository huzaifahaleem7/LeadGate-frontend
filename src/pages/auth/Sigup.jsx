import { SignupForm } from "../../components/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-100">
      {/* Left Side - Illustration */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="max-w-md text-center z-10">
          <h1 className="text-5xl font-bold mb-6 animate-fadeInDown bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Join LeadGate Today!
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp text-gray-300">
            Securely manage leads and track approvals with ease.
          </p>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-animate opacity-20"></div>

          {/* Circles */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full translate-x-1/3 translate-y-1/3 animate-float delay-2000"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

          {/* Lines */}
          <div className="absolute top-1/4 left-1/4 w-64 h-1 bg-blue-500/30 animate-line-sweep"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-1 bg-indigo-500/30 animate-line-sweep delay-2000"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <SignupForm />
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
        }
        @keyframes lineSweep {
          0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%) scaleX(1); opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-line-sweep { animation: lineSweep 6s linear infinite; }
        .bg-gradient-animate {
          background: linear-gradient(-45deg, #3b82f6, #4f46e5, #60a5fa, #6366f1);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
