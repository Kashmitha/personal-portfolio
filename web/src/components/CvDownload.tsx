import { Download } from 'lucide-react';

export default function CvDownload({ href }: { href?: string }) {
  const content = (
    <>
      <Download size={18} aria-hidden="true" />
      <span>Download CV</span>
      {!href && <small>Available soon</small>}
    </>
  );
  return href ? (
    <a
      className="game-cv-download"
      href={href}
      download="Kashmitha_Madushan_Associate_DevOps_CV.pdf"
    >
      {content}
    </a>
  ) : (
    <button className="game-cv-download" type="button" disabled>
      {content}
    </button>
  );
}
