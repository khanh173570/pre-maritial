// import React, { useEffect, useState } from "react";
// import { getArticles } from "../customerServices";
// import "./View_Article.css";

// // Import images
// import ar1 from "../../../assets/asstetsCustomer/ar1.jpg";
// import ar2 from "../../../assets/asstetsCustomer/ar2.jpg";
// import ar3 from "../../../assets/asstetsCustomer/ar3.jpg";
// import ar4 from "../../../assets/asstetsCustomer/ar4.jpg";
// import ar5 from "../../../assets/asstetsCustomer/ar5.jpg";
// import ar6 from "../../../assets/asstetsCustomer/ar6.jpg";
// import ar7 from "../../../assets/asstetsCustomer/ar7.jpg";

// const images = [ar1, ar2, ar3, ar4, ar5, ar6, ar7];

// const ArticlesPage = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       try {
//         const data = await getArticles(currentPage);
//         setArticles(data.content || []);
//         setTotalPages(data.totalPages || 1);
//       } catch (error) {
//         console.error("Lỗi khi tải bài viết:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const getRandomImage = () => {
//     return images[Math.floor(Math.random() * images.length)];
//   };

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Đang tải bài viết...</p>
//       </div>
//     );

//   return (
//     <div className="articles-page">
//       <h2 className="page-title">Danh sách bài viết</h2>
//       {articles.length === 0 ? (
//         <p className="empty-message">Không có bài viết nào.</p>
//       ) : (
//         <ul className="articles-list">
//           {articles.map((article) => (
//             <li key={article.id} className="article-item">
//               <img
//                 src={getRandomImage()}
//                 alt="Article"
//                 className="article-image"
//               />
//               <h3 className="article-title">{article.title}</h3>
//               <p className="article-content">{article.content}</p>
//               <small className="article-date">
//                 Ngày tạo: {new Date(article.createdAt).toLocaleDateString()}
//               </small>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="pagination">
//         <button
//           className="pagination-button"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Trang trước
//         </button>
//         <span className="pagination-info">
//           Trang {currentPage} / {totalPages}
//         </span>
//         <button
//           className="pagination-button"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Trang sau
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ArticlesPage;

import React, { useEffect, useState } from "react";
import { getArticles, getUserById } from "../customerServices";
import "./View_Article.css";

// Import images
import ar1 from "../../../assets/asstetsCustomer/ar1.jpg";
import ar2 from "../../../assets/asstetsCustomer/ar2.jpg";
import ar3 from "../../../assets/asstetsCustomer/ar3.jpg";
import ar4 from "../../../assets/asstetsCustomer/ar4.jpg";
import ar5 from "../../../assets/asstetsCustomer/ar5.jpg";
import ar6 from "../../../assets/asstetsCustomer/ar6.jpg";
import ar7 from "../../../assets/asstetsCustomer/ar7.jpg";

const images = [ar1, ar2, ar3, ar4, ar5, ar6, ar7];

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authors, setAuthors] = useState({}); // Store authors' names by their IDs

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles(currentPage);
        setArticles(data.content || []);
        setTotalPages(data.totalPages || 1);

        // Fetch authors' names
        const authorPromises = data.content.map((article) =>
          article.approvedUserId ? getUserById(article.approvedUserId) : null
        );
        const authorResults = await Promise.all(authorPromises);
        const authorsMap = {};
        authorResults.forEach((author, index) => {
          if (author) {
            authorsMap[data.content[index].approvedUserId] = author.name;
          }
        });
        setAuthors(authorsMap);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải bài viết...</p>
      </div>
    );

  return (
    <div className="articles-page">
      <h2 className="page-title">Danh sách bài viết</h2>
      {articles.length === 0 ? (
        <p className="empty-message">Không có bài viết nào.</p>
      ) : (
        <ul className="articles-list">
          {articles.map((article) => (
            <li key={article.id} className="article-item">
              <img
                src={getRandomImage()}
                alt="Article"
                className="article-image"
              />
              <h3 className="article-title">{article.title}</h3>
              <p className="article-content">{article.content}</p>
              <small className="article-author">
                {authors[article.approvedUserId]
                  ? `Authored by ${authors[article.approvedUserId]}`
                  : "Author unknown"}
              </small>
              <small className="article-date">
                Ngày tạo: {new Date(article.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span className="pagination-info">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;
