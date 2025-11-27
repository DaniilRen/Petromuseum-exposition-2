import React from 'react';
import './QuoteTextCard.css'


interface QuoteTextCardProps {
	quote: string;
	author: string;
}

const QuoteTextCard: React.FC<QuoteTextCardProps> = ({ quote, author }) => {
	return (
		<div key={quote} className="quote-text">
			<p className="quote">{quote}</p>
			<sub className="author">{author}</sub>
		</div>
	);
};

export default QuoteTextCard;
