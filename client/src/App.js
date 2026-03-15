import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import './commonstyling.css'
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (savedTheme === 'light') {
      setIsDarkTheme(false);
    } else {
      const currentTime = new Date().getHours();
      setIsDarkTheme(currentTime < 6 || currentTime >= 18);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('site-theme', isDarkTheme ? 'dark' : 'light');
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(isDarkTheme ? 'dark-theme' : 'light-theme');
  }, [isDarkTheme]);

  useEffect(() => {
    const globalErrorHandler = (message, source, lineno, colno, error) => {
      console.error('[Global Error]', { message, source, lineno, colno, error });
    };
    const unhandledRejectionHandler = (event) => {
      console.error('[Unhandled Promise Rejection]', event.reason);
    };

    window.addEventListener('error', globalErrorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      window.removeEventListener('error', globalErrorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <ErrorBoundary>
        <Router>
          <Navbar handleSlideIn={handleSlideIn} />
          <AllRoutes
            slideIn={slideIn}
            handleSlideIn={handleSlideIn}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
