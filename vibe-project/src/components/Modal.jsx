import { createPortal } from 'react-dom';

export default function Modal({ imgSrc, onClose }) {
  if (!imgSrc) return null;

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__dialog" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>
        <img src={imgSrc} alt="Target enlarged view" />
      </div>
    </div>,
    document.body
  );
}
