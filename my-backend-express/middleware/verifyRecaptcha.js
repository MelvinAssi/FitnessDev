const verifyRecaptcha = async (req, res, next) => {
    const { recaptchaToken } = req.body;
  
    if (!recaptchaToken) {
      return res.status(400).json({ error: 'Token reCAPTCHA manquant' });
    }
  
    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      });
  
      const data = await response.json();
  
      if (!data.success) {
        return res.status(400).json({ error: 'Échec de la vérification reCAPTCHA' });
      }
  
      next();
    } catch (error) {
      console.error('Erreur reCAPTCHA:', error);
      return res.status(500).json({ error: 'Erreur lors de la vérification reCAPTCHA' });
    }
  };
  
  module.exports = verifyRecaptcha;