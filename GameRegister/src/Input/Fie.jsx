import React, { useState } from 'react';
import axios from 'axios';
import "./Fie.css";

function F() {
    // 1. State to hold form data
    const [formData, setFormData] = useState({
        Gamename: '',
        Gamedescription: '',
        Gamedownload: '',
        Gameimage: ''
    });

    const api = "http://localhost:3007/data/adddata";

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Image upload and convert to Base64 string
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setFormData({ ...formData, Gameimage: reader.result });
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // 2. Submit function to call your API
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(api, formData)
            .then((result) => {
                console.log("Success:", result.data);
                alert("Game added successfully!");
                // Clear form
                setFormData({ Gamename: '', Gamedescription: '', Gamedownload: '', Gameimage: '' });
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to add game.");
            });
    };

    return (
        <div className="form-container">
            <h2>Add New Game</h2>
            <form onSubmit={handleSubmit} className="game-form">
                <div className="form-group">
                    <label>Game Name:</label>
                    <input 
                        type="text" 
                        name="Gamename" 
                        value={formData.Gamename} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        name="Gamedescription" 
                        value={formData.Gamedescription} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Download URL:</label>
                    <input 
                        type="url" 
                        name="Gamedownload" 
                        value={formData.Gamedownload} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Game Image:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        required 
                    />
                </div>

                {/* Preview the image if uploaded */}
                {formData.Gameimage && (
                    <img src={formData.Gameimage} alt="Preview" className="img-preview" />
                )}

                <button type="submit" className="submit-btn">Register Game</button>
            </form>
        </div>
    );
}

export default F;