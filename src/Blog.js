import React, { useState } from 'react';
import "./Blog.css";
import hobo from '../src/syrian.jpg';

function Blog() {
    const [selectedHamster, setSelectedHamster] = useState(null);
    const [activeTab, setActiveTab] = useState('breeds');

    const hamsters = [
        { 
            id: 1, 
            name: 'Syrian Hamster', 
            image: hobo,
            description: 'The largest and most popular pet hamster. Solitary by nature, they must live alone. Known for their golden color but come in many varieties.',
            lifespan: '2-3 years',
            size: '5-7 inches'
        },
        { 
            id: 2, 
            name: 'Dwarf Hamster', 
            image: 'https://delivery-petsuppliesplus.stylelabs.cloud/api/public/content/AdobeStock_270065630.jpeg?v=d5d407ec',
            description: 'Smaller and more social than Syrians, they can live in same-sex pairs if introduced properly. Very active and fun to watch.',
            lifespan: '1.5-2 years',
            size: '2-4 inches'
        },
        { 
            id: 3, 
            name: 'Roborovski Hamster', 
            image: 'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2022/07/23/hamster-roborovski.jpeg',
            description: 'The smallest and fastest hamster breed. Not recommended for handling but fascinating to observe in their habitat.',
            lifespan: '3-3.5 years',
            size: '1.5-2 inches'
        }
    ];

    const handleImageClick = (hamster) => {
        setSelectedHamster(selectedHamster?.id === hamster.id ? null : hamster);
    };

    return (
        <div className="hamster-blog-container">
            <div className="hamster-blog-header">
                <h1>🐹 Welcome to the Hamster Blog 🐹</h1>
                <p className="blog-intro">Your ultimate guide to hamster breeds, care, and everything in between!</p>
            </div>

            <div className="hamster-tabs">
                <button 
                    className={`hamster-tab ${activeTab === 'breeds' ? 'active' : ''}`}
                    onClick={() => setActiveTab('breeds')}
                >
                    🏆 Breeds
                </button>
                <button 
                    className={`hamster-tab ${activeTab === 'care' ? 'active' : ''}`}
                    onClick={() => setActiveTab('care')}
                >
                    💖 Care Guide
                </button>
                <button 
                    className={`hamster-tab ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    🖼️ Gallery
                </button>
            </div>

            {activeTab === 'breeds' && (
                <div className="hamster-breed-section">
                    <h2 className="section-title">🐹 Hamster Breeds</h2>
                    <p className="section-description">
                        There are several types of hamsters that make great pets. Each breed has its own unique characteristics and care requirements.
                    </p>

                    <div className="breed-cards-container">
                        {hamsters.map(hamster => (
                            <div 
                                key={hamster.id} 
                                className={`breed-card ${selectedHamster?.id === hamster.id ? 'expanded' : ''}`}
                                onClick={() => handleImageClick(hamster)}
                            >
                                <div className="breed-image-container">
                                    <img src={hamster.image} alt={hamster.name} />
                                </div>
                                <div className="breed-info">
                                    <h3>{hamster.name}</h3>
                                    {selectedHamster?.id === hamster.id && (
                                        <div className="breed-details">
                                            <p>{hamster.description}</p>
                                            <div className="breed-stats">
                                                <span>📏 Size: {hamster.size}</span>
                                                <span>⏳ Lifespan: {hamster.lifespan}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'care' && (
                <div className="hamster-care-section">
                    <h2 className="section-title">🐹 Hamster Care Guide</h2>
                    
                    <div className="care-tip">
                        <h3>🏠 Housing</h3>
                        <p>Provide a spacious cage (minimum 450 square inches of floor space) with plenty of bedding (6+ inches) for burrowing. Avoid wire floors and ensure good ventilation.</p>
                    </div>
                    
                    <div className="care-tip">
                        <h3>🍎 Diet</h3>
                        <p>Feed a balanced diet of high-quality hamster pellets, supplemented with fresh vegetables (carrots, broccoli) and occasional treats (mealworms, fruits). Always provide fresh water.</p>
                    </div>
                    
                    <div className="care-tip">
                        <h3>🏃 Exercise</h3>
                        <p>Essential for physical and mental health. Provide an appropriately sized wheel (solid surface, no wires) and toys for enrichment. Syrian hamsters need 8-12 inch wheels, dwarfs 6-8 inches.</p>
                    </div>
                    
                    <div className="care-tip">
                        <h3>🧼 Grooming</h3>
                        <p>Hamsters are clean animals that groom themselves. Long-haired Syrians may need occasional brushing. Provide a sand bath (chinchilla sand) for natural cleaning.</p>
                    </div>
                    
                    <div className="care-tip">
                        <h3>👐 Handling</h3>
                        <p>Be patient when taming. Start by offering treats from your hand. Never wake a sleeping hamster. Support their entire body when holding.</p>
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className="hamster-gallery-section">
                    <h2 className="section-title">🐹 Hamster Gallery</h2>
                    <p className="section-description">Click on any image to learn more about each hamster breed</p>
                    
                    <div className="hamster-gallery">
                        {hamsters.map(hamster => (
                            <div 
                                key={hamster.id} 
                                className={`gallery-item ${selectedHamster?.id === hamster.id ? 'active' : ''}`}
                                onClick={() => handleImageClick(hamster)}
                            >
                                <img src={hamster.image} alt={hamster.name} />
                                <div className="image-overlay">
                                    <h3>{hamster.name}</h3>
                                    {selectedHamster?.id === hamster.id && (
                                        <p className="breed-description">{hamster.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="hamster-blog-footer">
                <p>Join our hamster community for more tips and adorable content!</p>
                <button className="subscribe-btn">Subscribe to Hamster Updates 🐹</button>
            </div>
        </div>
    );
}

export default Blog;