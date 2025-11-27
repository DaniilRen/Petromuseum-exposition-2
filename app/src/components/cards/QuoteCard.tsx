import React, { useEffect, useState } from 'react';
import QuoteTextCard from './QuoteTextCard'
import './QuoteCard.css'


interface QuoteCardProps {
	group: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ group }) => {
	const [quotes, setQuotes] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const quotes = await window.electronAPI.getRows("Quotes_sec_6");
				const filtered_quotes: Object[] = quotes.filter(quotes => quotes.group === group);
				setQuotes(filtered_quotes);
			} catch (err) {
				console.error('Error fetching data:', err);
				setQuotes([]);
			}
		})();
	}, [group]);

	return (
		<div className="quotes-card" key={group}>
			<h2 className="group-name">{group}</h2>
			<div className="quotes-holder">
				{quotes.map(quote => (
						<QuoteTextCard quote={quote['text']} author={quote['author']} />
				))}
			</div>
		</div>
	);
};

export default QuoteCard;
