import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../src/hobito.png';
import "../src/Profile.css";

const hamsterFacts = [
    "Syrian hamsters are solitary and must live alone. They can become aggressive if housed together.",
    "Hamsters have expandable cheek pouches that can stretch to their shoulders, allowing them to carry food equal to half their body size.",
    "A hamster's teeth grow continuously throughout their life, about 4-5 inches per year! They need chew toys to keep them trimmed.",
    "Hamsters are crepuscular, meaning they're most active at dawn and dusk, not strictly nocturnal as commonly believed.",
    "The word 'hamster' comes from the German word 'hamstern' meaning 'to hoard', reflecting their food-storing behavior.",
    "Hamsters have poor eyesight (they're nearsighted and colorblind) but excellent senses of smell and hearing.",
    "A hamster can run up to 5-6 miles per night on their wheel - that's like a human running a marathon each night!",
    "Baby hamsters are called 'pups' and are born hairless, blind, and deaf, weighing only 2-3 grams.",
    "Hamsters originated in the deserts of Syria where they burrow to escape the extreme heat.",
    "The average lifespan of a hamster is 2-3 years, though some can live up to 4 years with excellent care."
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [factsPerPage] = useState(4); // Mostrar más facts en pantallas grandes

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://18.212.83.4:3000/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data);
                setError(null);
            } catch (err) {
                setError('Error loading profile');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();

        const factInterval = setInterval(() => {
            setCurrentFactIndex(prev => (prev + 1) % hamsterFacts.length);
        }, 8000); // Más tiempo para leer cada fact

        return () => clearInterval(factInterval);
    }, []);

    // Pagination
    const indexOfLastFact = currentPage * factsPerPage;
    const indexOfFirstFact = indexOfLastFact - factsPerPage;
    const currentFacts = hamsterFacts.slice(indexOfFirstFact, indexOfLastFact);
    const totalFactPages = Math.ceil(hamsterFacts.length / factsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <div className="hamster-loading-container">
                <div className="hamster-spinner">🐹</div>
                <p className="loading-text">Loading your hamster profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="hamster-error-container">
                <div className="hamster-error-message">
                    {error} 
                    <div className="hamster-error-icon">🐹💔</div>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="hamster-retry-button"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="hamster-profile-container">
            <div className="hamster-profile-card">
                <div className="hamster-profile-header">
                    <img src={logo} alt="Logo" className="hamster-logo" />
                    <div className="profile-header-content">
                        <h1 className="hamster-profile-name">{user.name}</h1>
                        <p className="hamster-profile-email">📧 {user.email}</p>
                        <p className="hamster-profile-role">🏷️ {user.rol}</p>
                    </div>
                </div>

                <div className="hamster-profile-body">
                    <div className="hamster-current-fact">
                        <h2 className="fact-title">🐹 Did You Know?</h2>
                        <p className="fact-content">{hamsterFacts[currentFactIndex]}</p>
                    </div>

                    <div className="hamster-facts-section">
                        <h2 className="facts-title">More Hamster Facts</h2>
                        <div className="facts-grid">
                            {currentFacts.map((fact, index) => (
                                <div key={index} className="fact-card">
                                    <div className="fact-icon">🐹</div>
                                    <p className="fact-text">{fact}</p>
                                </div>
                            ))}
                        </div>

                        {hamsterFacts.length > factsPerPage && (
                            <div className="hamster-pagination">
                                <button 
                                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                    disabled={currentPage === 1}
                                    className="hamster-page-btn"
                                >
                                    &larr; Previous
                                </button>
                                
                                <div className="page-numbers">
                                    {Array.from({ length: totalFactPages }, (_, i) => i + 1).map(number => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`hamster-page-btn ${currentPage === number ? 'active' : ''}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => paginate(currentPage < totalFactPages ? currentPage + 1 : totalFactPages)}
                                    disabled={currentPage === totalFactPages}
                                    className="hamster-page-btn"
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hamster-profile-footer">
                    <button onClick={() => window.history.back()} className="hamster-back-button">
                        🏠 Return to Burrow
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;