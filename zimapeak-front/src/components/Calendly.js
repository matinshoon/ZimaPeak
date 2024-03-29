import React, { useEffect } from 'react';

const Calendly = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="card calendly-inline-widget" data-url="https://calendly.com/zimapeak_audit/30min?hide_event_type_details=1&hide_gdpr_banner=1" style={{ width: '100%', height: '100%' }}></div>
  );
};

export default Calendly;
