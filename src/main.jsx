import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API_URL = 'https://api.tvmaze.com';
const FALLBACK_IMAGE = '/auditorium.jpg';

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '');
}

function yearFromDate(date) {
  return date ? new Date(date).getFullYear() : 'N/A';
}

function imageFor(show, large = false) {
  return show?.image?.[large ? 'original' : 'medium'] || FALLBACK_IMAGE;
}

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Cinemaza home">
      <span className="logo-mark">C</span>
      <span>cine<span>maza</span></span>
    </a>
  );
}

function Header({ onBrowse }) {
  return (
    <header className="site-header">
      <Logo />
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/movies">Movies</a>
      </nav>
      <button className="header-button" onClick={onBrowse}>Explore movies <span>↗</span></button>
    </header>
  );
}

function Hero({ onBrowse }) {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="eyebrow"><span className="eyebrow-line" /> Welcome to Cinemaza</p>
        <h1>Find your next<br /><em>great story.</em></h1>
        <p className="hero-copy">
          Explore movies and shows from around the world. Search, discover, and find something worth watching.
        </p>
        <button className="primary-button" onClick={onBrowse}>Browse movies <span>→</span></button>
      </div>
    </section>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title..."
        aria-label="Search shows by title"
      />
      {value && <button className="clear-search" onClick={() => onChange('')} aria-label="Clear search">×</button>}
    </div>
  );
}

function ShowCard({ show, onDetails, index }) {
  const rating = show.rating?.average;
  return (
    <article className="show-card" style={{ '--delay': `${index * 55}ms` }}>
      <button className="poster-button" onClick={() => onDetails(show)} aria-label={`See details for ${show.name}`}>
        <img src={imageFor(show)} alt="" loading="lazy" />
        <span className="poster-overlay">See details <span>↗</span></span>
      </button>
      <div className="card-info">
        <div>
          <h3>{show.name}</h3>
          <p>{show.genres?.slice(0, 2).join('  ·  ') || 'Series'}</p>
        </div>
        <span className="rating"><span>★</span> {rating || '—'}</span>
      </div>
      <div className="card-meta"><span>{yearFromDate(show.premiered)}</span><span>{show.network?.name || show.webChannel?.name || 'TVMaze'}</span></div>
      <button className="card-details" onClick={() => onDetails(show)}>See Details <span>↗</span></button>
    </article>
  );
}

function ShowsSection({ shows, loading, error, query, onQuery, onDetails }) {
  return (
    <section className="catalog-section" id="discover">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> The collection</p>
          <h2>Explore <em>movies.</em></h2>
        </div>
        <p className="section-intro">Search by title or browse the latest shows from TVMaze.</p>
      </div>
      <div className="catalog-toolbar">
        <SearchBar value={query} onChange={onQuery} />
        <span className="result-count">{query ? `${shows.length} results` : `${shows.length} titles`}</span>
      </div>
      {error && <div className="status-message error">{error}</div>}
      {loading ? (
        <div className="show-grid">{[...Array(8)].map((_, i) => <div className="skeleton-card" key={i}><div className="skeleton-poster" /><div className="skeleton-line" /><div className="skeleton-small" /></div>)}</div>
      ) : shows.length ? (
        <div className="show-grid">
          {shows.map((show, index) => <ShowCard key={show.id} show={show} onDetails={onDetails} index={index} />)}
        </div>
      ) : <div className="status-message">No titles found. Try another search.</div>}
    </section>
  );
}

function DetailsModal({ show, onClose }) {
  useEffect(() => {
    if (!show) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
        <div className="modal-image"><img src={imageFor(show, true)} alt="" /></div>
        <div className="modal-body">
          <p className="eyebrow"><span className="eyebrow-line" /> {show.type || 'Series'} · {yearFromDate(show.premiered)}</p>
          <h2 id="details-title">{show.name}</h2>
          <div className="modal-stats"><span><b>★</b> {show.rating?.average || '—'} rating</span><span>{show.runtime ? `${show.runtime} min` : 'Ongoing'}</span><span>{show.status}</span></div>
          <p className="summary">{stripHtml(show.summary) || 'No summary available for this title yet.'}</p>
          <div className="genre-list">{show.genres?.map((genre) => <span key={genre}>{genre}</span>)}</div>
          <a className="modal-link" href={show.url} target="_blank" rel="noreferrer">Open TVMaze page <span>↗</span></a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return <footer><Logo /><span>© 2026 Cinemaza · Data by TVMaze</span></footer>;
}

function App() {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedShow, setSelectedShow] = useState(null);
  const [page, setPage] = useState(window.location.pathname === '/movies' ? 'movies' : 'home');

  useEffect(() => {
    const onPopState = () => setPage(window.location.pathname === '/movies' ? 'movies' : 'home');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const term = query.trim();
    const timer = setTimeout(() => {
    setLoading(true);
    setError('');
    const url = term
      ? `${API_URL}/search/shows?q=${encodeURIComponent(term)}`
      : `${API_URL}/shows`;
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load the catalogue.');
        return response.json();
      })
      .then((data) => setShows(term ? data.map((item) => item.show) : data))
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setError(term ? 'Search is temporarily unavailable.' : 'The catalogue is taking a moment. Please refresh and try again.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, term ? 350 : 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const browse = () => {
    if (window.location.pathname !== '/movies') window.history.pushState({}, '', '/movies');
    setPage('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header onBrowse={browse} />
      <main>
        {page === 'home' ? <>
          <Hero onBrowse={browse} />
        </> : <ShowsSection shows={shows} loading={loading} error={error} query={query} onQuery={setQuery} onDetails={setSelectedShow} />}
      </main>
      <Footer />
      <DetailsModal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
