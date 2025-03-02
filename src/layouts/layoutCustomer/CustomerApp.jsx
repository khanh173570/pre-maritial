import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Import icon mũi tên lên đầu trang
import Header from "../../components/componentCustomer/componentsHeader/componentsHeader.jsx";
import Footer from "../../components/componentCustomer/componentsFooter/componentsFooter.jsx";
import "./CustomerApp.css";

function CustomerApp() {
  // Trạng thái hiển thị header
  const [isVisible, setIsVisible] = useState(true);
  // Vị trí cuộn trước đó của trang
  const [lastScrollY, setLastScrollY] = useState(0);
  // Trạng thái hiển thị nút cuộn lên
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn xuống => Ẩn header, nếu cuộn lên => Hiện header
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY); // Cập nhật vị trí cuộn hiện tại

      // Hiển thị nút cuộn lên nếu cuộn xuống quá 300px
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    // Lắng nghe sự kiện cuộn trang
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Hủy sự kiện khi component bị unmount để tránh rò rỉ bộ nhớ
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Hàm xử lý khi bấm vào nút cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn mượt mà lên đầu trang
  };

  return (
    <div className="customer-app">
      {/* Header hiển thị hoặc ẩn khi cuộn */}
      <div className={`header ${isVisible ? "visible" : "hidden"}`}>
        <Header />
      </div>

      {/* Nội dung chính của trang */}
      <div className="main">
        <Outlet />
      </div>

      {/* Footer luôn hiển thị */}
      {/* <div className="footer">
        <Footer />
      </div> */}

      {/* Nút cuộn lên đầu trang */}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default CustomerApp;
