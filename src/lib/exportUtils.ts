import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MessageCardState } from '@/store/bouquetStore';

interface ExportParams {
  canvasDataUrl: string;
  messageCard: MessageCardState;
}

// Helper to trigger file downloads
const triggerDownload = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Programmatic builder for off-screen greeting card DOM
const createOffscreenCardDOM = (canvasDataUrl: string, messageCard: MessageCardState): HTMLDivElement => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '1600px';
  container.style.height = '800px';
  container.style.display = 'flex';
  container.style.backgroundColor = '#f5f2eb';
  container.style.boxSizing = 'border-box';
  container.id = 'temp-greeting-card-export';

  // Left Side: Bouquet Canvas (800x800)
  const leftSide = document.createElement('div');
  leftSide.style.width = '800px';
  leftSide.style.height = '800px';
  leftSide.style.position = 'relative';
  leftSide.style.display = 'flex';
  leftSide.style.alignItems = 'center';
  leftSide.style.justifyContent = 'center';
  leftSide.style.backgroundColor = '#f6f3eb';
  leftSide.style.borderRight = '1px solid #e5dfd5';

  const bouquetImg = document.createElement('img');
  bouquetImg.src = canvasDataUrl;
  bouquetImg.style.width = '800px';
  bouquetImg.style.height = '800px';
  bouquetImg.style.objectFit = 'cover';
  leftSide.appendChild(bouquetImg);

  // Right Side: Greeting Card (800x800)
  const rightSide = document.createElement('div');
  rightSide.style.width = '800px';
  rightSide.style.height = '800px';
  rightSide.style.backgroundColor = '#fcfbfa';
  rightSide.style.display = 'flex';
  rightSide.style.flexDirection = 'column';
  rightSide.style.justifyContent = 'center';
  rightSide.style.alignItems = 'center';
  rightSide.style.padding = '60px';
  rightSide.style.boxSizing = 'border-box';

  const cardBorder = document.createElement('div');
  cardBorder.style.border = '3px double #b38254';
  cardBorder.style.width = '100%';
  cardBorder.style.height = '100%';
  cardBorder.style.display = 'flex';
  cardBorder.style.flexDirection = 'column';
  cardBorder.style.justifyContent = 'center';
  cardBorder.style.alignItems = 'center';
  cardBorder.style.padding = '50px';
  cardBorder.style.boxSizing = 'border-box';
  cardBorder.style.borderRadius = '12px';
  cardBorder.style.background = 'radial-gradient(circle at 10% 10%, rgba(245, 242, 235, 0.4) 0%, transparent 80%)';
  cardBorder.style.textAlign = 'center';

  const subHeader = document.createElement('h4');
  subHeader.innerText = 'DESIGNED ESPECIALLY FOR YOU';
  subHeader.style.fontSize = '14px';
  subHeader.style.fontWeight = 'bold';
  subHeader.style.letterSpacing = '3px';
  subHeader.style.color = '#b38254';
  subHeader.style.margin = '0 0 20px 0';
  subHeader.style.fontFamily = 'system-ui, sans-serif';

  const title = document.createElement('h1');
  title.innerText = messageCard.title || 'A Special Bouquet';
  title.style.fontSize = '38px';
  title.style.fontWeight = '700';
  title.style.color = '#2d2520';
  title.style.margin = '0 0 24px 0';
  title.style.lineHeight = '1.3';
  title.style.fontFamily = 'Georgia, serif';

  const divider = document.createElement('div');
  divider.style.width = '60px';
  divider.style.height = '2px';
  divider.style.backgroundColor = '#b38254';
  divider.style.margin = '0 0 30px 0';

  const message = document.createElement('p');
  message.innerText = `"${messageCard.message || 'No message attached.'}"`;
  message.style.fontSize = '20px';
  message.style.lineHeight = '1.7';
  message.style.color = '#5c544e';
  message.style.fontStyle = 'italic';
  message.style.fontFamily = 'Georgia, serif';
  message.style.maxWidth = '550px';
  message.style.margin = '0 0 40px 0';

  const recipient = document.createElement('h3');
  recipient.innerText = messageCard.recipient ? `With Love, to: ${messageCard.recipient}` : 'Made with Love ❤️';
  recipient.style.fontSize = '22px';
  recipient.style.fontWeight = '600';
  recipient.style.color = '#b38254';
  recipient.style.margin = '0';
  recipient.style.fontFamily = 'Georgia, serif';

  const footer = document.createElement('span');
  footer.innerText = 'Bouquet Maker Florist 🌸';
  footer.style.fontSize = '12px';
  footer.style.color = '#a69e96';
  footer.style.marginTop = '45px';
  footer.style.fontFamily = 'system-ui, sans-serif';
  footer.style.letterSpacing = '1px';

  cardBorder.appendChild(subHeader);
  cardBorder.appendChild(title);
  cardBorder.appendChild(divider);
  cardBorder.appendChild(message);
  cardBorder.appendChild(recipient);
  cardBorder.appendChild(footer);

  rightSide.appendChild(cardBorder);

  container.appendChild(leftSide);
  container.appendChild(rightSide);

  return container;
};

// EXPORT TO PNG
export const exportToPNG = async ({ canvasDataUrl, messageCard }: ExportParams): Promise<string> => {
  if (!messageCard.enabled) {
    // If card is disabled, export canvas directly
    triggerDownload(canvasDataUrl, 'dream-bouquet.png');
    return canvasDataUrl;
  }

  // Create card DOM, append, render with html2canvas, and clean up
  const dom = createOffscreenCardDOM(canvasDataUrl, messageCard);
  document.body.appendChild(dom);

  try {
    const renderedCanvas = await html2canvas(dom, {
      width: 1600,
      height: 800,
      scale: 2, // High resolution output
      useCORS: true,
      logging: false,
    });
    
    const dataUrl = renderedCanvas.toDataURL('image/png');
    triggerDownload(dataUrl, 'dream-bouquet-card.png');
    return dataUrl;
  } catch (error) {
    console.error('Error rendering PNG card:', error);
    throw error;
  } finally {
    document.body.removeChild(dom);
  }
};

// EXPORT TO PDF
export const exportToPDF = async ({ canvasDataUrl, messageCard }: ExportParams): Promise<void> => {
  if (!messageCard.enabled) {
    // Single page square PDF for the bouquet
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [800, 800],
    });
    pdf.addImage(canvasDataUrl, 'PNG', 0, 0, 800, 800);
    pdf.save('dream-bouquet.pdf');
    return;
  }

  const dom = createOffscreenCardDOM(canvasDataUrl, messageCard);
  document.body.appendChild(dom);

  try {
    const renderedCanvas = await html2canvas(dom, {
      width: 1600,
      height: 800,
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const dataUrl = renderedCanvas.toDataURL('image/png');

    // Create high-quality landscape PDF for A4 or exact card dimensions
    // Using exact px dimensions matching the canvas aspect ratio
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1600, 800],
    });
    
    pdf.addImage(dataUrl, 'PNG', 0, 0, 1600, 800);
    pdf.save('dream-bouquet-card.pdf');
  } catch (error) {
    console.error('Error rendering PDF:', error);
    throw error;
  } finally {
    document.body.removeChild(dom);
  }
};
