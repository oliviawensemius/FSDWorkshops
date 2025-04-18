import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 6;
const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE;
const GAME_DURATION = 30; // seconds
const MIN_MOLE_DURATION = 350; // milliseconds
const MAX_MOLE_DURATION = 1500; // milliseconds
const DIFFICULTY_FACTOR = 0.95; // Each point reduces duration by 5%

export default function WhackAMole() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [molePosition, setMolePosition] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const moleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMolePosition(null);

    // Start the game timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Spawn moles when game becomes active
  useEffect(() => {
    if (gameActive) {
      spawnMole();
    }
  }, [gameActive]);

  const endGame = () => {
    setGameActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    setMolePosition(null);
  };

  const getMoleDuration = () => {
    // Calculate base duration based on score
    const baseDuration = MAX_MOLE_DURATION * Math.pow(DIFFICULTY_FACTOR, score);
    // Ensure duration doesn't go below minimum
    const duration = Math.max(MIN_MOLE_DURATION, baseDuration);
    // Add some randomness (±20%)
    const randomFactor = 0.8 + Math.random() * 0.4;
    return Math.floor(duration * randomFactor);
  };

  const spawnMole = () => {
    if (!gameActive) return;

    // Clear any existing mole timer
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);

    // Generate a random position for the mole
    const newPosition = Math.floor(Math.random() * TOTAL_SQUARES);
    setMolePosition(newPosition);

    // Set a timer to remove the mole with random duration
    const duration = getMoleDuration();
    moleTimerRef.current = setTimeout(() => {
      setMolePosition(null);
      spawnMole();
    }, duration);
  };

  const handleSquareClick = (index: number) => {
    if (!gameActive || molePosition === null) return;

    if (index === molePosition) {
      // Clear any existing mole timers
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);

      setScore((prev) => prev + 1);
      setMolePosition(null);
      // Spawn a new mole in half a second
      moleTimerRef.current = setTimeout(spawnMole, 500);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex justify-between w-full max-w-md">
        <div className="text-xl font-bold">Score: {score}</div>
        <div className="text-xl font-bold">Time: {timeLeft}s</div>
      </div>

      <div
        className={`grid grid-cols-${GRID_SIZE} gap-4`}
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: TOTAL_SQUARES }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              squaresRef.current[index] = el;
            }}
            onClick={() => handleSquareClick(index)}
            className={`w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer
              ${molePosition === index ? "bg-yellow-200" : "bg-gray-100"}
              ${gameActive ? "hover:bg-gray-200" : ""}`}
          >
            {molePosition === index && "🐹"}
          </div>
        ))}
      </div>

      {!gameActive && (
        <button
          onClick={startGame}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
