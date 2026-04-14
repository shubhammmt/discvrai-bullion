import { useState, useCallback, useEffect } from "react";
import { ArrowLeft, Bell, User, Gamepad2, Grid3X3, Type, Puzzle, Trophy, RotateCcw, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import { toast } from "sonner";

// ─── SUDOKU MINI GAME ───
const SUDOKU_PUZZLE: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const SUDOKU_SOLUTION: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

function SudokuGame() {
  const [board, setBoard] = useState<(number | null)[][]>(() =>
    SUDOKU_PUZZLE.map(row => [...row])
  );
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const isOriginal = (r: number, c: number) => SUDOKU_PUZZLE[r][c] !== null;

  const handleCellClick = (r: number, c: number) => {
    if (isOriginal(r, c) || solved) return;
    setSelected([r, c]);
  };

  const handleNumberInput = (num: number) => {
    if (!selected || solved) return;
    const [r, c] = selected;
    if (isOriginal(r, c)) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = num === 0 ? null : num;
    setBoard(newBoard);

    // Check errors
    const newErrors = new Set<string>();
    if (num !== 0 && num !== SUDOKU_SOLUTION[r][c]) {
      newErrors.add(`${r}-${c}`);
    }
    setErrors(newErrors);

    // Check if solved
    const isSolved = newBoard.every((row, ri) =>
      row.every((cell, ci) => cell === SUDOKU_SOLUTION[ri][ci])
    );
    if (isSolved) {
      setSolved(true);
      toast.success("🎉 Sudoku Complete! You earned 50 bonus coins!");
    }
  };

  const resetGame = () => {
    setBoard(SUDOKU_PUZZLE.map(row => [...row]));
    setSelected(null);
    setSolved(false);
    setErrors(new Set());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Sudoku</h3>
          <p className="text-sm text-muted-foreground">Fill the grid so every row, column & 3×3 box has 1-9</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      {solved && (
        <Card className="bg-green-500/10 border-green-500/30 p-3">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Puzzle Solved! +50 coins 🪙</span>
          </div>
        </Card>
      )}

      {/* Board */}
      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-0 border-2 border-foreground/30 rounded-lg overflow-hidden">
          {board.map((row, ri) =>
            row.map((cell, ci) => {
              const isOrig = isOriginal(ri, ci);
              const isSel = selected?.[0] === ri && selected?.[1] === ci;
              const hasError = errors.has(`${ri}-${ci}`);
              const borderR = (ci + 1) % 3 === 0 && ci < 8 ? "border-r-2 border-r-foreground/30" : "border-r border-r-border/50";
              const borderB = (ri + 1) % 3 === 0 && ri < 8 ? "border-b-2 border-b-foreground/30" : "border-b border-b-border/50";

              return (
                <button
                  key={`${ri}-${ci}`}
                  onClick={() => handleCellClick(ri, ci)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base font-medium transition-all ${borderR} ${borderB}
                    ${isOrig ? "bg-muted/50 text-foreground font-bold" : "bg-background"}
                    ${isSel ? "bg-primary/20 ring-2 ring-primary" : ""}
                    ${hasError ? "text-destructive bg-destructive/10" : ""}
                    ${!isOrig && cell ? "text-primary" : ""}
                    ${!isOrig && !solved ? "cursor-pointer hover:bg-accent/50" : "cursor-default"}
                  `}
                >
                  {cell || ""}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Number pad */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Button
            key={num}
            variant="outline"
            size="sm"
            className="w-9 h-9 sm:w-10 sm:h-10 text-base font-bold"
            onClick={() => handleNumberInput(num)}
            disabled={solved}
          >
            {num}
          </Button>
        ))}
        <Button variant="ghost" size="sm" className="w-9 h-9 sm:w-10 sm:h-10 text-xs" onClick={() => handleNumberInput(0)} disabled={solved}>
          Clear
        </Button>
      </div>
    </div>
  );
}

// ─── WORD PUZZLE GAME ───
const WORD_SETS = [
  { word: "BULLION", hint: "Gold or silver in bulk before coining" },
  { word: "INVEST", hint: "Put money into financial schemes" },
  { word: "SILVER", hint: "A precious white metal" },
  { word: "WEALTH", hint: "Abundance of possessions" },
  { word: "PROFIT", hint: "Financial gain from investment" },
];

function WordPuzzleGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const current = WORD_SETS[currentIndex];
  const maxAttempts = 6;

  const getLetterStatus = (guess: string, index: number): string => {
    const letter = guess[index];
    if (current.word[index] === letter) return "bg-green-500 text-white border-green-500";
    if (current.word.includes(letter)) return "bg-amber-500 text-white border-amber-500";
    return "bg-muted text-muted-foreground border-border";
  };

  const handleSubmit = () => {
    if (currentGuess.length !== current.word.length) {
      toast.error(`Word must be ${current.word.length} letters`);
      return;
    }
    const guess = currentGuess.toUpperCase();
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (guess === current.word) {
      setWon(true);
      setGameOver(true);
      toast.success("🎉 Correct! You earned 30 bonus coins!");
    } else if (newGuesses.length >= maxAttempts) {
      setGameOver(true);
      toast.error(`The word was "${current.word}". Try the next one!`);
    }
  };

  const nextWord = () => {
    setCurrentIndex((currentIndex + 1) % WORD_SETS.length);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Word Puzzle</h3>
          <p className="text-sm text-muted-foreground">Guess the investment-themed word</p>
        </div>
        <Badge variant="secondary">{currentIndex + 1}/{WORD_SETS.length}</Badge>
      </div>

      <Card className="p-3 bg-primary/5 border-primary/20">
        <p className="text-sm"><span className="font-semibold">Hint:</span> {current.hint}</p>
        <p className="text-xs text-muted-foreground mt-1">{current.word.length} letters • {maxAttempts - guesses.length} attempts left</p>
      </Card>

      {/* Previous guesses */}
      <div className="space-y-2">
        {guesses.map((guess, gi) => (
          <div key={gi} className="flex justify-center gap-1.5">
            {guess.split("").map((letter, li) => (
              <div
                key={li}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm sm:text-base ${getLetterStatus(guess, li)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}

        {/* Current input row */}
        {!gameOver && (
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: current.word.length }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-border flex items-center justify-center font-bold text-sm sm:text-base ${
                  currentGuess[i] ? "border-primary text-foreground" : ""
                }`}
              >
                {currentGuess[i]?.toUpperCase() || ""}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      {!gameOver ? (
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.slice(0, current.word.length))}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="border rounded-lg px-3 py-2 text-center uppercase font-bold tracking-widest w-48 bg-background"
            placeholder="Type here..."
            maxLength={current.word.length}
          />
          <Button onClick={handleSubmit} disabled={currentGuess.length !== current.word.length}>
            Guess
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-2">
          {won && (
            <p className="text-green-600 font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-5 h-5" /> Correct! +30 coins 🪙
            </p>
          )}
          <Button onClick={nextWord}>
            Next Word <Sparkles className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── SLIDING PUZZLE GAME (3×3) ───
function generateSolvablePuzzle(): (number | null)[] {
  const tiles: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, null];
  // Shuffle with solvability guarantee
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  // Check inversions
  const nums = tiles.filter(t => t !== null) as number[];
  let inversions = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) inversions++;
    }
  }
  if (inversions % 2 !== 0) {
    // Swap first two non-null to fix parity
    const a = tiles.findIndex(t => t !== null);
    const b = tiles.findIndex((t, i) => i > a && t !== null);
    [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
  }
  return tiles;
}

function SlidingPuzzleGame() {
  const [tiles, setTiles] = useState<(number | null)[]>(() => generateSolvablePuzzle());
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [startTime] = useState(Date.now());

  const GOAL = [1, 2, 3, 4, 5, 6, 7, 8, null];

  const handleTileClick = useCallback((index: number) => {
    if (solved) return;
    const emptyIdx = tiles.indexOf(null);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (JSON.stringify(newTiles) === JSON.stringify(GOAL)) {
        setSolved(true);
        toast.success("🎉 Puzzle Solved! You earned 40 bonus coins!");
      }
    }
  }, [tiles, solved]);

  const resetGame = () => {
    setTiles(generateSolvablePuzzle());
    setMoves(0);
    setSolved(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Sliding Puzzle</h3>
          <p className="text-sm text-muted-foreground">Arrange tiles 1-8 in order</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{moves} moves</Badge>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-1" /> New
          </Button>
        </div>
      </div>

      {solved && (
        <Card className="bg-green-500/10 border-green-500/30 p-3">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Solved in {moves} moves! +40 coins 🪙</span>
          </div>
        </Card>
      )}

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-1.5 p-3 bg-muted/30 rounded-xl">
          {tiles.map((tile, i) => (
            <button
              key={i}
              onClick={() => handleTileClick(i)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-2xl sm:text-3xl font-bold transition-all ${
                tile === null
                  ? "bg-transparent"
                  : "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95"
              } ${solved ? "cursor-default" : tile ? "cursor-pointer" : "cursor-default"}`}
              disabled={tile === null || solved}
            >
              {tile}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function BullionGames() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/notifications")}>
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <BullionNavTabs />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Games & Fun Zone</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Take a break, play quick games, and earn bonus coins while you relax! 🎮
          </p>
        </div>

        {/* Reward Banner */}
        <Card className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-semibold">Play & Earn Coins</p>
                <p className="text-sm text-muted-foreground">Complete games to earn bonus coins redeemable on purchases</p>
              </div>
            </div>
            <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
              🪙 120 coins
            </Badge>
          </CardContent>
        </Card>

        {/* Game Tabs */}
        <Tabs defaultValue="sudoku" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sudoku" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Grid3X3 className="w-4 h-4" />
              Sudoku
            </TabsTrigger>
            <TabsTrigger value="word" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Type className="w-4 h-4" />
              Word Puzzle
            </TabsTrigger>
            <TabsTrigger value="sliding" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Puzzle className="w-4 h-4" />
              Slide Puzzle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sudoku">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <SudokuGame />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="word">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <WordPuzzleGame />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sliding">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <SlidingPuzzleGame />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-muted-foreground">Games Available</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-amber-500">120</p>
            <p className="text-xs text-muted-foreground">Max Coins/Day</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-green-500">∞</p>
            <p className="text-xs text-muted-foreground">Unlimited Play</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
