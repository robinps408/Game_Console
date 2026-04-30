import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaUserCircle, FaGlobe, FaFacebook, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { SiEpicgames } from 'react-icons/si';
import './Regis.css';

function Regis() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: '', Gamename: '', Gamedescription: '', Gamedownload: '', Gameimage: ''
    });

    const apiView = "http://localhost:3007/data/view";
    const apiDelete = "http://localhost:3007/data/gameerase";
    const apiUpdate = "http://localhost:3007/data/gameupdate";

    useEffect(() => { fetchData(); }, []);

    const fetchData = () => {
        axios.post(apiView).then((result) => {
            setData(result.data.data);
        }).catch((error) => console.error("Error fetching data:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this game?")) {
            axios.post(apiDelete, { id }).then(() => {
                setData(data.filter(item => item._id !== id));
            });
        }
    };

    const handleEditClick = (game) => {
        setIsEditing(true);
        setEditFormData({
            id: game._id, Gamename: game.Gamename, Gamedescription: game.Gamedescription,
            Gamedownload: game.Gamedownload, Gameimage: game.Gameimage
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.post(apiUpdate, editFormData).then((res) => {
            alert("Game Updated!");
            setIsEditing(false);
            setData(data.map(item => item._id === editFormData.id ? res.data.data : item));
        });
    };

    const filteredData = data.filter(game =>
        game.Gamename.toLowerCase().includes(search.toLowerCase())
    );

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="epic-layout">
            
            {/* --- PROFESSIONAL NAVBAR --- */}
            <nav className="epic-navbar">
                <div className="nav-inner">
                    <div className="nav-left">
                        <SiEpicgames className="epic-logo" />
                        <ul className="nav-links">
                            <li className="active">STORE</li>
                            <li>DISTRIBUTION</li>
                            <li>SUPPORT</li>
                        </ul>
                    </div>
                    <div className="nav-right">
                        <div className="epic-search-box">
                            <FaSearch className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search store" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <FaGlobe className="nav-util-icon" />
                        <div className="nav-user">
                            <FaUserCircle className="nav-util-icon" />
                            <span>SIGN IN</span>
                        </div>
                        <button className="epic-blue-btn">DOWNLOAD</button>
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT SECTION --- */}
            <main className="main-content">
                <div className="content-header">
                    <h1 className="title">Game Explorer</h1>
                    <p className="subtitle">Browse, manage, and discover your next favorite game.</p>
                </div>

                <div className="game-grid">
                    {filteredData.map((game) => (
                        <div className="game-card" key={game._id}>
                            <div className="card-media">
                                <img src={game.Gameimage} alt={game.Gamename} />
                                <div className="card-overlay">
                                    <button className="overlay-plus">+</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <span className="tag">BASE GAME</span>
                                <h3 className="name">{game.Gamename}</h3>
                                <p className="desc">{game.Gamedescription.substring(0, 80)}...</p>
                                <div className="card-actions">
                                    <a href={game.Gamedownload} target="_blank" rel="noreferrer" className="btn-get">GET</a>
                                    <button className="btn-edit" onClick={() => handleEditClick(game)}>EDIT</button>
                                    <button className="btn-del" onClick={() => handleDelete(game._id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- UPDATE MODAL --- */}
            {isEditing && (
                <div className="modal-mask">
                    <div className="modal-box">
                        <h2>Update Game Details</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <label>Game Name</label>
                            <input type="text" value={editFormData.Gamename} onChange={(e)=>setEditFormData({...editFormData, Gamename: e.target.value})} />
                            <label>Description</label>
                            <textarea value={editFormData.Gamedescription} onChange={(e)=>setEditFormData({...editFormData, Gamedescription: e.target.value})} />
                            <div className="modal-btns">
                                <button type="submit" className="confirm-btn">SAVE CHANGES</button>
                                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- PROFESSIONAL FOOTER --- */}
            <footer className="epic-footer">
                <div className="footer-inner">
                    <div className="footer-top">
                        <div className="socials">
                            <FaFacebook /> <FaTwitter /> <FaYoutube />
                        </div>
                        <button className="up-btn" onClick={scrollToTop}><FaArrowUp /></button>
                    </div>
                    <div className="footer-links">
                        <div className="link-col">
                            <h4>Resources</h4>
                            <p>Support-A-Creator</p>
                            <p>Publish on Epic Games</p>
                            <p>Careers</p>
                        </div>
                        <div className="link-col">
                            <h4>Company</h4>
                            <p>Fan Art Policy</p>
                            <p>UX Research</p>
                            <p>Store EULA</p>
                        </div>
                    </div>
                    <hr className="footer-line" />
                    <div className="footer-bottom">
                        <p>© 2024, Epic Games Portal. All simulated rights reserved.</p>
                        <SiEpicgames className="footer-logo" />
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Regis;