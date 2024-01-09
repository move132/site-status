import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { observer } from "mobx-react-lite";
import { getSiteData } from "@/utils/getSiteData";
import { GlobalScrollbar } from "mac-scrollbar";
import useStores from "@/hooks/useStores";
import Header from "@/components/header";
import SiteStatus from "@/components/siteStatus";
import Footer from "@/components/footer";

const App = observer(() => {
  const { cache, status } = useStores();
  const [siteData, setSiteData] = useState(null);

  // 加载配置
  const apiKey = import.meta.env.VITE_API_KEY;
  const countDays = import.meta.env.VITE_COUNT_DAYS;
  // 获取站点数据
  const getSiteStatusData = () => {
    setSiteData(null);
    getSiteData(apiKey, countDays, cache, status).then((res) => {
      console.log(res);
      setSiteData(res);
      setTimeout(() => {
        confettiAnmaite();
      }, 1000);
    });
  };

  const confettiAnmaite = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  useEffect(() => {
    getSiteStatusData();
  }, [apiKey, countDays]);

  return (
    <>
      <GlobalScrollbar />
      <Header getSiteData={getSiteStatusData} />
      <main id="main">
        <div className="container">
          <div className="all-site">
            <SiteStatus siteData={siteData} days={countDays} status={status} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
});

export default App;
