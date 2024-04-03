import { Info, Links, Title } from "./components";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const App = () => {
  return (
    <>
      <div className=" bg-black container text-white flex justify-between flex-col size-full relative text-center p-2 md:max-w-4xl xl:max-w-6xl 2xl:max-w-full	mx-auto overflow-hidden bg-center	bg-no-repeat	bg-contain	">
        <Info />
        <Title />
        <Links />
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
};
// style={{backgroundImage: `linear-gradient(rgb(255 255 255 / 100%), rgb(255 255 255 / 100%)), url(src/assets/main.png)`}}
export default App;
