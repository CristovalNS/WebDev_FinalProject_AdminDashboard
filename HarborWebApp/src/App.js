import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MobileHarbourHome from "./pages/MobileHarbourHome";
import MHarborOngoingShipment from "./pages/MHarborOngoingShipment";
import MHarborShippingHistory from "./pages/MHarborShippingHistory";
import MAdminConfirmOrder from "./pages/MAdminConfirmOrder";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home Page";
        metaDescription = "Welcome to our home page.";
        break;
      case "/mharbor-ongoing-shipment":
        title = "Ongoing Shipment";
        metaDescription = "Track your ongoing shipment.";
        break;
      case "/mharbor-shipping-history":
        title = "Shipping History";
        metaDescription = "View your shipping history.";
        break;
      case "/madmin-confirm-order":
        title = "Confirm Order";
        metaDescription = "Confirm your order as an admin.";
        break;
      default:
        title = "Page Not Found";
        metaDescription = "Sorry, the page you requested does not exist.";
        break;
    }

    document.title = title;

    const metaDescriptionTag = document.querySelector(
      'head > meta[name="description"]'
    );
    if (metaDescriptionTag) {
      metaDescriptionTag.content = metaDescription;
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<MobileHarbourHome />} />
      <Route
        path="/mharbor-ongoing-shipment"
        element={<MHarborOngoingShipment />}
      />
      <Route
        path="/mharbor-shipping-history"
        element={<MHarborShippingHistory />}
      />
      <Route path="/madmin-confirm-order/:shippingID" element={<MAdminConfirmOrder />} />
    </Routes>
  );
}
export default App;
