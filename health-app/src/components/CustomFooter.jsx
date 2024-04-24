import React from 'react';

export default function CustomFooter() {
  return (
    <footer className="footer">
      <section className="social-icons">
        <span>Resources</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        {/* Add more social links as needed */}
      </section>

      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Farmindale Alliance Medical</h5>
            <p>
            Empowering Care, Enhancing Communication – Your Health, Our Commitment.
            </p>
          </div>
          <div className="col">
            <h5>Our Partners</h5>
            <p><a href="https://www.northwell.edu/">Northwell Health</a></p>
            <p><a href="https://www.nyp.org/">NewYork-Presbyterian</a></p>
            <p><a href="https://www.mountsinai.org/">Mount Sinai Hospital</a></p>
            <p><a href="https://www.nychealthandhospitals.org/">NYC Health</a></p>
          </div>
          <div className="col">
            <h5>Useful Links</h5>
            <p><a href="https://www.hrsa.gov/">Health Resources and Services Administration (HRSA)</a></p>
            <p><a href="https://www.medpac.gov/">Medicare Payment Advisory Commission</a></p>
            <p><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">Centers for Disease Control and Prevention</a></p>
            <p><a href="https://www.nyc.gov/site/doh/index.page">NYC Department of Health</a></p>
          </div>
          <div className="col">
            <h5>Contact</h5>
            <p><i className="fas fa-home me-2"></i>2350 Broadhollow Road
Farmingdale</p>
            <p><i className="fas fa-envelope me-3"></i> health@fam.com</p>
            <p><i className="fas fa-phone me-3"></i> (934) 420-2000</p>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2024 Copyright:
        <a href="#!"> FAM</a>
      </div>
    </footer>
  );
}
