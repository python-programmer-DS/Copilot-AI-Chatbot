import React, { useEffect, useRef } from 'react';
import * as AdaptiveCards from 'adaptivecards';
import 'adaptivecards/dist/adaptivecards.css'; // optional if not already included

interface Props {
  content: any;
  onSubmit?: (data: any) => void;
}

const AdaptiveCardRenderer: React.FC<Props> = ({ content, onSubmit }) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content || !cardContainerRef.current) return;

    const adaptiveCard = new AdaptiveCards.AdaptiveCard();

    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      supportsInteractivity: true,
    });

    adaptiveCard.onExecuteAction = (action) => {
      if (action instanceof AdaptiveCards.SubmitAction && onSubmit) {
        onSubmit(action.data);
      }
    };

    try {
      adaptiveCard.parse(content);
      const renderedCard = adaptiveCard.render();

      if (renderedCard && cardContainerRef.current) {
        cardContainerRef.current.innerHTML = '';
        
        // ✅ Apply .ac-adaptiveCard style directly
        renderedCard.classList.add('ac-adaptiveCard');
        renderedCard.style.margin = '0 auto';
        renderedCard.style.width = '100%';
        cardContainerRef.current.appendChild(renderedCard);
      }
    } catch (error) {
      console.error('Error rendering adaptive card:', error);
    }
  }, [content, onSubmit]);

  return (
    <div className="w-full flex justify-center">
      <div className="ac-adaptiveCard" ref={cardContainerRef} />
    </div>
  );

};

export default AdaptiveCardRenderer;
