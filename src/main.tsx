import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = ({ tilesNo }: { tilesNo: number }) => {
  const tiles = Array(tilesNo ** 2)
    .fill(0)
    .map((_, i) => i);

  const [empty, setEmpty] = React.useState(0);

  const handleClick = (tile: number) => {
    if (tile === empty) return;

    const moves: Record<string, number> = {
      l: empty - 1,
      r: empty + 1,
      u: empty - tilesNo,
      d: empty + tilesNo,
    };

    const isLeftEdge = empty % tilesNo === 0;
    const isRightEdge = empty % tilesNo === tilesNo - 1;
    const isTopEdge = empty < tilesNo;
    const isBottomEdge = empty > tilesNo ** 2 - tilesNo;

    if (isLeftEdge) {
      delete moves.l;
    }

    if (isRightEdge) {
      delete moves.r;
    }
    if (isTopEdge) {
      delete moves.u;
    }
    if (isBottomEdge) {
      delete moves.d;
    }

    const move = Object.entries(moves).find(([, v]) => v === tile)?.[1];

    if (move !== undefined) {
      setEmpty(tile);
    }
  };

  return (
    <ul className={`grid grid-cols-${tilesNo} grid-rows-${tilesNo} gap-4`}>
      {tiles.map((tile) => (
        <li
          onClick={() => handleClick(tile)}
          className={`h-20 w-20 cursor-pointer flex justify-center items-center  ${
            tile === empty ? "bg-grey-100" : "bg-slate-400"
          } }`}
          key={tile}
        >
          {tile === empty ? "" : tile}
        </li>
      ))}
    </ul>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="h-screen w-full flex justify-center items-center">
        <App tilesNo={5} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
