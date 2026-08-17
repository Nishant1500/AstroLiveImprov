import { useMediaQuery } from "react-responsive";

export default function MagicBall() {
  const isPhone = useMediaQuery({ minWidth: 0, maxWidth: 767 });
  return (
    <>
      <style>{`
        .scene-container *, .scene-container *::before, .scene-container *::after {
          box-sizing: border-box;
        }

        .scene-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 20px;
        }
        .scene {
          position: relative;
          width: 350px;
          height: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
        }

        /* Responsive Scaling for smaller viewports */
        @media (max-width: 400px) {
          .scene {
            transform: scale(0.85);
          }
        }

        @media (max-width: 330px) {
          .scene {
            transform: scale(0.7);
          }
        }

        .magical-aura {
          position: absolute;
          top: 15%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(59, 130, 246, 0.3) 45%, transparent 75%);
          border-radius: 50%;
          filter: blur(40px);
          z-index: -1;
          animation: auraPulse 4s ease-in-out infinite;
        }

        .crystal-ball {
          position: relative;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.9) 0%, 
              rgba(216, 180, 254, 0.4) 15%, 
              rgba(126, 34, 206, 0.7) 45%, 
              rgba(49, 10, 101, 0.95) 75%, 
              rgba(10, 2, 25, 1) 100%);
          box-shadow: 
              inset -30px -30px 50px rgba(0, 0, 0, 0.95),
              inset 20px 20px 35px rgba(255, 255, 255, 0.6),
              inset 0 0 30px rgba(217, 70, 239, 0.8),
              0 0 35px rgba(168, 85, 247, 0.8),
              0 0 70px rgba(59, 130, 246, 0.6),
              0 0 140px rgba(217, 70, 239, 0.4);
          overflow: hidden;
          animation: float 5s ease-in-out infinite;
          z-index: 2;
        }

        .crystal-mist {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
              from 0deg at 50% 50%,
              rgba(217, 70, 239, 0.5) 0deg,
              rgba(168, 85, 247, 0.6) 90deg,
              rgba(59, 130, 246, 0.5) 180deg,
              rgba(236, 72, 153, 0.5) 270deg,
              rgba(217, 70, 239, 0.5) 360deg
          );
          mix-blend-mode: screen;
          filter: blur(18px);
          animation: rotateMist 12s linear infinite;
        }

        .crystal-mist-rev {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 50%),
                      conic-gradient(from 180deg at 50% 50%, 
                      rgba(244, 63, 94, 0.5) 0deg, 
                      rgba(168, 85, 247, 0.7) 180deg, 
                      rgba(59, 130, 246, 0.6) 360deg);
          mix-blend-mode: color-dodge;
          filter: blur(12px);
          animation: rotateMistRev 8s linear infinite;
        }

        .crystal-core {
          position: absolute;
          top: 32%;
          left: 32%;
          width: 36%;
          height: 36%;
          background: radial-gradient(circle, #ffffff 0%, #f472b6 40%, rgba(147, 51, 234, 0.9) 70%, transparent 100%);
          border-radius: 50%;
          filter: blur(8px);
          mix-blend-mode: overlay;
          animation: pulseCore 3s ease-in-out infinite;
        }

        .sparkles {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: 
              radial-gradient(2px 2px at 40px 60px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 120px 140px, #fef08a, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 180px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 200px, #fde047, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 250px 250px;
          animation: sparkleMove 6s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.8;
        }

        .glass-glint-main {
          position: absolute;
          top: 10%;
          left: 18%;
          width: 75px;
          height: 30px;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.15));
          border-radius: 50%;
          transform: rotate(-38deg);
          filter: blur(1px);
        }

        .glass-pinpoint {
          position: absolute;
          top: 22%;
          left: 14%;
          width: 15px;
          height: 15px;
          background: #ffffff;
          border-radius: 50%;
          filter: blur(0.5px);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
        }

        .glass-lens-glare {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.35) 0%, transparent 45%);
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .crystal-caustic {
          position: absolute;
          bottom: 6%;
          left: 12%;
          width: 76%;
          height: 25px;
          background: radial-gradient(ellipse, rgba(253, 224, 71, 0.5) 0%, rgba(217, 70, 239, 0.4) 50%, transparent 75%);
          border-radius: 50%;
          transform: rotate(-8deg);
          filter: blur(5px);
          mix-blend-mode: screen;
        }

        .stand-container {
          position: relative;
          width: 220px;
          height: 120px;
          margin-top: -35px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
          animation: floatStand 5s ease-in-out infinite;
        }

        .curved-horn-left {
          position: absolute;
          top: -15px;
          left: 20px;
          width: 90px;
          height: 70px;
          border-top: 5px solid #a855f7;
          border-left: 5px solid transparent;
          border-radius: 50% 0 0 50%;
          transform: rotate(-25deg);
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.8));
          z-index: 3;
        }

        .curved-horn-right {
          position: absolute;
          top: -15px;
          right: 20px;
          width: 90px;
          height: 70px;
          border-top: 5px solid #a855f7;
          border-right: 5px solid transparent;
          border-radius: 0 50% 50% 0;
          transform: rotate(25deg);
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.8));
          z-index: 3;
        }

        .curved-cradle-bowl {
          width: 140px;
          height: 45px;
          background: linear-gradient(to bottom, #581c87, #2e1065);
          border-radius: 0 0 70px 70px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.9), inset 0 3px 6px rgba(216, 180, 254, 0.5);
          border: 1px solid rgba(168, 85, 247, 0.6);
          z-index: 2;
        }

        .curved-stem {
          width: 50px;
          height: 35px;
          background: linear-gradient(to right, #2e1065, #6b21a8, #2e1065);
          margin-top: -5px;
          clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
        }

        .curved-base-foot {
          width: 170px;
          height: 45px;
          background: radial-gradient(ellipse at center, #3b0764 0%, #170335 80%);
          border-radius: 50%;
          margin-top: -12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.95), inset 0 2px 5px rgba(216, 180, 254, 0.4);
          border-top: 1px solid rgba(217, 70, 239, 0.5);
          z-index: 1;
        }

        .ambient-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }

        .sparkle-particle {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px #fde047, 0 0 15px #f59e0b;
          animation: floatSparkle 4s ease-in-out infinite;
        }

        .sparkle-particle:nth-child(1) { width: 4px; height: 4px; top: 20%; left: 15%; background: #fef08a; animation-duration: 3.5s; animation-delay: 0s; }
        .sparkle-particle:nth-child(2) { width: 3px; height: 3px; top: 40%; left: 80%; background: #ffffff; animation-duration: 5s; animation-delay: 1s; }
        .sparkle-particle:nth-child(3) { width: 5px; height: 5px; top: 70%; left: 25%; background: #fde047; animation-duration: 4.2s; animation-delay: 0.5s; }
        .sparkle-particle:nth-child(4) { width: 3.5px; height: 3.5px; top: 15%; left: 75%; background: #fef08a; animation-duration: 4.8s; animation-delay: 2s; }

        .big-sparkle {
          position: absolute;
          background: white;
          clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
          animation: bigSparklePulse 3.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 4;
        }

        .big-sparkle-1 {
          width: 22px;
          height: 22px;
          top: 10%;
          left: 22%;
          background: #fde047;
          box-shadow: 0 0 12px #fef08a, 0 0 25px #eab308, 0 0 40px #ca8a04;
          animation-delay: 0.2s;
        }

        .big-sparkle-2 {
          width: 18px;
          height: 18px;
          top: 30%;
          right: 12%;
          background: #ffffff;
          box-shadow: 0 0 12px #ffffff, 0 0 25px #d946ef, 0 0 40px #8b5cf6;
          animation-delay: 1.4s;
        }

        .big-sparkle-3 {
          width: 26px;
          height: 26px;
          bottom: 35%;
          left: 8%;
          background: #fef08a;
          box-shadow: 0 0 12px #fde047, 0 0 25px #facc15, 0 0 40px #eab308;
          animation-delay: 2.1s;
        }

        .big-sparkle-4 {
          width: 20px;
          height: 20px;
          bottom: 12%;
          right: 20%;
          background: #ffffff;
          box-shadow: 0 0 12px #ffffff, 0 0 25px #d946ef, 0 0 40px #8b5cf6;
          animation-delay: 0.8s;
        }

        .floor-glow {
          position: absolute;
          bottom: 15px;
          width: 220px;
          height: 40px;
          background: radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(217, 70, 239, 0.4) 40%, rgba(0, 0, 0, 0.9) 80%, transparent 100%);
          border-radius: 50%;
          z-index: -2;
          filter: blur(12px);
          animation: shadowPulse 5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        @keyframes floatStand {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        @keyframes auraPulse {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        @keyframes rotateMist {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes rotateMistRev {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes pulseCore {
          0%, 100% { transform: scale(0.8); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
        }

        @keyframes sparkleMove {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-50px) rotate(360deg); }
        }

        @keyframes floatSparkle {
          0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-25px) scale(1.4); opacity: 1; }
        }

        @keyframes bigSparklePulse {
          0%, 100% { transform: scale(0.4) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; filter: drop-shadow(0 0 15px #fef08a); }
        }

        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(0.75); opacity: 0.4; }
        }
      `}</style>

      <div className="scene-wrapper" style={{ paddingTop: isPhone ? "75px" : "0px" }}>
        <div className="scene-container">
          <div className="scene">
            <div className="magical-aura"></div>

            <div className="big-sparkle big-sparkle-1"></div>
            <div className="big-sparkle big-sparkle-2"></div>
            <div className="big-sparkle big-sparkle-3"></div>
            <div className="big-sparkle big-sparkle-4"></div>

            <div className="ambient-sparkles">
              <div className="sparkle-particle"></div>
              <div className="sparkle-particle"></div>
              <div className="sparkle-particle"></div>
              <div className="sparkle-particle"></div>
            </div>

            <div className="crystal-ball">
              <div className="crystal-mist"></div>
              <div className="crystal-mist-rev"></div>
              <div className="crystal-core"></div>
              <div className="sparkles"></div>
              <div className="glass-lens-glare"></div>
              <div className="crystal-caustic"></div>
              <div className="glass-glint-main"></div>
              <div className="glass-pinpoint"></div>
            </div>

            <div className="stand-container">
              <div className="curved-horn-left"></div>
              <div className="curved-horn-right"></div>
              <div className="curved-cradle-bowl"></div>
              <div className="curved-stem"></div>
              <div className="curved-base-foot"></div>
            </div>

            <div className="floor-glow"></div>
          </div>
        </div>
      </div>
    </>
  );
}
