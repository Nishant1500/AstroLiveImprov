import React from 'react';

interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Card({ 
  imageSrc, 
  imageAlt = "Card image", 
  title, 
  description, 
  buttonText = "Learn More", 
  onButtonClick 
}: CardProps) {
  return (
    <>
      <style>{`
        .card {
          max-width: 320px;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #f3f4f6;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .card-image {
          width: 100%;
          height: 190px;
          object-fit: cover;
        }

        .card-content {
          padding: 24px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .card-description {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .card-button {
          background-color: #2563eb;
          color: #ffffff;
          font-weight: 500;
          font-size: 0.875rem;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .card-button:hover {
          background-color: #1d4ed8;
        }

        .card-button:focus {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
      `}</style>

      <div className="card">
        {imageSrc && (
          <img 
            className="card-image" 
            src={imageSrc} 
            alt={imageAlt} 
          />
        )}
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          {buttonText && (
            <button className="card-button" onClick={onButtonClick}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </>
  );
}